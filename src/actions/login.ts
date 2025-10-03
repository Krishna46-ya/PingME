'use server'
import prisma from "@/lib/db"
import z from "zod"
import bcrypt from 'bcrypt';

export async function login({ email, password }: { email: string, password: string }) {

    const credential = z.object({
        email: z.email(),
        password: z.string().min(6)
    })

    const varify = credential.safeParse({ email, password })
    if (!varify.success) {
        return {
            msg: "Invalid Inputs",
            status: 404
        }
    }
    try {
        const user = await prisma.user.findFirst({
            where: {
                email,
                verified: true
            },
            select: {
                password: true
            }
        })
        if (!user) {
            return {
                msg: "User does't exist",
                status: 401
            }
        }
        if (!user.password) {
            return {
                msg: "You have a Google id with us try using it",
                status: 400
            }
        }
        const isCorrect = await bcrypt.compare(password, user.password)

        if (isCorrect) {
            return {
                msg: "User Varified",
                status: 200
            }
        } else {
            return {
                msg: "Incorrect Password",
                status: 401
            }
        }
    } catch {
        return {
            msg: "Connection with DB failed please try again",
            status: 500
        }
    }

}