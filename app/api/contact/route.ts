import { NextResponse } from "next/server"

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

        // Here you would typically:
        // 1. Send email via service like Resend, SendGrid, or Nodemailer
        // 2. Save to database
        // 3. Send to webhook/notification service

        // For now, we'll just log it and return success
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
