'use client'
import { ID, useChatStore } from "@/store/useChatStore";
import { Avator } from "./ui/avator";
import Link from "next/link";

export function ActiveConveresation({ id }: { id: ID }) {
    const conversations = useChatStore(s => s.conversations)
    return (<>
        <div>
            {conversations.map((e) => {
                return (
                    <Link href={`/chat/${e.participant.userId}-${e.participant.conversationId}`} key={e.id}>
                        <div className="flex items-center p-2 hover:bg-black/10">
                            <Avator id={e.participant.userId}></Avator>
                            <div>
                                <div>{e.participant.user.name}</div>
                                <div>{e.lastMessage?.content}</div>
                            </div>
                        </div>
                    </Link>
                )
            })}
        </div>
    </>)
}