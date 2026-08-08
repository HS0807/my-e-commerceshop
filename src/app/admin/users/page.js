"use client";

import { useEffect, useState } from "react";
import { FaUsers, FaBoxOpen, FaShoppingCart, FaThLarge, FaHome, FaSignOutAlt, FaPlus, FaSearch, FaEdit, FaTrash, FaTimes, } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { logout } from "@/app/redux/slices/authSlice";
import { useRouter } from "next/navigation";
export default function AdminUsers() {

    const dispatch = useDispatch();
    const router = useRouter();
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [showAddUser, setShowAddUser] = useState(false);
    const [showEditUser, setShowEditUser] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
    });

    // GET USERS
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch("https://dummyjson.com/users?limit=100");
                const data = await response.json();
                setUsers(data.users);
            } catch (error) {
                console.log("Users API Error:", error);
            }
        };
        fetchUsers();
    }, []);

    // LOGOUT
    const handleLogout = () => {
        dispatch(logout());
        router.push("/");
    };

    // INPUT CHANGE
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // ADD USER
    const handleAddUser = async () => {
        try {
            const response = await fetch("https://dummyjson.com/users/add",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            );

            const data = await response.json();
            console.log("Added User:", data);
            setUsers((prevUsers) => [
                data,
                ...prevUsers,
            ]);

            setFormData({
                firstName: "",
                lastName: "",
                username: "",
                email: "",
            });
            setShowAddUser(false);
        } catch (error) {
            console.log("Add User Error:", error);
        }
    };

    // OPEN EDIT
    const handleEditOpen = (user) => {
        setSelectedUser(user);
        setFormData({
            firstName: user.firstName || "",
            lastName: user.lastName || "",
            username: user.username || "",
            email: user.email || "",
        });
        setShowEditUser(true);
    };

    // UPDATE USER
    const handleUpdateUser = async () => {
        try {
            const response = await fetch(`https://dummyjson.com/users/${selectedUser.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            );
            const data = await response.json();
            console.log("Updated User:", data);
            setUsers((prevUsers) =>
                prevUsers.map((user) => user.id === selectedUser.id ? {
                    ...user,
                    ...data,
                }
                    : user
                )
            );
            setShowEditUser(false);
            setSelectedUser(null);
        } catch (error) {
            console.log("Update User Error:", error);
        }
    };

    // DELETE USER
    const handleDeleteUser = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this user?"
        );
        if (!confirmDelete) {
            return;
        }
        try {
            const response = await fetch(`https://dummyjson.com/users/${id}`,
                {
                    method: "DELETE",
                }
            );
            const data = await response.json();
            console.log("Deleted User:", data);
            setUsers((prevUsers) => prevUsers.filter(
                (user) => user.id !== id
            )
            );
        } catch (error) {
            console.log("Delete User Error:", error);
        }
    };

    // SEARCH
    const filteredUsers = users.filter((user) => {
        const searchText = search.toLowerCase();
        return (
            user.firstName
                ?.toLowerCase()
                .includes(searchText) ||
            user.lastName
                ?.toLowerCase()
                .includes(searchText) ||
            user.username
                ?.toLowerCase()
                .includes(searchText) ||
            user.email
                ?.toLowerCase()
                .includes(searchText)
        );
    });

    return (
        <div className="min-h-screen bg-[#f5f5f5] flex">
            {/* ================= SIDEBAR ================= */}
            <div className="w-64 bg-[#111111] text-white p-5 flex flex-col">
                <div className="mb-10">
                    <h1 className="text-2xl font-bold">VELOURA</h1>
                    <p className="text-xs text-gray-400 mt-1">ADMIN PANEL</p>
                </div>
                <div className="space-y-2">
                    <div
                        onClick={() => router.push("/admin")}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-white hover:text-black cursor-pointer">
                        <FaHome /> <span>Dashboard</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-white text-black cursor-pointer">
                        <FaUsers /> <span>Users</span>
                    </div>
                    <div onClick={() => router.push("/admin/products")} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white hover:text-black cursor-pointer">
                        <FaBoxOpen /> <span>Products</span>
                    </div>
                    <div onClick={() => router.push("/admin/carts")} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white hover:text-black cursor-pointer">
                        <FaShoppingCart /> <span>Carts</span>
                    </div>
                    <div onClick={() => router.push("/admin/categories")} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white hover:text-black cursor-pointer">
                        <FaThLarge /> <span>Categories</span>
                    </div>
                </div>
                <div className="mt-auto">
                    <button onClick={handleLogout} className="w-full flex items-center justify-center gap-3 bg-red-500 hover:bg-red-600 p-3 rounded-lg">
                        <FaSignOutAlt /> <span>Logout</span>
                    </button>
                </div>
            </div>

            {/* ================= MAIN ================= */}
            <div className="flex-1 p-8">
                {/* TOP */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <p className="text-gray-500 text-sm">Administration</p>
                        <h1 className="text-4xl font-bold mt-1">Users</h1>
                    </div>
                    <button onClick={() => setShowAddUser(true)} className="flex items-center gap-2 bg-black text-white px-5 py-3 rounded-lg hover:bg-gray-800">
                        <FaPlus /> <span>Add User</span>
                    </button>
                </div>

                {/* SEARCH */}
                <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
                    <div className="relative">
                        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search users by name, username or email..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full border border-gray-200 rounded-lg py-3 pl-11 pr-4 outline-none focus:border-black"
                        />
                    </div>
                </div>

                {/* USER COUNT */}
                <div className="flex items-center justify-between mb-5">
                    <p className="text-gray-500">
                        Showing{" "}
                        <span className="font-semibold text-black">
                            {filteredUsers.length}
                        </span>{" "}
                        users
                    </p>
                </div>

                {/* USERS */}
                <div className="space-y-4">
                    {filteredUsers.map((user) => (
                        <div key={user.id} className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition flex items-center justify-between">
                            {/* USER INFO */}
                            <div className="flex items-center gap-5">
                                <img
                                    src={user.image}
                                    alt={user.firstName}
                                    className="w-14 h-14 rounded-full object-cover"
                                />
                                <div>
                                    <h2 className="font-semibold text-lg">{user.firstName}{" "}{user.lastName}</h2>
                                    <p className="text-sm text-gray-500"> @{user.username}</p>
                                    <p className="text-sm text-gray-400 mt-1">{user.email}</p>
                                </div>
                            </div>

                            {/* ACTIONS */}
                            <div className="flex items-center gap-3">
                                <button onClick={() => handleEditOpen(user)} className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-black hover:text-white flex items-center justify-center">
                                    <FaEdit />
                                </button>
                                <button onClick={() => handleDeleteUser(user.id)} className="w-10 h-10 rounded-lg bg-red-50 text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center">
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ================= ADD USER MODAL ================= */}
            {showAddUser && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-5 z-50">
                    <div className="bg-white rounded-2xl w-full max-w-lg p-7">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h2 className="text-2xl font-bold">Add New User</h2>
                                <p className="text-gray-500 text-sm mt-1">Create a new user account</p>
                            </div>
                            <button onClick={() => setShowAddUser(false)} className="text-gray-500 hover:text-black">
                                <FaTimes />
                            </button>
                        </div>
                        <div className="space-y-4">
                            <input
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                placeholder="First Name"
                                className="w-full border p-3 rounded-lg"
                            />
                            <input
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                placeholder="Last Name"
                                className="w-full border p-3 rounded-lg"
                            />
                            <input
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                placeholder="Username"
                                className="w-full border p-3 rounded-lg"
                            />
                            <input
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email"
                                className="w-full border p-3 rounded-lg"
                            />
                        </div>
                        <button onClick={handleAddUser} className="w-full mt-6 bg-black text-white py-3 rounded-lg hover:bg-gray-800">
                            Add User
                        </button>
                    </div>
                </div>
            )}

            {/* ================= EDIT USER MODAL ================= */}
            {showEditUser && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-5 z-50">
                    <div className="bg-white rounded-2xl w-full max-w-lg p-7">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h2 className="text-2xl font-bold">Edit User</h2>
                                <p className="text-gray-500 text-sm mt-1">Update user information</p>
                            </div>
                            <button onClick={() => setShowEditUser(false)} className="text-gray-500 hover:text-black">
                                <FaTimes />
                            </button>
                        </div>
                        <div className="space-y-4">
                            <input
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                placeholder="First Name"
                                className="w-full border p-3 rounded-lg"
                            />
                            <input
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                placeholder="Last Name"
                                className="w-full border p-3 rounded-lg"
                            />
                            <input
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                placeholder="Username"
                                className="w-full border p-3 rounded-lg"
                            />
                            <input
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email"
                                className="w-full border p-3 rounded-lg"
                            />
                        </div>
                        <button onClick={handleUpdateUser} className="w-full mt-6 bg-black text-white py-3 rounded-lg hover:bg-gray-800">
                            Update User
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}