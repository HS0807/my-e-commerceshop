"use client";

import { logout } from "../redux/slices/authSlice";
import {FaUsers,FaBoxOpen,FaShoppingCart,FaThLarge,FaHome,FaSignOutAlt,} from "react-icons/fa";

import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {

  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };


    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <div className="w-72 bg-black text-white p-6 flex flex-col">
                <div className="text-3xl font-bold mb-10">
                    Admin Panel
                </div>
                <div className="space-y-3">
                    <div className="flex items-center gap-4 bg-white text-black p-4 rounded-lg cursor-pointer">
                        <FaHome />
                        <p>Dashboard</p>
                    </div>
                    <div className="flex items-center gap-4 hover:bg-gray-800 p-4 rounded-lg cursor-pointer">
                        <FaUsers />
                        <p>Users</p>
                    </div>
                    <div className="flex items-center gap-4 hover:bg-gray-800 p-4 rounded-lg cursor-pointer">
                        <FaBoxOpen />
                        <p>Products</p>
                    </div>
                    <div className="flex items-center gap-4 hover:bg-gray-800 p-4 rounded-lg cursor-pointer">
                        <FaShoppingCart />
                        <p>Carts</p>
                    </div>
                    <div className="flex items-center gap-4 hover:bg-gray-800 p-4 rounded-lg cursor-pointer">
                        <FaThLarge />
                        <p>Categories</p>
                    </div>
                </div>
                <div className="mt-auto">
                    <button onClick={handleLogout} className="w-full bg-red-500 hover:bg-red-600 py-3 rounded-lg flex justify-center items-center gap-3">
                        <FaSignOutAlt />
                        Logout
                    </button>
                </div>
            </div>
            {/* Main */}
            <div className="flex-1 p-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-4xl font-bold">
                            Dashboard
                        </h1>
                        <p className="text-gray-500 mt-2">
                            Welcome back Admin
                        </p>
                    </div>
                </div>
                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <FaUsers className="text-4xl text-blue-500 mb-4" />
                        <p className="text-gray-500">Total Users</p>
                        <h2 className="text-3xl font-bold mt-2"></h2>
                    </div>
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <FaBoxOpen className="text-4xl text-green-500 mb-4" />
                        <p className="text-gray-500">Products</p>
                        <h2 className="text-3xl font-bold mt-2"></h2>
                    </div>
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <FaShoppingCart className="text-4xl text-orange-500 mb-4" />
                        <p className="text-gray-500">Carts</p>
                        <h2 className="text-3xl font-bold mt-2"></h2>
                    </div>
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <FaThLarge className="text-4xl text-purple-500 mb-4" />
                        <p className="text-gray-500">Categories</p>
                        <h2 className="text-3xl font-bold mt-2"></h2>
                    </div>
                </div>
                {/* Tables */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-10">
                    {/* Users */}
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <h2 className="text-2xl font-semibold mb-6">
                            Recent Users
                        </h2>
                    </div>
                    {/* Products */}
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <h2 className="text-2xl font-semibold mb-6">
                            Latest Products
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    );
}