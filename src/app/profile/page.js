"use client";

import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FiMail, FiPhone, FiCalendar, FiEdit2, FiMapPin, FiHeart, FiShoppingBag, FiLogOut, } from "react-icons/fi";
import { IoHomeOutline } from "react-icons/io5";
import { MdKeyboardArrowRight } from "react-icons/md";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = Cookies.get("accessToken");
      if (!token) {
        router.replace("/login");
        return;
      }
      try {
        const res = await fetch("https://dummyjson.com/auth/me",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        if (!res.ok) {
          Cookies.remove("accessToken");
          router.replace("/login");
          return;
        }

        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProfile();
  }, [router]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-12 w-12 rounded-full border-4 border-[#C78A2B] border-t-transparent"></div>
      </div>
    );
  }
  return (
    <section className="bg-[#fafafa] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-sm p-8 flex flex-col lg:flex-row lg:justify-between lg:items-center">
          {/* Left Side */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
            {/* Profile Image */}
            <div className="relative w-44 h-44 rounded-full overflow-hidden border-4 border-[#C78A2B] shadow-lg">
              <Image
                src={user.gender === "male" ? "/assets/male.png" : "/assets/female.png"}
                alt={user.firstName}
                fill
                className="object-cover"
              />
            </div>

            {/* Details */}
            <div>
              <p className="text-gray-500 text-lg">Welcome back 👋</p>
              <h1 className="text-5xl font-bold text-gray-900 mb-6">{user.firstName} {user.lastName}</h1>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-700">
                  <FiMail className="text-[#C78A2B]" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <FiPhone className="text-[#C78A2B]" />
                  <span>{user.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <FiCalendar className="text-[#C78A2B]" />
                  <span>Member since May 2024</span>
                </div>
              </div>
            </div>
          </div>

          {/* Edit Button */}
          <button className="mt-8 lg:mt-0 flex items-center gap-2 border border-[#C78A2B] text-[#C78A2B] px-8 py-3 rounded-xl hover:bg-[#C78A2B] hover:text-white transition-all duration-300">
            <FiEdit2 className="text-lg" />
            <span>Edit Profile</span>
          </button>
        </div>
        {/* Account Information */}

        <div className="bg-white rounded-2xl shadow-sm p-8 mt-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">Account Information</h2>
          <div className="divide-y divide-gray-200">
            {/* Full Name */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-0 py-5">
              <p className="font-medium text-gray-900">Full Name</p>
              <p className="text-gray-700">{user.firstName} {user.lastName}</p>
            </div>

            {/* Email */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-0 py-5">
              <p className="font-medium text-gray-900">Email Address</p>
              <p className="text-gray-700">{user.email}</p>
            </div>

            {/* Phone */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-0 py-5">
              <p className="font-medium text-gray-900">Phone Number</p>
              <p className="text-gray-700">{user.phone}</p>
            </div>

            {/* Gender */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-0 py-5">
              <p className="font-medium text-gray-900">Gender</p>
              <p className="text-gray-700 capitalize">{user.gender}</p>
            </div>

            {/* Date of Birth */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-0 py-5">
              <p className="font-medium text-gray-900">Date of Birth</p>
              <p className="text-gray-700">{user.birthDate}</p>
            </div>
          </div>
        </div>

        {/* Saved Address */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mt-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">Saved Addresses</h2>
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            {/* Left */}
            <div className="flex gap-5">
              {/* Location Icon */}
              <div className="w-14 h-14 rounded-full bg-[#FAF6EF] flex items-center justify-center">
                <FiMapPin className="text-2xl text-[#C78A2B]" />
              </div>

              {/* Address */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="font-semibold text-lg">Home</h3>
                  <span className="text-xs bg-[#FAF2E3] text-[#C78A2B] px-2 py-1 rounded"> Default</span>
                </div>
                <p className="text-gray-600 leading-7">
                  {user.address?.address}
                  <br />
                  {user.address?.city}, {user.address?.state}
                  <br />
                  {user.address?.postalCode}
                </p>
                <p className="mt-3 text-gray-700">{user.phone}</p>
              </div>
            </div>
          </div >
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-5">

          {/* Orders */}
          <div className="flex items-center gap-4 p-6 cursor-pointer bg-white border border-gray-200 rounded-2xl hover:bg-[#FAF7F2] hover:shadow-md transition-all duration-300">
            <div className="w-14 h-14 rounded-xl bg-[#FAF2E3] flex items-center justify-center">
              <FiShoppingBag className="text-3xl text-[#C78A2B]" />
            </div>
            <div>
              <h4 className="font-semibold text-lg">My Orders</h4>
              <p className="text-sm text-gray-500">View and track orders</p>
            </div>
          </div>

          {/* Wishlist */}
          <div className="flex items-center gap-4 p-6 cursor-pointer bg-white border border-gray-200 rounded-2xl hover:bg-[#FAF7F2] hover:shadow-md transition-all duration-300">
            <div className="w-14 h-14 rounded-xl bg-[#FAF2E3] flex items-center justify-center">
              <FiHeart className="text-3xl text-[#C78A2B]" />
            </div>
            <div>
              <h4 className="font-semibold text-lg">Wishlist</h4>
              <p className="text-sm text-gray-500">View saved items</p>
            </div>
          </div>

          {/* Logout */}
          <div
            onClick={() => {
              Cookies.remove("accessToken");
              Cookies.remove("refreshToken");
              router.push("/login");
            }}
            className="flex items-center gap-4 p-6 cursor-pointer bg-white border border-gray-200 rounded-2xl hover:bg-[#FAF7F2] hover:shadow-md transition-all duration-300">
            <div className="w-14 h-14 rounded-xl bg-[#FAF2E3] flex items-center justify-center">
              <FiLogOut className="text-3xl text-[#C78A2B]" />
            </div>
            <div>
              <h4 className="font-semibold text-lg">Logout</h4>
              <p className="text-sm text-gray-500">Sign out from your account</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


