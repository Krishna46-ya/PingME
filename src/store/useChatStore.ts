import { ServerMessage } from "@/types/wsMessages";
import { read } from "fs";
import { create } from "zustand";

export type ID = string

export type message = {
    id: ID,
    conversationId: ID,
    senderId: ID,
    content: string,
    createdAt: string,
    read?: boolean,
}

export type user = {
    name: string | null;
    id: string;
    image: string | null;
}

export type participant =
    {
        user: {
            name: string | null;
            image: string | null;
        };
    } & {
        userId: string;
        conversationId: string;
    }

export type conversationMeta = {
    id: ID,
    participant: participant,
    lastMessage: message | null,
    unreadCount?: number
}

type chatState = {
    messagesByConvo: Record<ID, message[]>
    conversations: conversationMeta[]
    users: user[]

    setMessagesForConvo: (convoId: ID, messages: message[]) => void,
    setConversations: (convos: conversationMeta[]) => void,
    setUsers: (users: user[]) => void

    appendMessage: (convoId: ID, message: message) => void
    appendConversation: (conversationMeta: conversationMeta) => void,

    validateConversation: (message: Extract<ServerMessage, { type: "revert" }>) => void
}

export const useChatStore = create<chatState>((set, get) => ({
    messagesByConvo: {},
    conversations: [],
    users: [],

    setMessagesForConvo: (convoId, messages) => {
        set((state) => ({
            messagesByConvo: {
                ...state.messagesByConvo, [convoId]: messages.map((message) => ({ ...message, read: true }))
            }
        }))
    },

    setConversations: (convos) => {
        set({ conversations: convos })
    },

    setUsers: (users) => {
        set({ users })
    },

    appendMessage: (convoId, message) => {
        set((state) => {
            return {
                messagesByConvo: {
                    ...state.messagesByConvo, [convoId]: [...(state.messagesByConvo[convoId] || []), message]
                },

                conversations: state.conversations.map(c =>
                    c.id === convoId
                        ? {
                            ...c,
                            lastMessage: message,
                            unreadCount: (c.unreadCount || 0) + 1
                        } : c
                )
            }
        })
    },

    appendConversation: (conversationMeta) => {
        set((state) => ({
            conversations: [
                conversationMeta, ...state.conversations
            ],
        }))
    },

    validateConversation: (message) => {
        set((state) => {
            const convo = state.conversations.find(c => c.id === message.tempId)
            const lastMessage = {
                id: message.data.id,
                conversationId: message.data.conversationId,
                senderId: message.data.senderId,
                content: message.data.content,
                createdAt: message.data.timeStamp,
                read: true
            }
            if (!convo) {
                const record = state.messagesByConvo[message.data.conversationId] || []
                const newRecord = [...(record.filter(r => r.id !== message.tempId)), lastMessage]
                return {
                    messagesByConvo: {
                        ...state.messagesByConvo, [message.data.conversationId]: newRecord
                    }
                }
            }
            const restConvo = state.conversations.filter(c => c.id !== message.tempId)
            const newConvo: conversationMeta = {
                id: message.data.conversationId,
                participant: {
                    user: convo.participant.user,
                    userId: convo.participant.userId,
                    conversationId: message.data.conversationId
                },
                lastMessage,
                unreadCount: 0
            }
            const { [message.tempId]: _old, ...restMessages } = state.messagesByConvo
            const newMessage: message = {
                ...message.data,
                createdAt: message.data.timeStamp
            }
            return {
                conversations: [
                    newConvo, ...restConvo
                ],
                messagesByConvo: {
                    ...restMessages, [message.data.conversationId]: [newMessage]
                }
            }
        })
    }
}))