import Image from "next/image";


export function Hero() {
    return (<>
        <div className="flex justify-center bg-white/30 items-center">
            <div className="p-4 max-w-5xl w-full bg-gradient-to-b from-white/40 to-transparent mt-16 flex flex-col gap-y-10 justify-center items-center pt-32 pb-20 backdrop-blur-md">
                <div className="cursive text-5xl max-w-5xl">
                    Slide In, Say Hi, Keep It Chill with PingMe.
                </div>
                <div className="text-2xl bubbler-one-regular">
                    “Good vibes only, better vibes everywhere, best vibes always.”
                </div>
                <div className="flex items-center gap-5">
                    <button className="hover:scale-[1.05] transition-all ease-in-out duration-300 cursor-pointer flex items-center nunito-main px-6 text-lg font-semibold bg-gradient-to-bl from-neutral-200 via-white/20 to-slate-200 shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)] py-2 rounded-full ">
                        <span className="pr-1.5">Connect</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                        </svg>

                    </button>
                    <button className="hover:scale-[1.05] transition-all ease-in-out duration-300 cursor-pointer flex items-center nunito-main px-6 text-lg font-semibold bg-gradient-to-bl shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)]  from-[#f8d7e4] to-[#d5e9fa] py-2 rounded-full">
                        <span className="pr-1">Get Started</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                        </svg>
                    </button>
                </div>
                <div className="mt-32 lg:w-4xl grid grid-rows-2 md:grid-rows-1 md:grid-cols-2 bg-white/50 rounded-4xl md:h-[448px] shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
                    <div className="md:col-span-1 px-5 py-8  md:p-15">
                        <div className="text-2xl md:text-4xl tracking-tight font-bold text-neutral-700">
                            MAKE YOUR CHATS MORE FUN
                        </div>
                        <div>
                            <div className="mt-6 text-neutral-600 leading-relaxed">
                                Express yourself with stickers, emojis, and fun themes.
                                Keep conversations light and lively with a touch of personality.
                            </div>

                            <ul className="mt-6 hidden lg:block space-y-2 text-neutral-700 text-base">
                                <li>😂 Share stickers & GIFs instantly</li>
                                <li>🤝 Connect with friends effortlessly</li>
                            </ul>

                            <button className="mt-6 px-5 py-2 rounded-full bg-gradient-to-br from-pink-300 to-blue-300 font-semibold text-neutral-800 shadow-md hover:scale-105 transition">
                                Try it now
                            </button>

                        </div>
                    </div>
                    <div className="md:col-span-1">
                        <div className="p-3 w-full h-full">
                            <div className="bg-black h-full w-full relative overflow-hidden rounded-4xl shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
                                <Image className="object-cover" src={"/hero2.jpeg"} alt="hero" fill></Image>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col text-2xl md:text-4xl font-bold nunito-main pt-24">
                    <div className="bg-gradient-to-b from-[#b0c4b1]  to-[#4a5759] bg-clip-text text-transparent">
                        Scroll to explore the vibes
                    </div>
                    <div className="flex justify-center items-center p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-12 text-neutral-500 rounded-full">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    </>)
}