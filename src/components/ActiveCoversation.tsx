'use client'
import { ID, useChatStore } from "@/store/useChatStore";
import { Avator } from "./ui/avator";
import Link from "next/link";

export function ActiveConveresation({ id }: { id: ID }) {
    const conversations = useChatStore(s => s.conversations)
    return (<>
        <div>
            {conversations.length > 0 && <div className="text-[14px] text-gray-500 p-1 px-4 font-semibold">Active Convos</div>}
            {conversations.map((e) => {
                return (
                    <Link href={`/chat/${e.participant.userId}-${e.participant.conversationId}`} key={e.id}>
                        <div className="flex items-center p-3 px-4 text-slate-800 font-semibold text-lg hover:bg-black/10 overflow-clip">
                            <div className="size-11 mr-2">
                                <Avator id={e.participant.userId}></Avator>
                            </div>
                            <div className="min-w-0 flex-1">
                                <div className="truncate">{e.participant.user.name}</div>
                                <div className="truncate text-sm text-gray-600">{e.lastMessage?.content}</div>
                            </div>
                        </div>
                    </Link>
                )
            })}
        </div>
    </>)
}