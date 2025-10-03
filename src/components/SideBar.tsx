'use client'
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { signOut } from "next-auth/react";
import Image from "next/image";

export const navLinks = [
    {
        name: "Hero",
        href: "/",
        svg: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 19.5-15-15m0 0v11.25m0-11.25h11.25" />
            </svg>
        )
    },
    {
        name: "About",
        href: "/about",
        svg: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z" />
            </svg>
        )
    },
    {
        name: "Contact",
        href: "https://x.com/KrishnaYad72181",
        svg: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
            </svg>


        )
    },
    {
        name: "Sign Out",
        svg: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
            </svg>

        ),
        function: async () => {
            await signOut()
        }
    }
]


export function SideBar({ name, image, id }: { name: string, image?: string | null, id: string }) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <div className="relative flex justify-center items-center">
                <button
                    onClick={() => setOpen(prev => !prev)}
                    className="rounded-md focus:outline-none"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-8 h-8"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </button>
                <AnimatePresence>
                    {open && (
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "tween", duration: 0.3 }}
                            className="absolute -top-[14px] -left-4 h-screen w-64 bg-slate-800 shadow-lg z-50"
                        >
                            <div className="inset-0 h-screen relative">
                                <div className="flex justify-between items-center text-4xl font-semibold text-white font-mono p-4 tracking-tight">
                                    <span>PingMe</span>
                                    <svg onClick={() => { setOpen(false) }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-9 m-1">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                                    </svg>
                                </div>

                                {navLinks.map(link => (
                                    <a key={link.name} onClick={link.function} href={link.href} className="text-white p-3 flex items-center font-semibold text-lg gap-2 cursor-pointer hover:bg-white hover:text-slate-800 transition-all duration-100 ease-in-out active:bg-white active:text-slate-800">
                                        {link.svg}
                                        {link.name}
                                    </a>
                                ))}

                                <div className="absolute flex justify-center w-full bottom-5">
                                    <div className="bg-slate-900 rounded-full flex justify-center px-4 py-2 w-min text-white items-center">
                                        <div>
                                            <div className="aspect-square size-11 relative rounded-full overflow-hidden ">
                                                {image && <Image src={image} alt="avator" fill className="object-cover"></Image>}
                                                {!image && <div className="bg-orange-400 text-xl text-white font-semibold inset-0 flex justify-center items-center h-full">{name[0].toUpperCase()}</div>}
                                            </div>
                                        </div>
                                        <div className="pl-2 max-w-44">
                                            <div className="truncate text-lg font-semibold" >{name}</div>
                                            <div className="text-[9px] text-slate-300">{id}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {open && (
                <div
                    onClick={() => setOpen(false)}
                    className="fixed inset-0 z-30"
                />
            )}
        </>
    );
}
