'use client'
import { useChatStore } from "@/store/useChatStore"
import { InputMessage } from "./MessageInput"
import { useEffect, useMemo, useRef, useState } from "react"
import { GetMessages } from "@/actions/getMessages"
import { Avator } from "./ui/avator"
import { getOldMessages } from "@/actions/getOldMessage"
import { redirect } from "next/navigation"
import { InfoBox } from "./InfoBox"

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
    const onGoing = useRef(false)

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
            const totalMessages = messagesByConvo[conversationId]?.length || 0
            if (totalMessages < 1) return
            if (onGoing.current === true) return
            onGoing.current = true
            const messages = await getOldMessages({ conversationId, skip: totalMessages })
            if (messages.data) {
                await prependMessages(conversationId, messages.data.map((message) => ({
                    ...message,
                    createdAt: message.createdAt.toISOString()
                })))
            }
            onGoing.current = false
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
            <div className="sticky top-0 left-0 w-full bg-slate-400 items-center flex justify-between md:px-5 px-2 p-2">
                <div className="flex items-center text-slate-900">
                    <button onClick={() => { redirect('/chat/home') }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor" className="size-8 sm:hidden mr-3 active:bg-slate-500 rounded-full">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                        </svg>
                    </button>
                    <Avator id={recipientId}></Avator>
                    <span className="pl-2 text-lg font-semibold truncate max-w-[200px]">{fullRecepient?.name}</span>
                </div>
                <InfoBox convoId={recipientId} name={fullRecepient?.name || ""}></InfoBox>
            </div>
            <div className="h-full pt-16 ">
                {conversationId && (messagesByConvo[conversationId] || []).map((m) => {
                    return (
                        <div key={m.id}>
                            <div className={`p-3 flex ${m.senderId === ID && "justify-end"}`}>
                                <span className={`p-3 break-words max-w-[75%] whitespace-pre-wrap inline-block rounded-lg ${m.senderId === ID ? "bg-blue-400" : "bg-white"}`}>{m.content}</span>
                            </div>
                        </div>
                    )
                })}
                <div className="h-[51px]" ref={messageEndRef}></div>
            </div>
            <div className="absolute bottom-1 p-1 w-full justify-center flex items-center">
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