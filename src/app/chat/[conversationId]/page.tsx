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
        <div className={`w-full sm:w-[30vw] sm:block ${conversationId === "home" ? "block" : "hidden"}`}>
            <ActiveConveresation id={session.user.id} />
            <Conversations id={session.user.id} />
        </div>

        <div className={`w-full ${conversationId === "home" && "hidden sm:block"}`}>
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