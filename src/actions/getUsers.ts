'use server'
import prisma from "@/lib/db"

export async function GetUsers() {
    const users = await prisma.user.findMany({
        where: {
            verified: true
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