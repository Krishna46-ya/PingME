'use client'

import { motion } from 'motion/react'
import Image from 'next/image'

const testimonials = [
    {
        name: "Alice Johnson",
        userId: "@alice_j",
        message: "This service is amazing! Highly recommend to everyone.",
        dp: "/drawing.jpeg"
    },
    {
        name: "Bob Smith",
        userId: "@bob_smith",
        message: "Absolutely fantastic experience from start to finish.",
        dp: "/anime.jpeg"
    },
    {
        name: "Catherine Lee",
        userId: "@cathy_lee",
        message: "Their team went above and beyond to help me.",
        dp: "/cloud.jpeg"
    },
    {
        name: "David Kim",
        userId: "@david_k",
        message: "I'm blown away by the quality and attention to detail.",
        dp: "/hero2.jpeg"
    },
    {
        name: "Emma Williams",
        userId: "@emma_w",
        message: "I can't imagine using anyone else. Truly outstanding.",
        dp: "/dp.jpeg"
    },
    {
        name: "Emma William",
        userId: "@emma_w",
        message: "I can't imagine using anyone else. Truly outstanding.",
        dp: "/dp.jpeg"
    }
]

export function Testimonial() {
    return (
        <div className='w-full h-full bg-white/30'>
            <div className='max-w-6xl pt-24 mx-auto px-3'>
                <div className='flex flex-col md:flex-row justify-center text-[14px] sm:text-2xl nunito-main pb-10 text-slate-800 items-center'>
                    <div>Here's what some of our users have to say about</div>
                    <div className='text-xl pt-1 sm:text-4xl text-slate-800 font-mono font-semibold tracking-tighter md:pl-3'> PingMe.</div>
                </div>
                <div className='grid md:grid-cols-2 rounded-xl overflow-hidden lg:grid-cols-3 relative bg-white/20 px-5'>
                    <div className='absolute z-20 w-full h-32 top-0 bg-gradient-to-b from-pink-100/95 via-transparent pointer-events-none'>
                    </div>
                    <div className='absolute z-20 w-full h-32 bottom-0 bg-gradient-to-t from-pink-100/95 via-transparent pointer-events-none'>
                    </div>

                    <div className='h-[500px] py-4  px-3 relative overflow-hidden'>
                        <motion.div
                            className='flex flex-col gap-12'
                            animate={{
                                y: ["0%", "-50%"]
                            }}
                            transition={{
                                repeat: Infinity,
                                duration: 30,
                                ease: 'linear'
                            }}
                        >
                            {testimonials.map((testi, index) => {
                                return (
                                    <div key={testi.name} className='rounded-xl p-5 shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white/20'>
                                        <div className='rounded-full flex items-center'>
                                            <div className='relative h-10 w-10 overflow-hidden rounded-full'>
                                                <Image alt='dp' fill src={testi.dp}></Image>
                                            </div>
                                            <div className='pl-2'>
                                                <div className='text-lg font-bold'>{testi.name}</div>
                                                <div className="text-sm font-semibold">{testi.userId}</div>
                                            </div>
                                        </div>
                                        <div className="text-[17px]">{testi.message}</div>
                                    </div>
                                )
                            })}
                            {testimonials.map((testi, index) => {
                                return (
                                    <div key={testi.name} className='rounded-xl p-5 shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white/20'>
                                        <div className='rounded-full flex items-center'>
                                            <div className='relative h-10 w-10 overflow-hidden rounded-full'>
                                                <Image alt='dp' fill src={testi.dp}></Image>
                                            </div>
                                            <div className='pl-2'>
                                                <div className='text-lg font-bold'>{testi.name}</div>
                                                <div className="text-sm font-semibold">{testi.userId}</div>
                                            </div>
                                        </div>
                                        <div className="text-[17px]">{testi.message}</div>
                                    </div>
                                )
                            })}
                        </motion.div>
                    </div>

                    <div className='h-[500px] hidden md:block py-4 px-3 relative overflow-hidden'>
                        <motion.div
                            className='flex flex-col gap-12'
                            animate={{
                                y: ["0%", "-50%"]
                            }}
                            transition={{
                                repeat: Infinity,
                                duration: 32,
                                ease: 'linear'
                            }}
                        >
                            {testimonials.map((testi, index) => {
                                return (
                                    <div key={testi.name} className='rounded-xl p-5 shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white/20'>
                                        <div className='rounded-full flex items-center'>
                                            <div className='relative h-10 w-10 overflow-hidden rounded-full'>
                                                <Image alt='dp' fill src={testi.dp}></Image>
                                            </div>
                                            <div className='pl-2'>
                                                <div className='text-lg font-bold'>{testi.name}</div>
                                                <div className="text-sm font-semibold">{testi.userId}</div>
                                            </div>
                                        </div>
                                        <div className="text-[17px]">{testi.message}</div>
                                    </div>
                                )
                            })}
                            {testimonials.map((testi, index) => {
                                return (
                                    <div key={testi.name} className='rounded-xl p-5 shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white/20'>
                                        <div className='rounded-full flex items-center'>
                                            <div className='relative h-10 w-10 overflow-hidden rounded-full'>
                                                <Image alt='dp' fill src={testi.dp}></Image>
                                            </div>
                                            <div className='pl-2'>
                                                <div className='text-lg font-bold'>{testi.name}</div>
                                                <div className="text-sm font-semibold">{testi.userId}</div>
                                            </div>
                                        </div>
                                        <div className="text-[17px]">{testi.message}</div>
                                    </div>
                                )
                            })}
                        </motion.div>
                    </div>

                    <div className='h-[500px] hidden lg:block py-4 px-3 relative overflow-hidden'>
                        <motion.div
                            className='flex flex-col gap-12'
                            animate={{
                                y: ["0%", "-50%"]
                            }}
                            transition={{
                                repeat: Infinity,
                                duration: 31,
                                ease: 'linear'
                            }}
                        >
                            {testimonials.map((testi, index) => {
                                return (
                                    <div key={testi.name} className='rounded-xl p-5 shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white/20'>
                                        <div className='rounded-full flex items-center'>
                                            <div className='relative h-10 w-10 overflow-hidden rounded-full'>
                                                <Image alt='dp' fill src={testi.dp}></Image>
                                            </div>
                                            <div className='pl-2'>
                                                <div className='text-lg font-bold'>{testi.name}</div>
                                                <div className="text-sm font-semibold">{testi.userId}</div>
                                            </div>
                                        </div>
                                        <div className="text-[17px]">{testi.message}</div>
                                    </div>
                                )
                            })}
                            {testimonials.map((testi, index) => {
                                return (
                                    <div key={testi.name} className='rounded-xl p-5 shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white/20'>
                                        <div className='rounded-full flex items-center'>
                                            <div className='relative h-10 w-10 overflow-hidden rounded-full'>
                                                <Image alt='dp' fill src={testi.dp}></Image>
                                            </div>
                                            <div className='pl-2'>
                                                <div className='text-lg font-bold'>{testi.name}</div>
                                                <div className="text-sm font-semibold">{testi.userId}</div>
                                            </div>
                                        </div>
                                        <div className="text-[17px]">{testi.message}</div>
                                    </div>
                                )
                            })}
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    )
}
