import {NextResponse} from 'next/server'
import {Resend} from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request) {
	try {
		const body = await request.json()
		const {fullName, phone, email, message} = body

		// Validate required fields
		if (!fullName || !email || !message) {
			return NextResponse.json(
				{error: 'Missing required fields'},
				{status: 400}
			)
		}

		// Email validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		if (!emailRegex.test(email)) {
			return NextResponse.json({error: 'Invalid email address'}, {status: 400})
		}

		// Send email using Resend
		const {data, error} = await resend.emails.send({
			from: 'Contact Form <onboarding@resend.dev>', // You'll change this to your verified domain
			to: process.env.CONTACT_EMAIL || 'Info@frontridge.ca',
			replyTo: email,
			subject: `New Contact Form Submission from ${fullName}`,
			html: `
				<!DOCTYPE html>
				<html>
					<head>
						<meta charset="utf-8">
						<meta name="viewport" content="width=device-width, initial-scale=1.0">
					</head>
					<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
						<div style="background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
							<h1 style="color: white; margin: 0; font-size: 28px;">New Contact Form Submission</h1>
						</div>
						
						<div style="background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px;">
							<div style="background: white; padding: 25px; border-radius: 8px; margin-bottom: 20px;">
								<h2 style="color: #f97316; margin-top: 0; font-size: 20px; border-bottom: 2px solid #f97316; padding-bottom: 10px;">Contact Information</h2>
								
								<div style="margin-bottom: 20px;">
									<p style="margin: 5px 0; color: #6b7280; font-size: 14px; font-weight: 600;">FULL NAME</p>
									<p style="margin: 5px 0 15px 0; font-size: 16px; color: #111827;">${fullName}</p>
								</div>
								
								<div style="margin-bottom: 20px;">
									<p style="margin: 5px 0; color: #6b7280; font-size: 14px; font-weight: 600;">EMAIL ADDRESS</p>
									<p style="margin: 5px 0 15px 0;">
										<a href="mailto:${email}" style="color: #f97316; text-decoration: none; font-size: 16px;">${email}</a>
									</p>
								</div>
								
								${
									phone
										? `
								<div style="margin-bottom: 20px;">
									<p style="margin: 5px 0; color: #6b7280; font-size: 14px; font-weight: 600;">PHONE NUMBER</p>
									<p style="margin: 5px 0 15px 0;">
										<a href="tel:${phone}" style="color: #f97316; text-decoration: none; font-size: 16px;">${phone}</a>
									</p>
								</div>
								`
										: ''
								}
							</div>
							
							<div style="background: white; padding: 25px; border-radius: 8px;">
								<h2 style="color: #f97316; margin-top: 0; font-size: 20px; border-bottom: 2px solid #f97316; padding-bottom: 10px;">Message</h2>
								<p style="white-space: pre-wrap; line-height: 1.8; font-size: 15px; color: #374151;">${message}</p>
							</div>
							
							<div style="margin-top: 25px; padding: 20px; background: #fef3c7; border-left: 4px solid #f59e0b; border-radius: 4px;">
								<p style="margin: 0; font-size: 14px; color: #92400e;">
									<strong>📧 Quick Reply:</strong> You can reply directly to this email to respond to ${fullName}
								</p>
							</div>
							
							<div style="margin-top: 25px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center;">
								<p style="margin: 0; color: #9ca3af; font-size: 12px;">
									Sent from Front Ridge Construction contact form
									<br>
									<a href="https://frontridge.ca" style="color: #f97316; text-decoration: none;">frontridge.ca</a>
								</p>
							</div>
						</div>
					</body>
				</html>
			`,
		})

		if (error) {
			console.error('Resend error:', error)
			return NextResponse.json(
				{error: 'Failed to send email. Please try again.'},
				{status: 500}
			)
		}

		return NextResponse.json(
			{
				success: true,
				message: 'Email sent successfully',
				emailId: data.id,
			},
			{status: 200}
		)
	} catch (error) {
		console.error('Contact form error:', error)
		return NextResponse.json(
			{error: 'An unexpected error occurred. Please try again later.'},
			{status: 500}
		)
	}
}
