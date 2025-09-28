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
            <div>
                {usersNotInRecipients.map((e) => {
                    return (
                        <Link href={`/chat/${e.id}`} key={e.id}>
                            <div className="p-2 hover:bg-black/10 flex items-center">
                                <Avator id={e.id} />
                                <div>{e.name}</div>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </>
    )
}