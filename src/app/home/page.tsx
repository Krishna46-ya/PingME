'use client'

import { signOut, useSession } from "next-auth/react"

export default function Home() {
    const session = useSession()
    return (<>
        {JSON.stringify(session)}
        <div>
            <button onClick={() => { signOut() }}>LOG OUT</button>
        </div>
    </>)
}