'use client'
import { getConversation } from "@/actions/getConversation"
import { GetUsers } from "@/actions/getUsers"
import { conversationMeta, useChatStore } from "@/store/useChatStore"
import { useEffect, useState } from "react"
import { wsContext } from "@/store/wsContext"
import { redirect } from "next/navigation"
import { ServerMessage } from "@/types/wsMessages"
import { Skeleton } from "@/components/ui/Skeleton"
import { useSession } from "next-auth/react"

export default function Layout({ children }: { children: React.ReactNode }) {

    const setUsers = useChatStore(s => s.setUsers)
    const setConversation = useChatStore(s => s.setConversations)
    const conversation = useChatStore(s => s.conversations)
    const session = useSession()

    const [ws, setWs] = useState<WebSocket | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (session.status === "loading") return
        if (session.status === "unauthenticated") redirect('/signin')
        const socket = new WebSocket('/api/v1/ws')
        setWs(socket)

        socket.onmessage = (event) => {
            const messageData: ServerMessage = JSON.parse(event.data)
            const { conversations, appendMessage, appendConversation, validateConversation } = useChatStore.getState();
            switch (messageData.type) {
                case "error":
                    break;
                case "chat":
                    const convoExist = conversations.some(c => c.id === messageData.data.conversationId)
                    if (convoExist) {
                        appendMessage(messageData.data.conversationId, {
                            id: messageData.data.id,
                            conversationId: messageData.data.conversationId,
                            senderId: messageData.data.senderId,
                            content: messageData.data.content,
                            createdAt: messageData.data.timeStamp,
                            read: false
                        })
                    }
                    break;
                case "newChat":
                    const result = conversation.some(c => c.id === messageData.data.message.conversationId)
                    if (!result) {
                        appendConversation({
                            id: messageData.data.message.conversationId,
                            participant: {
                                user: {
                                    name: messageData.data.participant.name,
                                    image: messageData.data.participant.image
                                },
                                userId: messageData.data.message.senderId,
                                conversationId: messageData.data.message.conversationId,
                            },
                            lastMessage: {
                                ...messageData.data.message,
                                createdAt: messageData.data.message.timeStamp,
                                read: false
                            },
                            unreadCount: 1
                        })
                        appendMessage(messageData.data.message.conversationId, {
                            ...messageData.data.message,
                            createdAt: messageData.data.message.timeStamp,
                            read: false
                        })
                    }
                    break;
                case "revert":
                    const newConvo = conversations.find(c => c.id === messageData.tempId)
                    validateConversation(messageData)
                    if (newConvo) redirect(`/chat/${newConvo.participant.userId}-${messageData.data.conversationId}`)
                    break;
            }
        }

        const data = async () => {
            const result = await GetUsers()
            if (Array.isArray(result)) {
                setUsers(result)
            } else {
                redirect('/api/auth/signup')
            }

            const conversations = await getConversation()

            const convos = conversations.convo?.map((e) => (
                {
                    id: e.id,
                    participant: e.participant[0],
                    lastMessage: {
                        id: e.Message[0].id,
                        conversationId: e.Message[0].conversationId,
                        senderId: e.Message[0].senderId,
                        content: e.Message[0].content,
                        createdAt: (e.Message[0].createdAt).toISOString(),
                    }
                } as conversationMeta
            ))
            setConversation(convos || [])
            setLoading(false)
        }
        data();
        return () => {
            socket.close()
        }
    }, [setUsers, setConversation, session])

    if (loading) {
        return (
            <Skeleton />
        )
    }

    return (<>
        <wsContext.Provider value={ws}>
            <div className="max-w-[1680px] mx-auto">
                <div className="h-screen flex flex-row">
                    {children}
                </div>
            </div>
        </wsContext.Provider>
    </>)
}