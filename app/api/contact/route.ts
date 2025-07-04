import { NextResponse } from "next/server"
import { z } from "zod"

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
        if (!resp.ok) {
            console.error('n8n webhook error', await resp.text())
            return NextResponse.json(
                { success: false, error: 'Failed to forward message' },
                { status: 502 },
            )
          }
        return NextResponse.json({
            success: true,
            message: "Your note just hit my inbox! I’ll be in touch soon.",
        }) 
    } catch (err) {
        if (err instanceof z.ZodError) {
            return NextResponse.json(
                { success: false, errors: err.errors },
                { status: 400 },
            )
        }
        console.error('Unexpected error', err)
        return NextResponse.json(
            { success: false, error: 'Server error' },
            { status: 500 },
        )
        }

        console.log("Contact form submission:", {
            name,
            email,
            message,
            timestamp: new Date().toISOString(),
        })

        // Simulate processing time
        await new Promise((resolve) => setTimeout(resolve, 1000))

        return NextResponse.json({
            success: true,
            message: "Thank you for your message! I'll get back to you soon.",
        })
    } catch (error) {
        console.error("Contact form error:", error)
        return NextResponse.json({ error: "Something went wrong. Please try again.", success: false }, { status: 500 })
    }
}
