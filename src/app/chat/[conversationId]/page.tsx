import { NEXT_AUTH } from "@/lib/auth";
import { ActiveConveresation } from "@/components/ActiveCoversation";
import { Conversations } from "@/components/Conversations";
import { MessageArea } from "@/components/MessageArea";
import { SideBar } from "@/components/SideBar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home({ params }: any) {
    const conversationId = await params.conversationId
    const session = await getServerSession(NEXT_AUTH)
    if (!session) {
        redirect("/signin")
    }
    return (<>

        <div className={`bg-slate-50 w-full sm:w-[30vw] sm:block overflow-y-auto ${conversationId === "home" ? "block" : "hidden"}`}>
            <div className="sticky top-0 z-50 w-full bg-slate-400 flex items-center space-x-4 px-4 p-2.5">
                <SideBar id={session.user.id} name={session.user.name || "A"} image={session.user.image} />
                <span className="font-mono font-bold text-slate-900 text-4xl">PingME</span>
            </div>
            <ActiveConveresation id={session.user.id} />
            <Conversations id={session.user.id} />
        </div>

        <div className={`w-full sm:w-[70vw] border-l border-slate-300 ${conversationId === "home" && "hidden sm:block"}`}>
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