'use client'

import { message, useChatStore } from "@/store/useChatStore"
import { wsContext } from "@/store/wsContext"
import { WSMessage } from "@/types/wsMessages"
import { redirect } from "next/navigation"
import { useContext, useState } from "react"

export function InputMessage({ ID, recipientId, conversationId }: { ID: string, recipientId: string, conversationId: string | null }) {
    const [message, setMessage] = useState('')
    const ws = useContext(wsContext)
    const appendMessages = useChatStore(s => s.appendMessage)
    const appendConversation = useChatStore(s => s.appendConversation)
    const users = useChatStore(s => s.users)

    const sendMessage = () => {
        const tempId = Date.now().toString(36) + Math.random().toString(36).slice(2);

        const payload: WSMessage = conversationId === null ? {
            type: "join",
            content: message,
            recipientId,
            tempId
        } : {
            type: "chat",
            recipientId,
            conversationId,
            content: message,
            tempId
        }

        if (conversationId === null) {
            const lastMessage: message = {
                id: tempId,
                conversationId: tempId,
                senderId: ID,
                content: message,
                createdAt: new Date().toISOString(),
                read: true
            }
            const user = users.find(u => u.id === recipientId)
            if (!user) return
            appendConversation({
                id: tempId,
                participant: {
                    userId: recipientId,
                    conversationId: tempId,
                    user: {
                        name: user.name,
                        image: user.image,
                    }
                },
                lastMessage,
                unreadCount: 0
            })
            appendMessages(tempId, lastMessage)
        } else {
            appendMessages(conversationId, {
                id: tempId,
                conversationId,
                senderId: ID,
                content: message,
                createdAt: new Date().toISOString(),
                read: true
            })
        }

        if (ws?.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify(payload))
            if (conversationId === null) redirect(`/chat/${recipientId}-${tempId}`)
        } else {
            ws?.addEventListener("open", () => {
                ws.send(JSON.stringify(payload))
                if (conversationId === null) redirect(`/chat/${recipientId}-${tempId}`)
            }, { once: true })
        }

        setMessage("")
    }

    return (
        <div className="bg-gray-700 p-2 px-4 rounded-full">
            <input onKeyDown={(e) => { if (e.key === "Enter" && message.trim()) sendMessage() }} value={message} className="text-white outline-none w-[25vw]" placeholder="Message" onChange={(e) => { setMessage(e.target.value) }} ></input>
            <button disabled={!message.trim()} className="text-white bg-gray-900 rounded px-3" onClick={() => { sendMessage() }}>send</button>
        </div>
    )
}