import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import z, { email, string } from "zod";
import { VerificationEmail } from "@/actions/VerificationEmail";

const userSchema = z.object({
    username: string().min(3),
    email: email(),
    password: string().min(6)
})

export async function POST(req: NextRequest) {
    
    const result = userSchema.safeParse(await req.json())
    if (!result.success) {
        return NextResponse.json({
            msg: "incorrect inputs"
        }, { status: 400 })
    }

    const body = result.data

    if (body.username.toLowerCase() === "krishna") {
        return NextResponse.json({
            msg: "Try some other name lil bro, that's my name."
        })
    }

    const user = await prisma.user.findUnique({
        where: {
            email: body.email,
        }
    })

    if (!user) {
        const newUser = await prisma.user.create({
            data: {
                name: body.username,
                email: body.email,
                password: body.password
            }
        })

        const otp = Math.floor(100000 + Math.random() * 900000)
        await prisma.otpVerification.create({
            data: {
                userId: newUser.id,
                otp: String(otp),
                expiresAt: new Date(Date.now() + 5 * 60 * 1000)
            }
        })

        const mailInfo = await VerificationEmail({ email: body.email, username: body.username, otp: String(otp) })

        if (mailInfo.success) {
            return NextResponse.json({
                msg: "otp " + otp + " sent on email " + newUser.email
            }, { status: 201 })
        }
        else {
            return NextResponse.json({
                msg: "Error :" + mailInfo.error + " while sending Email"
            },{status:404})
        }
    }

    if (user.verified === false) {
        const otp = Math.floor(100000 + Math.random() * 900000)
        const newUser = await prisma.$transaction([
            prisma.user.update({
                where: {
                    id: user.id
                },
                data: {
                    name: body.username,
                    password: body.password,
                }
            }),
            prisma.otpVerification.deleteMany({
                where: {
                    userId: user.id,
                }
            }),
            prisma.otpVerification.create({
                data: {
                    userId: user.id,
                    otp: otp.toString(),
                    expiresAt: new Date(Date.now() + 5 * 60 * 1000)
                }
            })
        ])

        const mailInfo = await VerificationEmail({ email: body.email, username: body.username, otp: String(otp) })

        if (mailInfo.success) {
            return NextResponse.json({
                msg: "otp " + otp + " sent on email " + user.email
            }, { status: 201 })
        }
        else {
            return NextResponse.json({
                msg: "Error :" + mailInfo.error + " occured while sending Email"
            },{status:404})
        }
    }

    if (user.verified === true) {
        return NextResponse.json({
            msg: "Account with the email already exists, login instead."
        }, { status: 400 })
    }
}