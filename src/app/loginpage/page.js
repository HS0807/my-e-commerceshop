'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { FaRegEye, FaRegEyeSlash, FaRegUser } from 'react-icons/fa'
import { RiLock2Line } from 'react-icons/ri'

function Field({ label, icon: Icon, children, className = '', ...props }) {
    return (
        <label className={`block ${className}`}>
            <span className="mb-2 block text-sm font-medium text-zinc-900">
                {label}
            </span>

            <span className="relative block">
                <Icon className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-zinc-800" />
                {children || <input className={fieldClass} {...props} />}
            </span>
        </label>
    )
}

export default function Login() {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <main className="min-h-screen bg-white text-zinc-950">
            <div className="grid min-h-screen lg:grid-cols-[minmax(420px,41%)_1fr]">

                {/* Left Section */}
                <aside className="relative hidden overflow-hidden lg:block">
                    <Image
                        src="/assets/girl.png"
                        alt="Fashion Model"
                        fill
                        priority
                        sizes="41vw"
                        className="object-cover object-center"
                    />

                    <div className="absolute inset-0" />

                    <Link href="/" className="absolute left-10 top-10 text-white">
                        <span className="block font-serif text-[2.2rem] leading-none tracking-[0.18em]">
                            VELOURA
                        </span>

                        <span className="mt-3 block text-[0.63rem] font-semibold tracking-[0.42em]">
                            STYLE THAT DEFINES YOU
                        </span>
                    </Link>

                    <div className="absolute inset-x-10 bottom-14 text-white">
                        <h2 className="text-3xl font-bold tracking-tight">
                            Welcome Back
                        </h2>

                        <p className="mt-3 max-w-sm text-lg leading-7 text-white/95">
                            Login to continue exploring premium fashion, exclusive collections
                            and your personalized shopping experience.
                        </p>
                    </div>
                </aside>

                {/* Right Section */}
                <section className="relative flex items-center justify-center px-5 py-10 sm:px-10 lg:px-14">
                    <div className="w-full max-w-xl pt-14 lg:pt-7">

                        <div className="mb-10">
                            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                                Welcome Back
                            </h1>

                            <p className="mt-2 text-lg text-zinc-600">
                                Login to your Veloura account
                            </p>
                        </div>

                        <form
                            className="space-y-7"
                            onSubmit={(e) => e.preventDefault()}
                        >
                            {/* Username */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-zinc-900">
                                    Username
                                </label>

                                <div className="relative">
                                    <FaRegUser className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-zinc-800" />

                                    <input
                                        type="text"
                                        placeholder="Enter your username"
                                        className="h-14 w-full rounded-lg border border-zinc-300 bg-white py-3 pl-12 pr-4 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-500 focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-zinc-900">
                                    Password
                                </label>

                                <div className="relative">
                                    <RiLock2Line className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-zinc-800" />

                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter your password"
                                        className="h-14 w-full rounded-lg border border-zinc-300 bg-white py-3 pl-12 pr-12 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-500 focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10"
                                        required
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-900"
                                    >
                                        {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                                    </button>
                                </div>
                            </div>

                            {/* Login Button */}
                            <button
                                type="submit"
                                className="h-14 w-full rounded-lg bg-zinc-950 text-base font-semibold text-white transition hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:ring-offset-2"
                            >
                                Login
                            </button>
                        </form>
                    </div>
                </section>
            </div>
        </main>
    )
}