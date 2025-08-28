'use client'
import { motion, useMotionTemplate, useScroll, useTransform } from 'motion/react'
import Image from 'next/image'
import { useRef } from 'react'

const technologies = [
    {
        name: "Tailwind",
        src: "/logo/tailwind.png"
    },
    {
        name: "Motion",
        src: "/logo/motion.png"
    },
    {
        name: "Next.js",
        src: "/logo/next-js.svg"
    },
    {
        name: "NextAuth.js",
        src: "/logo/nextAuth.webp"
    },
    {
        name: "Prisma",
        src: "/logo/prisma.png"
    },
    {
        name: "TypeScript",
        src: "/logo/ts.png"
    }
]



export function NoScroll() {
    const ref = useRef<HTMLDivElement>(null);
    const {scrollYProgress} = useScroll({
        target:ref,
        offset:["start end","end start"]
    })

    const transformOpacity =useTransform(scrollYProgress,[0,0.2,0.7,1],[0.2,1,1,0])
    const transformScale = useTransform(scrollYProgress,[0,0.2,0.7,1],[0.95,1,1,0.95])
    const transformBlur = useTransform(scrollYProgress,[0,0.2,0.7,1],[10,0,0,10])

    return (<>
        <div className="w-full h-full pt-38  bg-white/30">
            <motion.div
            ref={ref}
            style={{
                opacity:transformOpacity,
                scale:transformScale,
                filter:useMotionTemplate`blur(${transformBlur}px)`
            }}
            className="max-w-5xl text-slate-800 text-2xl md:text-5xl font-bold mx-auto text-center items-center">
                <p>YOU CAN'T SCROLL ANYMORE.</p>
                <p className="pb-5"> BETTER GO CHAT.</p>
                <button className="cursor-pointer hover:scale-[1.05] transition-all duration-300 ease-in-out flex items-center nunito-main px-6 text-lg font-semibold bg-gradient-to-bl shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)]  from-[#f8d7e4] to-[#d5e9fa] py-2 mx-auto rounded-full">
                    <span className="pr-1">Explore App</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                </button>
            </motion.div>
            
        </div>
    </>)
}