'use client'
import { login } from "@/actions/login"
import { Button, GoogleButton } from "@/components/Button"
import { InputBox } from "@/components/inputbox"
import { OR } from "@/components/OR"
import { SidePanel } from "@/components/sidepanel"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { useState } from "react"

export type ErrorType = {
    msg: string,
    status: number
}

export default function Signin() {
    const [password, setpassword] = useState("")
    const [email, setemail] = useState("")
    const [err, setErr] = useState<null | ErrorType>(null)
    const [load, setLoad] = useState(false)

    return (<>
        <div className="grid lg:grid-cols-2">
            <div className="flex flex-col justify-center items-center h-screen bg-slate-100">
                <div className=" w-80">
                    <div className="font-bold w-full flex justify-center text-4xl">Sign in</div>
                    <div className="text-center pt-3 pb-3 text-slate-500 font-semibold">
                        <span>
                            Don't have an account?
                        </span>
                        <Link className="pl-1 underline" href={'/signup'}>Sign up</Link>
                    </div>
                    <InputBox title="Email" placeholder="example@gmail.com" onChange={(e) => setemail(e.target.value)}></InputBox>
                    <InputBox title="Password" placeholder="six characters" type="password" onChange={(e) => setpassword(e.target.value)}></InputBox>
                    <Button loading={load} title="Submit" onClick={async () => {
                        if (load) return
                        setLoad(true)
                        const res = await login({ password, email })
                        if (res.status === 200) {
                            await signIn("credentials", {
                                email,
                                password,
                                callbackUrl: '/chat/home'
                            })
                            setLoad(false)
                        }
                        else {
                            setLoad(false)
                            setErr(res)
                        }
                    }}></Button>
                    <OR></OR>
                    <GoogleButton title="Sign in with Google"></GoogleButton>
                </div>
            </div>
            <SidePanel></SidePanel>
        </div>
        {err && <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
            <div className="bg-slate-100 m-3 p-6 py-10 rounded-md shadow-lg w-96 text-xl text-center">
                <div className="mb-4 font-semibold text-slate-800">{err.status} : {err.msg}</div>

                <button
                    onClick={() => setErr(null)}
                    className="bg-slate-800 hover:bg-slate-900 text-white px-4 py-1.5 shadow transition-colors duration-100 ease-in-out shadow-slate-400 rounded"
                >
                    Go Back
                </button>
            </div>
        </div>}
    </>)
}