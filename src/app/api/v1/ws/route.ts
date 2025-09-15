import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { WebSocket, WebSocketServer } from "ws";
import { NEXT_AUTH } from "../../auth/[...nextauth]/route";
import { ChatMessageSchema, JoinMessageSchema, ServerMessage, WSMessage } from "@/types/wsMessages";
import { Session } from "next-auth"
import { redis } from "@/lib/redis";


const clients = new Map<string, WebSocket>()

export async function UPGRADE(
    client: WebSocket,
    server: WebSocketServer,
    request: NextRequest,
    context: RouteContext<"/api/v1/ws">
) {
    const session = await getServerSession(NEXT_AUTH)
    if (!session) {
        client.send(JSON.stringify({
            type: "error",
            data: {
                code: "NOT_AUTHENTICATED",
                message: "User IS not logged in"
            }
        }))
        client.close(4001, "not authenticated")
        return
    }

    clients.set(session.user.id, client)

    client.on("close", () => {
        clients.delete(session.user.id)
    })

    client.on("message", async (data) => {
        const raw = data.toString()

        let msg: WSMessage
        try {
            msg = JSON.parse(raw)

        } catch (err) {
            client.send(JSON.stringify({
                type: "error",
                data: {
                    code: "INVALID_JSON",
                    message: "The JSON object is not valid"
                }
            }))
            console.error("Invalid JSON received :" + raw)
            return;
        }

        if (msg.type === "chat") {
            const result = ChatMessageSchema.safeParse(msg)
            if (!result.success) {
                client.send(JSON.stringify({
                    type: "error",
                    data: {
                        code: "INVALID_CHAT_INPUT",
                        message: "The input for chat operation are invalid"
                    }
                }))
                return
            }

            const isConvo = await ConversationExist({ msg, session })

            if (isConvo) {
                const message = await prisma.message.create({
                    data: {
                        senderId: session.user.id,
                        content: msg.content,
                        conversationId: isConvo.id
                    }
                })
                const serverMessage: ServerMessage = {
                    type: "chat",
                    data: {
                        conversationId: isConvo.id,
                        senderId: session.user.id,
                        content: msg.content,
                        timeStamp: message.createdAt.toISOString()
                    }
                }
                BroadcastMessage({ serverMessage, participant: isConvo.participant })
                client.send(JSON.stringify(serverMessage))
                await appendCacheMessage({ sessionId: session.user.id, conversationId: isConvo.id, message })
                return
            }

            const { message, newConvo } = await NoConversation({ msg, session })
            const serverMessage: ServerMessage = {
                type: "chat",
                data: {
                    conversationId: newConvo.id,
                    senderId: session.user.id,
                    content: msg.content,
                    timeStamp: message.createdAt.toISOString()
                }
            }
            BroadcastMessage({ serverMessage, participant: newConvo.participant })
            client.send(JSON.stringify(serverMessage))
            await appendCacheMessage({ sessionId: session.user.id, conversationId: newConvo.id, message })
            return
        }

        if (msg.type === "join") {
            const result = JoinMessageSchema.safeParse(msg)
            if (!result.success) {
                client.send(JSON.stringify({
                    type: "error",
                    data: {
                        code: "INVALID_JOIN_INPUT",
                        message: "The input for join operation are invalid"
                    }
                }))
                return
            }

            const isConvo = await ConversationExist({ msg, session })

            if (!isConvo) {
                const { message, newConvo } = await NoConversation({ msg, session })
                const serverMessage: ServerMessage = {
                    type: "chat",
                    data: {
                        conversationId: newConvo.id,
                        senderId: session.user.id,
                        content: msg.content,
                        timeStamp: message.createdAt.toISOString()
                    }
                }
                BroadcastMessage({ serverMessage, participant: newConvo.participant })
                client.send(JSON.stringify(serverMessage))
                await appendCacheMessage({ sessionId: session.user.id, conversationId: newConvo.id, message })
                return
            }

            const message = await prisma.message.create({
                data: {
                    senderId: session.user.id,
                    content: msg.content,
                    conversationId: isConvo.id
                }
            })

            const serverMessage: ServerMessage = {
                type: "chat",
                data: {
                    conversationId: isConvo.id,
                    senderId: session.user.id,
                    content: msg.content,
                    timeStamp: message.createdAt.toISOString()
                }
            }
            BroadcastMessage({ serverMessage, participant: isConvo.participant })
            client.send(JSON.stringify(serverMessage))
            await appendCacheMessage({ sessionId: session.user.id, conversationId: isConvo.id, message })
            return
        }

        client.send(JSON.stringify({
            type: "error",
            data: {
                code: "INVALID_TYPE_OPERATION",
                message: "The type of the input in not supported"
            }
        }))
        return
    })
}

async function NoConversation({ msg, session }: { msg: WSMessage, session: Session }) {
    const newConvo = await prisma.conversation.create({
        data: {
            participant: {
                create: [
                    { user: { connect: { id: session.user.id } } },
                    { user: { connect: { id: msg.recipientId } } },
                ]
            }
        },
        include: { participant: true }
    })
    const message = await prisma.message.create({
        data: {
            senderId: session.user.id,
            conversationId: newConvo.id,
            content: msg.content
        }
    })
    return { message, newConvo }
}

async function ConversationExist({ msg, session }: { msg: WSMessage, session: Session }) {
    const isConvo = await prisma.conversation.findFirst({
        where: {
            participant: {
                every: {
                    userId: { in: [session.user.id, msg.recipientId] }
                }
            }
        },
        include: {
            participant: true
        }
    })
    return isConvo
}

function BroadcastMessage({ serverMessage, participant }: {
    serverMessage: ServerMessage,
    participant: {
        id: string;
        userId: string;
        conversationId: string;
        joinedAt: Date;
    }[]
}) {
    for (const p of participant) {
        const ws = clients.get(p.userId)
        if (serverMessage.type === "chat" && p.userId === serverMessage.data.senderId) continue;
        if (ws && ws.readyState === WebSocket.OPEN) {
            try {
                ws.send(JSON.stringify(serverMessage))
            } catch (err) {
                console.error(`Failed to send to ${p.userId}` + err)
            }
        }
    }
}

async function appendCacheMessage({ sessionId, conversationId, message }: {
    sessionId: string,
    conversationId: string,
    message: {
        conversationId: string;
        content: string;
        id: string;
        senderId: string;
        createdAt: Date;
    }
}) {
    const id = `messages:${sessionId}:${conversationId}`
    const cacheExists = await redis.exists(id)
    if (cacheExists) {
        await redis.multi()
            .rpush(id, JSON.stringify(message))
            .ltrim(id, -25, -1)
            .expire(id, 24 * 60 * 60)
            .exec()
    } else {
        const messages = await prisma.message.findMany({
            where: {
                conversationId
            },
            take: 25,
            orderBy: {
                createdAt: "asc"
            }
        })
        const jsonMessage = messages.map(x => JSON.stringify(x))
        await redis.multi()
            .lpush(id, ...jsonMessage.reverse())
            .ltrim(id, -25, -1)
            .expire(id, 24 * 60 * 60)
            .exec()
    }
}