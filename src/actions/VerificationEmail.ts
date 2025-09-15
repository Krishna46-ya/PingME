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
    <h1>Welcome, ${username}</h1>
    <p>Your OTP is: <b>${otp}</b></p>
    <p>This code will expire in 5 minutes.</p>
  `
    })
    return { success: true, data }
  } catch (error) {
    return { success: false, error }
  }
}