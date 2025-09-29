'use client'
import { useChatStore } from "@/store/useChatStore"
import { InputMessage } from "./MessageInput"
import { useEffect, useMemo, useRef, useState } from "react"
import { GetMessages } from "@/actions/getMessages"
import { Avator } from "./ui/avator"
import { getOldMessages } from "@/actions/getOldMessage"
import { redirect } from "next/navigation"

export function MessageArea({ recipient, ID }: { recipient: string, ID: string }) {
    const { recipientId, conversationId } = useMemo(() => parseParam({ recipient }), [recipient])

    const users = useChatStore(s => s.users)
    const conversations = useChatStore(s => s.conversations)
    const setMessageForConversation = useChatStore(s => s.setMessagesForConvo)
    const prependMessages = useChatStore(s => s.prependMessages)
    const messagesByConvo = useChatStore(s => s.messagesByConvo)
    const messageEndRef = useRef<HTMLDivElement>(null)
    const scrollCointainerRef = useRef<HTMLDivElement>(null)
    const [autoScroll, setAutoScroll] = useState(true)

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

    useEffect(() => {
        if (!conversationId) return
        if (autoScroll) {
            messageEndRef.current?.scrollIntoView({ behavior: "smooth" })
        }
    }, [conversationId, conversationId ? messagesByConvo[conversationId]?.length : 0, autoScroll])

    const scrollHandler = async () => {
        const scroll = scrollCointainerRef.current
        if (!scroll || !conversationId) return;
        if (scroll.scrollTop <= 0) {
            const totalMessages = messagesByConvo[conversationId].length
            if (totalMessages <= 24) return
            const messages = await getOldMessages({ conversationId, skip: totalMessages })
            if (messages.data) {
                await prependMessages(conversationId, messages.data.map((message) => ({
                    ...message,
                    createdAt: message.createdAt.toISOString()
                })))
            }
            console.log(messages)
        }
    }

    const onUserScroll = () => {
        const el = scrollCointainerRef.current
        if (!el) return
        const distanceFromTop = el.scrollTop
        setAutoScroll(distanceFromTop > 100)
    }

    if (isValid === false) {
        return (<></>)
    }

    const fullRecepient = users.find(e => e.id === recipientId)

    return (<>
        <div
            ref={scrollCointainerRef}
            onScroll={(e) => {
                onUserScroll()
                scrollHandler()
            }}
            className="h-screen overflow-y-auto">
            <div className="sticky top-0 left-0 w-full bg-slate-400 items-center flex justify-between p-2">
                <div className="flex items-center">
                    <Avator id={recipientId}></Avator>
                    <span className="pl-2 text-lg font-semibold">{fullRecepient?.name}</span>
                </div>
                <button className="block sm:hidden" onClick={()=>{redirect('/chat/home')}}>BACK</button>
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
                <div ref={messageEndRef}></div>
            </div>
            <div className="absolute bottom-3 p-2 w-full justify-center flex items-center">
                {!(conversationId === undefined) && <InputMessage ID={ID} recipientId={recipientId} conversationId={conversationId}></InputMessage>}
            </div>
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