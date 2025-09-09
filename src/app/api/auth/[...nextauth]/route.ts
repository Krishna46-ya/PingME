import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { NextAuthOptions } from "next-auth";
import prisma from "@/lib/db";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials"
import z, { email, string } from "zod";

const credentialsSchema = z.object({
    email: email(),
    password: string().min(6)
})

export const NEXT_AUTH: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "email", type: "text", placeholder: "example@gmail.com" },
                password: { label: "password", type: "password" }
            },
            async authorize(credentials: { email?: string, password?: string } | undefined) {
                if (!credentials || !credentials.password || !credentials.email) return null

                const result = credentialsSchema.safeParse(credentials)
                if (!result.success) return null

                const user = await prisma.user.findFirst({
                    where: {
                        email: credentials.email,
                        password: credentials.password,
                        verified: true
                    }
                })

                if (!user) return null

                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    image: user.image
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
        })
    ],
    events: {
        async linkAccount({ user, account }) {
            if(account.provider==="google"){
                await prisma.user.update({
                where: {
                    id: user.id
                },
                data: {
                    verified: true
                }
            })
            }
        }
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
            }
            return token
        },
        async session({ session, token }) {
            if (token && session.user) {
                (session.user as any).id = token.id
            }
            return session
        }

    },
    session: {
        strategy: "jwt"
    }
}

export const handler = NextAuth(NEXT_AUTH)


export const POST = handler
export const GET = handler