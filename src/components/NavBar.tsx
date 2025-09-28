import { useScroll, motion, useTransform, useMotionTemplate } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";


const Links = [
    {
        name: "About",
        link: "/chat/home"
    },
    {
        name: "Login",
        link: "/api/auth/signin"
    },
    {
        name: "Sign Up",
        link: "/api/auth/signin"
    }
]

export function NavBar() {
    const [button, setButton] = useState<null | number>(null)

    const [width, setWidth] = useState<number>(1024);

    const router = useRouter()
    const { scrollY } = useScroll()
    const transformY = useTransform(scrollY, [0, 50], [0, 15])
    const transformRounded = useTransform(scrollY, [0, 50], [0, 50])
    const transformYPadding = useTransform(scrollY, [0, 50], [12, 6])


    const transformWidth = useTransform(scrollY,
        [0, 50], width <= 1024 ? (width >= 768 ? [width, 768] : [width, width-30]) : [1024, 768])
    const shadowOpacity = useTransform(scrollY, [0, 50], [0, 0.05])


    useEffect(() => {
        const check = () => setWidth(window.innerWidth);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);


    return (

        <motion.div
            style={{
                y: transformY,
            }}
            className="fixed z-50 top-0 mx-auto w-full">
            <motion.div
                style={{
                    borderRadius: transformRounded,
                    paddingTop: transformYPadding,
                    paddingBottom: transformYPadding,
                    width: transformWidth,
                    boxShadow: useMotionTemplate`0 1px 1px rgba(0, 0, 0, ${shadowOpacity}), 0 4px 6px rgba(34, 42, 53,${shadowOpacity}), 0 24px 68px rgba(47, 48, 55, ${shadowOpacity}), 0 2px 3px rgba(0, 0, 0, ${shadowOpacity})`

                }}
                className="flex justify-between items-center px-6 py-3 bg-white/40 backdrop-blur-md mx-auto">
                <div onClick={() => { router.push('/') }} className="flex justify-center items-center space-x-4 text-2xl text-slate-800 font-mono font-semibold tracking-tighter cursor-pointer">
                    <div className="relative h-10 w-10 rounded-full overflow-hidden">
                        <Image src="/Avator.jpg" alt="avatar" fill className="object-cover" />

                    </div>
                    <h1>
                        PingMe
                    </h1>
                </div>
                {width>=768&&<div className="text-lg font-semibold flex justify-between">
                    {Links.map((link, idx) => {
                        return (<Link key={link.name} href={link.link}>
                            <span
                                onMouseEnter={() => { setButton(idx) }}
                                onMouseLeave={() => { setButton(null) }}
                                className='px-5 py-1.5 relative text-slate-800 '>
                                {link.name}
                                {button === idx && <motion.div
                                    transition={{
                                        type: "spring",
                                        damping: 25,
                                        stiffness: 350,
                                        mass: 1
                                    }}
                                    layoutId="hover" className="shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)] absolute rounded-full -z-10 inset-0 w-full h-full bg-gradient-to-br from-[#ffc8dd] to-[#bde0fe]"></motion.div>}
                            </span>
                        </Link>)
                    })}
                </div>}
            </motion.div>
        </motion.div >

    );
}
