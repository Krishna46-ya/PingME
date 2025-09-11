'use client'

import { getConversation } from "@/actions/getConversation"
import { GetUsers } from "@/actions/getUsers"
import { signOut, useSession } from "next-auth/react"
import { useEffect, useState } from "react"

export default function Home() {

    async function data() {
    }


    useEffect(() => {

        const ws = new WebSocket("ws://localhost:3000/api/v1/ws");

        ws.onopen = () => { ws.send(`{"type":"join","content":"absck","recipientId":"cmfcn7gre0000g5bci49j3tt2"}`) }

        ws.onmessage = (event) =>
            console.log("Message from server:", event.data);

        return () => {
            ws.close();
        };
    }, []);

    const session = useSession()
    return (<>
        {JSON.stringify(session)}
        <div>
            <button onClick={() => { signOut() }}>LOG OUT</button>
        </div>
    </>)
}