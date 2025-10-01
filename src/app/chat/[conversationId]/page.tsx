import { NEXT_AUTH } from "@/app/api/auth/[...nextauth]/route";
import { ActiveConveresation } from "@/components/ActiveCoversation";
import { Conversations } from "@/components/Conversations";
import { MessageArea } from "@/components/MessageArea";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home({ params }: any) {
    const conversationId = await params.conversationId
    const session = await getServerSession(NEXT_AUTH)
    if (!session) {
        redirect('/api/auth/signin')
    }
    return (<>
        <div className={`bg-slate-50 w-full sm:w-[30vw] sm:block overflow-y-auto ${conversationId === "home" ? "block" : "hidden"}`}>
            <div className="sticky top-0 z-50 w-full bg-slate-400 flex items-center space-x-4 text-slate-900 text-4xl px-4 p-2.5 font-mono font-bold">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
                <span>PingME</span>
            </div>
            <ActiveConveresation id={session.user.id} />
            <Conversations id={session.user.id} />
        </div>

        <div className={`w-full sm:w-[70vw] ${conversationId === "home" && "hidden sm:block"}`}>
            <div className="h-screen w-full bg-[#fafafa] relative text-gray-950">
                <div
                    className="absolute inset-0 z-0 pointer-events-none"
                    style={{
                        backgroundImage: `
          repeating-linear-gradient(45deg, rgba(0, 0, 0, 0.1) 0, rgba(0, 0, 0, 0.1) 1px, transparent 1px, transparent 20px),
        repeating-linear-gradient(-45deg, rgba(0, 0, 0, 0.1) 0, rgba(0, 0, 0, 0.1) 1px, transparent 1px, transparent 20px)
        `,
                        backgroundSize: "40px 40px",
                    }}
                />
                <div>
                    <MessageArea recipient={conversationId} ID={session.user.id} />
                </div>
            </div>
        </div>
    </>)
}