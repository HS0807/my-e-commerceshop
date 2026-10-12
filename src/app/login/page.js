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
      const response = await fetch(
        "https://dummyjson.com/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      const { accessToken, refreshToken } = data;

      Cookies.set("accessToken", accessToken, { expires: 7 });
      Cookies.set("refreshToken", refreshToken, { expires: 7 });

      dispatch(loginSuccess(data));
      router.push("/profile");
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white text-zinc-950">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Left Section */}
        <div className="relative hidden min-h-screen overflow-hidden lg:block">
          <Image
            src="/assets/girl.png"
            alt="Fashion Model"
            fill
            priority
            sizes="50vw"
            className="object-cover object-center"
          />

          <Link
            href="/"
            className="absolute left-6 top-8 text-white xl:left-10 xl:top-10"
          >
            <span className="block font-serif text-3xl leading-none xl:text-[2.2rem]">
              V E L O U R A
            </span>

            <span className="mt-3 block text-xs font-semibold tracking-[0.3em] xl:text-sm xl:tracking-[0.42em]">
              STYLE THAT DEFINES YOU
            </span>
          </Link>

          <div className="absolute inset-x-6 bottom-10 text-white xl:inset-x-10 xl:bottom-14">
            <h2 className="text-2xl font-bold tracking-tight xl:text-3xl">
              Welcome Back
            </h2>

            <p className="mt-3 max-w-sm text-base leading-7 text-white/95 xl:text-lg">
              Login to continue exploring premium fashion, exclusive
              collections and your personalized shopping experience.
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

            <div className="mb-8 sm:mb-10">
              <h1 className="text-3xl font-bold sm:text-4xl">
                Welcome Back
              </h1>

              <p className="mt-2 text-base text-zinc-600 sm:text-lg">
                Login to your Veloura account
              </p>
            </div>

            <form className="space-y-6 sm:space-y-7" onSubmit={handleLogin}>
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
                    onChange={(e) => setUsername(e.target.value)}
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
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="h-12 w-full rounded-lg border border-zinc-300 py-3 pl-12 pr-12 text-sm transition placeholder:text-zinc-500 focus:border-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900 sm:h-14"
                    required
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-900"
                  >
                    {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <p className="text-sm text-red-600" role="alert">
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
