import z from "zod"


//Incoming Messages

export const BaseMessageSchema = z.object({
    type: z.string(),
    conversationId: z.string().nullable().optional(),
    tempId: z.string()
})

export const ChatMessageSchema = BaseMessageSchema.extend({
    type: z.literal("chat"),
    content: z.string().min(1),
    conversationId: z.string(),
    recipientId: z.string()
})

export const JoinMessageSchema = BaseMessageSchema.extend({
    type: z.literal("join"),
    content: z.string().min(1),
    recipientId: z.string(),
})

export const WSMessageSchema = z.union([JoinMessageSchema, ChatMessageSchema])

export type BaseMessage = z.infer<typeof BaseMessageSchema>

export type ChatMessage = z.infer<typeof ChatMessageSchema>

export type JoinMessage = z.infer<typeof JoinMessageSchema>

export type WSMessage = z.infer<typeof WSMessageSchema>

//OutGoing messages

export type ServerMessage = {
    type: "chat",
    data: {
        id: string,
        conversationId: string,
        senderId: string,
        content: string,
        timeStamp: string
    }
} | {
    type: "error",
    data: {
        code: string,
        message: string
    }
} | {
    type: "newChat",
    data: {
        message: {
            id: string,
            conversationId: string,
            senderId: string,
            content: string,
            timeStamp: string,
        },
        participant: {
            id: string,
            name: string | null,
            image: string | null
        }
    }
} | {
    type: "revert",
    data: {
        id: string,
        conversationId: string,
        senderId: string,
        content: string,
        timeStamp: string,

    },
    tempId: string
}