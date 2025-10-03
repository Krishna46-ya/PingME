'use client'
import { Button, GoogleButton } from "@/components/Button"
import { InputBox } from "@/components/inputbox"
import { OR } from "@/components/OR"
import { SidePanel } from "@/components/sidepanel"
import Link from "next/link"
import { useRef, useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"

export default function Signup() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [error, setError] = useState<string | null>(null)
    const [statusCode, setStatusCode] = useState<number | null>(null)
    const router = useRouter()
    const [load, setLoad] = useState(false)

    const handleSubmit = async () => {
        try {
            if (load) return
            setLoad(true)
            setError(null)
            const res = await axios.post("/api/v1/signup", {
                username,
                password,
                email
            })

            if (res.status === 201) {
                setError(null)
                setStatusCode(null)

                router.push(`/verify?email=${encodeURIComponent(email)}`)
                setLoad(false)
            }
        } catch (err: any) {
            setLoad(false)
            setError(err.response?.data?.msg || "Unknown error")
            setStatusCode(err.response?.status || null)
        }
    }

    return (
        <div className="grid lg:grid-cols-2">
            <div className="flex flex-col justify-center items-center h-screen bg-slate-100">
                <div className="w-80">
                    <div className="font-bold w-full flex justify-center text-4xl">Sign up</div>
                    <div className="text-center pt-3 pb-3 text-slate-500 font-semibold">
                        <span>Already have an account?</span>
                        <Link className="pl-1 underline" href={'/signin'}>login</Link>
                    </div>
                    <InputBox title="Username" placeholder="Joe"
                        onChange={(e) => setUsername(e.target.value)} />
                    <InputBox title="Email" placeholder="example@gmail.com"
                        onChange={(e) => setEmail(e.target.value)} />
                    <InputBox title="Password" placeholder="six characters" type="password"
                        onChange={(e) => setPassword(e.target.value)} />

                    <Button loading={load} title="Submit" onClick={handleSubmit} />

                    {error && (
                        <div className="mt-4 text-red-600 text-center font-semibold">
                            Error {statusCode}: {error}
                        </div>
                    )}

                    <OR />
                    <GoogleButton title="Sign up with Google" />
                </div>
            </div>
            <SidePanel />
        </div>
    )
}
