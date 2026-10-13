"use client";

import Cookies from "js-cookie";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
    FaRegEye,
    FaRegEyeSlash,
    FaRegUser,
} from "react-icons/fa";
import { RiLock2Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/slices/authSlice";
import { useRouter } from "next/navigation";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const dispatch = useDispatch();
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            // Admin Login
            if (
                username.trim() === "hitesh" &&
                password === "hitesh0807"
            ) {
                Cookies.set("isAdmin", "true", { expires: 7 });

                router.push("/admin");
                return;
            }

            // Regular User Login
            const response = await fetch(
                "https://dummyjson.com/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username: username.trim(),
                        password,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Invalid username or password"
                );
            }

            const { accessToken, refreshToken } = data;

            Cookies.set("accessToken", accessToken, {
                expires: 7,
                sameSite: "Lax",
            });

            Cookies.set("refreshToken", refreshToken, {
                expires: 7,
                sameSite: "Lax",
            });

            // Remove admin status when a regular user logs in
            Cookies.remove("isAdmin");

            dispatch(loginSuccess(data));

            router.push("/profile");
        } catch (err) {
            setError(
                err.message ||
                    "Something went wrong. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-white text-zinc-950">
            <div className="grid min-h-screen lg:grid-cols-2">

                {/* Left Section */}
                <div className="relative h-64 overflow-hidden sm:h-80 lg:h-screen">
                    <Image
                        src="/assets/girl.png"
                        alt="Fashion Model"
                        fill
                        priority
                        sizes="(max-width: 1023px) 100vw, 50vw"
                        className="object-cover object-center"
                    />

                    <Link
                        href="/"
                        className="absolute left-5 top-6 text-white sm:left-8 sm:top-8 lg:left-10 lg:top-10"
                    >
                        <span className="block font-serif text-2xl leading-none sm:text-3xl xl:text-[2.2rem]">
                            V E L O U R A
                        </span>

                        <span className="mt-2 block text-[10px] font-semibold tracking-[0.25em] sm:text-xs lg:mt-3 lg:text-sm lg:tracking-[0.42em]">
                            STYLE THAT DEFINES YOU
                        </span>
                    </Link>

                    <div className="absolute inset-x-5 bottom-5 text-white sm:inset-x-8 sm:bottom-8 lg:inset-x-10 lg:bottom-14">
                        <h2 className="text-xl font-bold tracking-tight sm:text-2xl xl:text-3xl">
                            Welcome Back
                        </h2>

                        <p className="mt-2 max-w-sm text-sm leading-6 text-white/95 sm:text-base sm:leading-7 xl:text-lg">
                            Login to continue exploring premium fashion,
                            exclusive collections and your personalized
                            shopping experience.
                        </p>
                    </div>
                </div>

                {/* Right Section */}
                <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8 md:px-12 lg:px-8 xl:px-14">
                    <div className="w-full max-w-md">

                        {/* Mobile Logo */}
                        <Link href="/" className="mb-10 block lg:hidden">
                            <span className="block font-serif text-2xl sm:text-3xl">
                                V E L O U R A
                            </span>

                            <span className="mt-2 block text-xs font-semibold tracking-[0.25em] text-zinc-600">
                                STYLE THAT DEFINES YOU
                            </span>
                        </Link>

                        {/* Heading */}
                        <div className="mb-8 sm:mb-10">
                            <h1 className="text-3xl font-bold sm:text-4xl">
                                Welcome Back
                            </h1>

                            <p className="mt-2 text-base text-zinc-600 sm:text-lg">
                                Login to your Veloura account
                            </p>
                        </div>

                        {/* Login Form */}
                        <form
                            className="space-y-6 sm:space-y-7"
                            onSubmit={handleLogin}
                        >
                            {/* Username */}
                            <div>
                                <label
                                    htmlFor="username"
                                    className="mb-2 block text-sm font-medium"
                                >
                                    Username
                                </label>

                                <div className="relative">
                                    <FaRegUser className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-zinc-800" />

                                    <input
                                        id="username"
                                        type="text"
                                        autoComplete="username"
                                        value={username}
                                        onChange={(e) =>
                                            setUsername(e.target.value)
                                        }
                                        placeholder="Enter your username"
                                        className="h-12 w-full rounded-lg border border-zinc-300 py-3 pl-12 pr-4 text-sm transition placeholder:text-zinc-500 focus:border-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900 sm:h-14"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <label
                                    htmlFor="password"
                                    className="mb-2 block text-sm font-medium"
                                >
                                    Password
                                </label>

                                <div className="relative">
                                    <RiLock2Line className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-zinc-800" />

                                    <input
                                        id="password"
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        autoComplete="current-password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        placeholder="Enter your password"
                                        className="h-12 w-full rounded-lg border border-zinc-300 py-3 pl-12 pr-12 text-sm transition placeholder:text-zinc-500 focus:border-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900 sm:h-14"
                                        required
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword((prev) => !prev)
                                        }
                                        aria-label={
                                            showPassword
                                                ? "Hide password"
                                                : "Show password"
                                        }
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-900"
                                    >
                                        {showPassword ? (
                                            <FaRegEyeSlash />
                                        ) : (
                                            <FaRegEye />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Error Message */}
                            {error && (
                                <p
                                    className="text-sm text-red-600"
                                    role="alert"
                                >
                                    {error}
                                </p>
                            )}

                            {/* Login Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="h-12 w-full rounded-lg bg-zinc-950 font-semibold text-white transition hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 sm:h-14"
                            >
                                {loading ? "Logging in..." : "Login"}
                            </button>
                        </form>
                    </div>
                </section>
            </div>
        </main>
    );
}