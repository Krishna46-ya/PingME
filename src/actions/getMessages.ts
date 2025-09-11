'use server'

import prisma from "@/lib/db"
import { NEXT_AUTH } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"
import z from "zod"

const convoId = z.object({
    conversationId: z.string().length(25),
    skip: z.coerce.number().int().nonnegative().default(0)
})

export async function GetMessages(input: { conversationId: string, skip?: string }) {
    const session = await getServerSession(NEXT_AUTH)
    if (!session) {
        return {
            msg: "NOT_AUTHENTICATED",
            status: 401
        }
    }

    const result = convoId.safeParse(input)
    if (!result.success) {
        return {
            msg: "Invalid Input",
            status: 400
        }
    }
    const { conversationId, skip } = result.data

    const messages = await prisma.conversation.findFirst({
        where: {
            participant: {
                some: { user: { id: session.user.id } }
            },
            id: conversationId
        },
        include: {
            Message: {
                take: 20,
                skip,
                orderBy: {
                    createdAt: "desc"
                }
            }
        }
    })

    if (!messages) {
        return {
            msg: "Converation Doesn't Exist",
            status: 404
        }
    }

    return {
        msg: "Messages found",
        status: 200,
        data: messages.Message
    }
}