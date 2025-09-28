'use server'
import { NEXT_AUTH } from "@/app/api/auth/[...nextauth]/route"
import prisma from "@/lib/db"
import { getServerSession } from "next-auth"

export async function GetUsers() {
    const session = await getServerSession(NEXT_AUTH)
    if (!session) {
        return {
            msg: "NOT_AUTHERIZED",
            status: 400
        }
    }
    const users = await prisma.user.findMany({
        where: {
            verified: true,
            id: { not: session.user.id }
        },
        select: {
            id: true,
            name: true,
            image: true,
        },
        orderBy: {
            name: "asc"
        }
    })
    return users
}