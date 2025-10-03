'use server'
import { Resend } from "resend"
const resend = new Resend(process.env.RESEND_API_KEY)

export async function VerificationEmail({ email, otp, username }: { email: string, otp: string, username: string }) {
  try {
    const data = await resend.emails.send({
      from: "noreply@updates.krishnay.shop",
      to: email,
      subject: "Verify your account",
      html: `
  <div style="font-family: Arial, sans-serif; background-color: #f9fafb; padding: 20px; color: #111827;">
    <div style="max-width: 480px; margin: auto; background: #ffffff; border-radius: 12px; padding: 24px; box-shadow: 0 4px 10px rgba(0,0,0,0.08);">
      <h1 style="font-size: 20px; margin-bottom: 12px; color: #2563eb;">Welcome, ${username} 🎉</h1>
      <p style="margin: 0 0 16px; font-size: 14px; color: #374151;">Thank you for signing up for <b>PingMe</b>. Please use the following OTP to verify your account:</p>
      <div style="text-align: center; margin: 24px 0;">
        <span style="font-size: 24px; font-weight: bold; color: #111827; letter-spacing: 3px; background: #f3f4f6; padding: 10px 20px; border-radius: 8px; display: inline-block;">
          ${otp}
        </span>
      </div>
      <p style="font-size: 13px; color: #6b7280;">This code will expire in <b>5 minutes</b>. If you didn’t request this, you can safely ignore this email.</p>
      <hr style="margin: 24px 0; border: none; border-top: 1px solid #e5e7eb;" />
      <p style="font-size: 12px; color: #9ca3af; text-align: center;">
        © ${new Date().getFullYear()} PingMe. All rights reserved.
      </p>
    </div>
  </div>
  `
    })
    return { success: true, data }
  } catch (error) {
    return { success: false, error }
  }
}
