'use client'

import Cookies from "js-cookie";
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { FaRegEye, FaRegEyeSlash, FaRegUser } from 'react-icons/fa'
import { RiLock2Line } from 'react-icons/ri'
import { useDispatch } from 'react-redux'
import { loginSuccess } from '../redux/slices/authSlice'
import { useRouter } from "next/navigation";

export default function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false)
    const dispatch = useDispatch();
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await fetch("https://dummyjson.com/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password,
            }),
        });

        const data = await response.json();
        if (response.ok) {
            const { id, accessToken, refreshToken } = data;
            Cookies.set("accessToken", accessToken, { expires: 7 });
            Cookies.set("refreshToken", refreshToken, { expires: 7 });

            dispatch(
                loginSuccess({
                    ...data,
                })
            );
            router.push("/profile");

        } else {
            alert(data.message || "Login Failed");
        }
    };



    return (
        <main className="min-h-screen bg-white text-zinc-950">
            <div className="grid min-h-screen lg:grid-cols-2">
                {/* Left Section */}
                <div className="relative hidden overflow-hidden lg:block">
                    <Image
                        src="/assets/girl.png"
                        alt="Fashion Model"
                        width={800}
                        height={800}
                        priority
                        className="h-full w-full object-center"
                    />

                    <Link href="/" className="absolute left-10 top-10 text-white">
                        <span className="block font-serif text-[2.2rem] leading-none">
                            V E L O U R A
                        </span>

                        <span className="mt-3 block text-sm font-semibold tracking-[0.42em]">
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
                </div>
                {/* Right Section */}
                <section className="flex items-center justify-center px-5 py-10 sm:px-10 lg:px-14">
                    <div className="w-full max-w-xl lg:pt-7">
                        <div className="mb-10">
                            <h1 className="text-3xl font-bold sm:text-4xl">
                                Welcome Back
                            </h1>
                            <p className="mt-2 text-lg text-zinc-600">
                                Login to your Veloura account
                            </p>
                        </div>
                        <form className="space-y-7" onSubmit={handleLogin}>
                            {/* Username */}
                            <div>
                                <label className="mb-2 block text-sm font-medium">
                                    Username
                                </label>
                                <div className="relative">
                                    <FaRegUser className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-zinc-800" />
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        placeholder="Enter your username"
                                        className="h-14 w-full rounded-lg border border-zinc-300 py-3 pl-12 pr-4 text-sm  transition placeholder:text-zinc-500 focus:border-zinc-900 focus:ring-2"
                                        required
                                    />
                                </div>
                            </div>
                            {/* Password */}
                            <div>
                                <label className="mb-2 block text-sm font-medium">
                                    Password
                                </label>
                                <div className="relative">
                                    <RiLock2Line className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-zinc-800" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter your password"
                                        className="h-14 w-full rounded-lg border border-zinc-300 py-3 pl-12 pr-4 text-sm  transition placeholder:text-zinc-500 focus:border-zinc-900 focus:ring-2 "
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-900">
                                        {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                                    </button>
                                </div>
                            </div>

                            {/* Login Button */}
                            <button type="submit" className="h-14 w-full rounded-lg bg-zinc-950 font-semibold text-white transition hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:ring-offset-2">
                                Login
                            </button>
                        </form>
                    </div>
                </section>
            </div>
        </main>
    )
}