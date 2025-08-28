'use client'

import { DevScribe } from '@/components/DevScribe'
import { Footer } from '@/components/Footer'
import { Hero } from '@/components/Hero'
import { NavBar } from '@/components/NavBar'
import { NoScroll } from '@/components/NoScroll'
import { ParallaxZoom } from '@/components/ParallaxZoom'
import { Testimonial } from '@/components/Testimonial'
import Lenis from 'lenis'
import { useEffect } from 'react'

export default function Home() {
    useEffect(() => {
        const lenis = new Lenis()

        function raf(time: any) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)

    }, [])

    return (
        <>
            <div className='relative'
                style={{
                    background: "linear-gradient(109.6deg, rgba(112, 246, 255, 0.33) 11.2%, rgba(221, 108, 241, 0.26) 42%, rgba(229, 106, 253, 0.71) 71.5%, rgba(123, 183, 253, 1) 100.2%)",
                    width: "100%",
                    height: "full",
                }}
            >
                <NavBar></NavBar>
                <Hero></Hero>
                <ParallaxZoom></ParallaxZoom>
                <Testimonial></Testimonial>
                <NoScroll></NoScroll>
                <DevScribe></DevScribe>
                <Footer></Footer>
            </div>
            

        </>
    )
}
