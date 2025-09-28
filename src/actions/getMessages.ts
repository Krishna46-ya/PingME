'use server'

import prisma from "@/lib/db"
import { NEXT_AUTH } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"
import z, { json } from "zod"
import { redis } from "@/lib/redis"
import { message } from "@/store/useChatStore"

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

    //checking the cache to see of there is data in it

    const cacheKey = `messages:${conversationId}`
    if (skip === 0) {
        const cached = await redis.lrange<any | null>(cacheKey, 0, 24)
        const cachedData = cached.filter((x) => x !== null)

        if (cachedData.length) {
            return {
                msg: "Messages found (cache)",
                status: 200,
                data: cachedData
            }
        }
    }

    const messages = await prisma.conversation.findFirst({
        where: {
            participant: {
                some: { user: { id: session.user.id } }
            },
            id: conversationId
        },
        include: {
            Message: {
                take: 25,
                skip,
                orderBy: {
                    createdAt: "asc"
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

    if (skip === 0) {
        const jsonMessage = messages.Message.map(x => JSON.stringify(x))
        await redis.multi()
            .lpush(cacheKey, ...jsonMessage.reverse())
            .ltrim(cacheKey, -25, -1)
            .expire(cacheKey, 24 * 60 * 60)
            .exec()
    }

    return {
        msg: "Messages found",
        status: 200,
        data: messages.Message
    }
}