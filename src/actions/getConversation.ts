'use server'
import prisma from "@/lib/db";
import { NEXT_AUTH } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function getConversation() {
    const session = await getServerSession(NEXT_AUTH)
    if (!session || !session.user) {
        return { msg: "user not logged in", status: 400 }
    }

    const convo = await prisma.conversation.findMany({
        where: {
            participant: {
                some: {
                    userId: session.user.id
                }
            }
        },
        include: {
            participant: {
                where: {
                    userId: { not: session.user.id }
                },
                include: {
                    user: {
                        select: {
                            name: true,
                            image: true
                        }
                    }
                },
            },
            Message: {
                take: 1,
                orderBy: {
                    createdAt: "desc"
                }
            }
        },
        orderBy: {
            updatedAt: "desc"
        }
    })


    return {
        msg: "convo found",
        status: 200,
        convo
    }
}