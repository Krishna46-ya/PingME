import { desc } from "motion/react-client";
import { NextRequest, NextResponse } from "next/server";
import z, { email, string } from "zod";

const otpSchema = z.object({
    email: email(),
    otp: string().length(6)
})

export async function POST(req: NextRequest) {
    const result = otpSchema.safeParse(await req.json())
    if (!result.success) {
        return NextResponse.json({
            msg: "Invalid Inputs"
        }, { status: 400 })
    }
    const body = result.data

    try {
        const user = await prisma?.user.findUnique({
            where: {
                email: body.email
            },
            select: {
                verified: true,
                OtpVarification: {
                    orderBy: {
                        expiresAt: "desc"
                    },
                    take: 1,
                    select: {
                        otp: true,
                        expiresAt: true,
                        userId: true
                    }
                }
            }
        })

        if (!user) {
            return NextResponse.json({ msg: "User doesn't exist, create account" }, { status: 400 })
        }

        if (user.verified) {
            return NextResponse.json({ msg: "User already verified, login instead" }, { status: 409 })
        }

        const optEntry = user.OtpVarification?.[0]
        if (!optEntry) {
            return NextResponse.json({ msg: "No otp found, resend otp" }, { status: 400 })
        }

        const validOtp = new Date() < optEntry.expiresAt

        if (!validOtp || !(optEntry.otp === body.otp)) {
            return NextResponse.json({
                msg: "Invalid Otp"
            }, { status: 400 })
        }

        await prisma?.$transaction([
            prisma.user.update({
                where: {
                    email: body.email
                },
                data: {
                    verified: true
                }
            }),
            prisma.otpVerification.deleteMany({
                where: {
                    userId: optEntry.userId
                }
            })

        ])

        return NextResponse.json({
            msg: "User verified successfully"
        }, { status: 200 })

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            msg: "database error"
        }, { status: 500 })
    }
}