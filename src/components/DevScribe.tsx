import Image from "next/image";
import { useRouter } from "next/navigation";

export function DevScribe() {
    const router = useRouter()
    return (
        <div className="w-full h-full bg-white/30">
            <div className="flex justify-center mx-2 pb-20">
            <div className="mt-38 lg:w-4xl grid grid-rows-2 md:grid-rows-1 md:grid-cols-2 bg-white/50 rounded-4xl shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
                <div onClick={() => { router.push('https://devscribe-ten.vercel.app/') }} className="md:col-span-1 transition-all duration-300 ease-in-out hover:scale-[1.03]">
                    <div className="p-3 w-full h-full">
                        <div className="bg-black h-full w-full relative overflow-hidden rounded-4xl shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
                            <Image className="object-cover" src={"/DevScribe.png"} alt="hero" fill></Image>
                        </div>
                    </div>
                </div>
                <div className="md:col-span-1 px-5 py-8  ">
                    <div className="text-2xl  tracking-tight font-bold text-neutral-700">
                        ALSO CHECKOUT MY OTHER WEBSITE, DevScribe
                    </div>
                    <div>
                        <div className="mt-4 text-neutral-600 leading-relaxed">
                            Your Daily Dose of Tech, Code & Creativity. Join a community exploring the latest in web, tech, and tools.
                        </div>
                        <button onClick={() => { router.push('https://devscribe-ten.vercel.app/') }} className="mt-6 px-5 py-2 rounded-full bg-gradient-to-br from-pink-300 to-blue-300 font-semibold text-neutral-800 shadow-md hover:scale-105 transition">
                            Try it now
                        </button>
                    </div>
                </div>
            </div>
        </div >
        </div>

    )
}