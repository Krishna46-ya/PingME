'use client'
import { useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import axios from "axios"
import { Button } from "@/components/Button"
import { InputBox } from "@/components/inputbox"
import { SidePanel } from "@/components/sidepanel"
import Link from "next/link"

export default function VerifyPage() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const email = searchParams.get("email") || ""
    const [otp, setOtp] = useState("")
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)
    const [statusCode, setStatusCode] = useState<number | null>(null)
    const [load, setLoad] = useState(false)

    const handleVerify = async () => {
        try {
            if (load) return
            setError(null)
            setLoad(true)
            const res = await axios.post("/api/v1/otp-verify", { email, otp })
            if (res.status === 200) {
                setLoad(false)
                setSuccess("Redirection, Email Verified, Login")
                await new Promise((s) => setTimeout(s, 1000))
                router.push("/signin")
            }
        } catch (err: any) {
            setLoad(false)
            setError(err.response?.data?.msg || "Unknown error")
            setStatusCode(err.response?.status || null)
        }
    }

    return (
        <div className="grid lg:grid-cols-2">
            <SidePanel />
            <div className="flex flex-col justify-center items-center h-screen bg-slate-100">
                <div className="w-80">
                    <div className="font-bold w-full flex justify-center text-4xl">Verify Account</div>
                    <div className="text-center pt-3 pb-3 text-slate-500 font-semibold">
                        <span>Already have an account?</span>
                        <Link className="pl-1 underline" href={'/signin'}>login</Link>
                    </div>
                    <p className="mt-6 text-lg font-semibold text-center text-gray-600">We sent an OTP to {email}</p>
                    <InputBox placeholder="otp" title="OTP" onChange={(e) => { setOtp(e.target.value) }}></InputBox>

                    {error && (
                        <div className="mt-4 text-red-600 text-center font-semibold">
                            Error {statusCode}: {error}
                        </div>
                    )}
                    {success && (
                        <div className="mt-4 text-green-500 text-center font-semibold">
                            Success : {success}
                        </div>
                    )}

                    <Button loading={load} title="Submit" onClick={() => { handleVerify() }}></Button>
                </div>
            </div>
        </div>
    )
}
