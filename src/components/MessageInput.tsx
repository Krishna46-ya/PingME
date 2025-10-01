'use client'

import { message, useChatStore } from "@/store/useChatStore"
import { wsContext } from "@/store/wsContext"
import { WSMessage } from "@/types/wsMessages"
import { redirect } from "next/navigation"
import { useContext, useEffect, useRef, useState } from "react"
import EmojiPicker from 'emoji-picker-react';


export function InputMessage({ ID, recipientId, conversationId }: { ID: string, recipientId: string, conversationId: string | null }) {
    const [message, setMessage] = useState('')
    const ws = useContext(wsContext)
    const appendMessages = useChatStore(s => s.appendMessage)
    const appendConversation = useChatStore(s => s.appendConversation)
    const users = useChatStore(s => s.users)
    const [open, setOpen] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

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

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [])


    return (<div className="relative">
        <div ref={ref}>
            <EmojiPicker width={300} height={400} onEmojiClick={(emojiData) => {
                setMessage((prev) => prev + emojiData.emoji)
            }} open={open} />
        </div>
        <div className="bg-gray-700 p-2 flex items-center px-4 rounded-full">

            <svg onClick={() => { setOpen(true) }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon size-8 text-white icon-tabler icons-tabler-outline icon-tabler-mood-smile"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M9 10l.01 0" /><path d="M15 10l.01 0" /><path d="M9.5 15a3.5 3.5 0 0 0 5 0" /></svg>

            <input onKeyDown={(e) => { if (e.key === "Enter" && message.trim()) sendMessage() }} value={message} className="text-white outline-none pl-1 w-[50vw] sm:w-[25vw]" placeholder="Message" onChange={(e) => { setMessage(e.target.value) }} ></input>

            <button disabled={!message.trim()} className="text-white rounded-full" onClick={() => { sendMessage() }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                </svg>
            </button>
        </div>
    </div>)
}