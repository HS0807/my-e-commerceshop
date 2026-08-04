"use client";

import { useEffect } from "react";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/app/redux/slices/authSlice";


export default function AuthCheck() {

    const dispatch = useDispatch();
    useEffect(() => {
        const checkUser = async () => {
            const token = Cookies.get("accessToken");
            if (!token) {
                return;
            }
            try {
                const response = await fetch("https://dummyjson.com/auth/me",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                if (response.ok) {
                    const user = await response.json();
                    dispatch(
                        loginSuccess({
                            ...user,
                            accessToken: token,
                        })
                    );
                }
            } catch (error) {
                console.log("Auth check failed", error);
            }
        };
        checkUser();
    }, [dispatch]);
  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center bg-white">
                <p className="text-xl font-semibold">
                    Loading...
                </p>
            </div>
    </div>
  )
}
