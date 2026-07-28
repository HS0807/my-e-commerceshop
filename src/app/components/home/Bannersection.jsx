"use client";
import Image from "next/image";
import React from 'react'
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export default function BannerSection() {
    return (
        <section className="relative">
            <div>
                <Image
                    src="/assets/home-banner.png"
                    alt="Hero Banner"
                    width={1920}
                    height={800}
                    className="w-full  h-72 sm:h-96 md:h-[500px] lg:h-[600px] object-cover" />
            </div>

            <div className="absolute inset-0 mx-auto flex max-w-7xl items-center justify-center lg:justify-start px-6 py-10 lg:px-12">
                <div className="w-full max-w-xl px-4 sm:px-6 lg:px-8">
                    <p className="mb-4 text-sm uppercase text-amber-200">
                        N e w C o l l e c t i o n
                    </p>
                    <h1 className="mb-6 font-semibold font-serif text-white leading-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
                        Elevate Your Everyday Style
                    </h1>
                    <p className="mb-8 max-w-md md:max-w-xl text-white sm:text-lg">
                        Discover timeless pieces crafted for the modern lifestyle.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <Link href="/loginpage"  className="inline-flex items-center gap-2 rounded-full border-2 border-white px-6 py-3 text-sm font-semibold uppercase text-white transition hover:bg-white hover:text-black">
                            Login
                        </Link>
                    </div>


                </div>
            </div>

        </section>
    )
}
