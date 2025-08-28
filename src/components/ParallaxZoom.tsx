import { scale, useMotionTemplate, useMotionValueEvent, useScroll, useTransform, motion } from "motion/react";
import Image from "next/image";
import { useRef } from "react";

export function ParallaxZoom() {
    const ref = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end end"]

    })
    const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4])
    const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5])
    const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6])
    const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8])
    const scale7 = useTransform(scrollYProgress, [0, 1], [1, 7])
    const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9])


    return (
        <>
            <div ref={ref} className="h-[300vh] realtive">
                <div className="h-screen sticky bg-white/30 top-0 overflow-hidden">
                    <motion.div style={{
                        scale: scale4
                    }} className="h-full w-full top-0 absolute flex justify-center items-center overflow-hidden">
                        <div className="relative h-[25vh] w-[25vw]">
                            <Image className="shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)] object-cover" src={'/anime.jpeg'} alt="miku" fill>
                            </Image>
                        </div>
                    </motion.div>

                    <motion.div style={{
                        scale: scale7
                    }} className="h-full w-full top-0 absolute flex justify-center items-center overflow-hidden">
                        <div className="relative top-[-10vh] left-[-25vw] h-[45vh] w-[20vw]">
                            <Image className="shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)] object-cover" src={'/vibes.jpg'} alt="guitar" fill>
                            </Image>
                        </div>
                    </motion.div>

                    <motion.div style={{
                        scale: scale6
                    }} className="h-full w-full top-0 absolute flex justify-center items-center overflow-hidden">
                        <div className="relative top-[-30vh] left-[5vw] h-[30vh] w-[35vw]">
                            <Image className="shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)] object-cover" src={'/hero.jpg'} alt="miku" fill>
                            </Image>
                        </div>
                    </motion.div>

                    <motion.div style={{
                        scale: scale5
                    }} className="h-full w-full top-0 absolute flex justify-center items-center overflow-hidden">
                        <div className="relative left-[27.5vw] h-[25vh] w-[25vw]">
                            <Image className="shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)] object-cover" src={'/cloud.jpeg'} alt="miku" fill>
                            </Image>
                        </div>
                    </motion.div>

                    <motion.div style={{
                        scale: scale9
                    }} className="h-full w-full top-0 absolute flex justify-center items-center overflow-hidden">
                        <div className="relative top-[27.5vh] left-[-22.5vw] h-[25vh] w-[30vw]">
                            <Image className="shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)] object-cover" src={'/download.jpeg'} alt="miku" fill>
                            </Image>
                        </div>
                    </motion.div>

                    <motion.div style={{
                        scale: scale6
                    }} className="h-full w-full top-0 absolute flex justify-center items-center overflow-hidden">
                        <div className="relative top-[27.5vh] left-[5vw] h-[25vh] w-[20vw]">
                            <Image className="shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)] object-cover" src={'/friends.jpg'} alt="miku" fill>
                            </Image>
                        </div>
                    </motion.div>

                    <motion.div style={{
                        scale: scale8
                    }} className="h-full w-full top-0 absolute flex justify-center items-center overflow-hidden">
                        <div className="relative top-[22.5vh] left-[25vw] h-[15vh] w-[15vw]">
                            <Image className="shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)] object-cover" src={'/drawing.jpeg'} alt="miku" fill>
                            </Image>
                        </div>
                    </motion.div>

                </div>
            </div>
        </>
    )
}