'use client'
import { useChatStore } from "@/store/useChatStore"
import { InputMessage } from "./MessageInput"
import { useEffect, useMemo, useState } from "react"
import { GetMessages } from "@/actions/getMessages"
import { Avator } from "./ui/avator"
import { redirect } from "next/navigation"

export function MessageArea({ recipient, ID }: { recipient: string, ID: string }) {
    const { recipientId, conversationId } = useMemo(() => parseParam({ recipient }), [recipient])

    const users = useChatStore(s => s.users)
    const conversations = useChatStore(s => s.conversations)
    const setMessageForConversation = useChatStore(s => s.setMessagesForConvo)
    const messagesByConvo = useChatStore(s => s.messagesByConvo)

    const isValid =
        recipientId !== "Invalid" &&
        (conversationId
            ? conversations.some(c => c.id === conversationId)
            : users.some(u => u.id === recipientId));
    useEffect(() => {
        if (conversationId) {
            const conversationExist = conversations.some(c => c.id === conversationId)
            if (conversationExist) {
                const messagesPresent = messagesByConvo[conversationId]?.length || 0
                if (messagesPresent >= 24) return
                const convo = async () => {
                    const message = await GetMessages({ conversationId, skip: "0" })
                    if (message.data)
                        setMessageForConversation(conversationId, message.data)
                }
                convo()
            }
        }
    }, [])

    if (isValid === false) {
        return (<></>)
    }

    const fullRecepient = users.find(e => e.id === recipientId)

    return (<>
        <div className="absolute top-0 left-0 w-full bg-slate-400 items-center justify-between p-2">
            <div className="flex items-center">
                <Avator id={recipientId}></Avator>
                <span className="pl-2 text-lg font-semibold">{fullRecepient?.name}</span>
            </div>
        </div>
        <div className="h-full pt-16">
            {conversationId && (messagesByConvo[conversationId] || []).map((m) => {
                return (
                    <div key={m.id}>
                        <div className={`p-3 ${m.senderId === ID ? "text-right" : "text-left"}`}>
                            <span className={`p-3 ${m.senderId === ID ? "bg-blue-400" : "bg-white"}`}>{m.content}</span>
                        </div>
                    </div>
                )
            })}
        </div>
        <div className="absolute bottom-3 p-2 w-full justify-center flex items-center">
            {!(conversationId === undefined) && <InputMessage ID={ID} recipientId={recipientId} conversationId={conversationId}></InputMessage>}
        </div>
    </>)
}

function parseParam({ recipient }: { recipient: string }) {
    const parts = recipient.split("-")
    if (parts.length === 1) {
        return {
            recipientId: parts[0],
            conversationId: null
        }
    }
    if (parts.length === 2) {
        return {
            recipientId: parts[0],
            conversationId: parts[1]
        }
    } else {
        return {
            recipientId: "Invalid"
        }
    }
}