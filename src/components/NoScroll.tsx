export function NoScroll() {
    return (<>
        <div className="w-full h-full bg-white/30">
            <div className="max-w-5xl text-slate-800 text-2xl md:text-5xl py-32 font-bold mx-auto text-center items-center">
                <p>YOU CAN'T SCROLL ANYMORE.</p>
                <p className="pb-5"> BETTER GO CHAT.</p>
                <button className="cursor-pointer hover:scale-[1.05] transition-all duration-300 ease-in-out flex items-center nunito-main px-6 text-lg font-semibold bg-gradient-to-bl shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)]  from-[#f8d7e4] to-[#d5e9fa] py-2 mx-auto rounded-full">
                    <span className="pr-1">Explore App</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                </button>        
                </div>
        </div>
    </>)
}