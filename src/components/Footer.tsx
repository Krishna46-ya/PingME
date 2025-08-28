import Image from "next/image";
import Link from "next/link";

export function Footer() {
    return (
        <>

            <div className="w-full border-t border-white/70">
                <div className="max-w-5xl py-20 mx-auto grid grid-cols-1 md:grid-cols-2">
                    <div className="md:col-span-1 px-12">
                        <div className="flex gap-x-3">
                            <div className="relative h-10 w-10 rounded-full overflow-hidden">
                                <Image src="/Avator.jpg" alt="avatar" fill className="object-cover" />
                            </div>
                            <h1 className="text-4xl text-slate-800 font-mono font-semibold tracking-tighter cursor-pointer">
                                PingME
                            </h1>
                        </div>
                        <h2 className="text-lg font-semibold text-slate-600 pt-4">
                            A product by <span className="text-slate-950">Krishna</span>
                        </h2>
                        <p className="md:text-lg font-semibold text-slate-600">
                            Building in public at{" "}
                            <Link
                                href={"https://twitter.com/KrishnaYad72181"}
                                className="text-blue-600"
                            >
                                @KrishnaYad72181
                            </Link>
                        </p>
                    </div>

                    <div className="md:col-span-1 md:mx-auto px-12 pt-16 md:pt-0">
                        <div className="flex gap-20 flex-row">
                            <div className="text-neutral-700 font-semibold">
                                <h3 className="text-xl text-neutral-900 pb-3 font-semibold">Links</h3>
                                <div>
                                    <Link href={"/"}>Contact</Link>
                                </div>
                                <div>
                                    <Link href={"https://devscribe-ten.vercel.app/"}>DevScribe</Link>
                                </div>
                            </div>
                            <div className="text-neutral-700 font-semibold">
                                <h3 className="text-xl text-neutral-900 pb-3 font-semibold">Socials</h3>
                                <Link href={"https://x.com/KrishnaYad72181"}>Twitter</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
