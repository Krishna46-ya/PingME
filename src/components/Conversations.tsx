'use client'

import { ID, useChatStore } from "@/store/useChatStore";
import Link from "next/link";
import { Avator } from "./ui/avator";

export function Conversations({ id }: { id: ID }) {

    const users = useChatStore(s => s.users);
    const conversations = useChatStore(s => s.conversations);


    const recipientIds = conversations.map((s) => s.participant.userId)

    const usersNotInRecipients = users.filter(
        u => !recipientIds.includes(u.id)
    )

    return (
        <>
            <div className="">
                {usersNotInRecipients.length > 0 && <div className="text-[14px] text-gray-500 p-1 px-4 font-semibold">All other's</div>}
                {usersNotInRecipients.map((e) => {
                    return (
                        <Link href={`/chat/${e.id}`} key={e.id}>
                            <div className="p-3 px-4 hover:bg-black/10 flex items-center font-semibold text-slate-800 text-lg overflow-clip">
                                <div className="size-11">
                                    <Avator id={e.id} />
                                </div>
                                <div className="truncate pl-2">{e.name}</div>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </>
    )
}