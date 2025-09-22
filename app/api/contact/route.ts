import { NextResponse } from "next/server"
import { z } from "zod"

async function sendEmailFallback({ name, email, message }: { name: string; email: string; message: string }) {
    const toEmail = process.env.CONTACT_TO
    // Prefer Resend if configured
    if (process.env.RESEND_API_KEY && (process.env.RESEND_FROM || toEmail)) {
        const isValidEmailOrNameEmail = (value: string) => {
            const email = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/
            const nameEmail = /^.{1,100}\s<[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+>$/
            return email.test(value) || nameEmail.test(value)
        }

        // Ensure valid From; default to Resend's onboarding domain for quick testing
        const fromRaw = process.env.RESEND_FROM || "Portfolio <onboarding@resend.dev>"
        const from = isValidEmailOrNameEmail(fromRaw) ? fromRaw : "Portfolio <onboarding@resend.dev>"

        const to = toEmail || process.env.RESEND_TO
        if (!to) {
            throw new Error("Missing CONTACT_TO or RESEND_TO for fallback email")
        }
        const payload = {
            from,
            to: [to],
            subject: "New portfolio contact",
            reply_to: email,
            html: `
                <h2>New message from portfolio</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong></p>
                <p>${message.replace(/\n/g, "<br/>")}</p>
            `,
        }
        const res = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            },
            body: JSON.stringify(payload),
        })
        if (!res.ok) {
            throw new Error(`Resend error: ${await res.text()}`)
        }
        return true
    }

    // Fallback to Mailgun if configured
    if (process.env.MAILGUN_API_KEY && process.env.MAILGUN_DOMAIN && toEmail) {
        const form = new URLSearchParams()
        form.set("from", `Portfolio <mailgun@${process.env.MAILGUN_DOMAIN}>`)
        form.set("to", toEmail)
        form.set("subject", "New portfolio contact")
        form.set("text", `Name: ${name}\nEmail: ${email}\n\n${message}`)

        const res = await fetch(`https://api.mailgun.net/v3/${process.env.MAILGUN_DOMAIN}/messages`, {
            method: "POST",
            headers: {
                Authorization: `Basic ${Buffer.from(`api:${process.env.MAILGUN_API_KEY}`).toString("base64")}`,
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: form.toString(),
        })
        if (!res.ok) {
            throw new Error(`Mailgun error: ${await res.text()}`)
        }
        return true
    }

    throw new Error("No email provider configured for fallback")
}

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { name, email, message } = body

        // Validate required fields
        if (!name || !email || !message) {
            return NextResponse.json({ error: "All fields are required", success: false }, { status: 400 })
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            return NextResponse.json({ error: "Invalid email format", success: false }, { status: 400 })
        }
        // n8n webhook
        try {
            const resp = await fetch(process.env.N8N_WEBHOOK_URL!, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, message }),
            })
            if (resp.ok) {
                return NextResponse.json({
                    success: true,
                    message: "Your note just hit my inbox! I’ll be in touch soon.",
                })
            }
            console.error('n8n webhook error', await resp.text())
        } catch (e) {
            console.error('n8n webhook exception', e)
        }

        // Fallback email
        try {
            await sendEmailFallback({ name, email, message })
            return NextResponse.json({
                success: true,
                message: "Your message just landed in my inbox! I’ll be in touch soon.",
            })
        } catch (fallbackErr: any) {
            console.error('Email fallback error', fallbackErr)
            return NextResponse.json(
                { success: false, error: 'Failed to send message (webhook and email fallback)' },
                { status: 502 },
            )
        }

        console.log("Contact form submission:", {
            name,
            email,
            message,
            timestamp: new Date().toISOString(),
        })

        // Default success (should not reach here due to returns above)
        return NextResponse.json({ success: true, message: "Message received." })
    } catch (error) {
        console.error("Contact form error:", error)
        return NextResponse.json({ error: "Something went wrong. Please try again.", success: false }, { status: 500 })
    }
}
