"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaCreditCard, FaShoppingBag } from "react-icons/fa";

export default function Billing() {

    const auth = useSelector((state) => state.auth.currentUser);

    const [cartItems, setCartItems] = useState([]);
    const [cartId, setCartId] = useState(null);
    const [loading, setLoading] = useState(true);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");

    useEffect(() => {

        const fetchBillingData = async () => {

            try {

                setLoading(true);

                // Get cart of logged-in user
                const cartResponse = await fetch(
                    `https://dummyjson.com/carts/user/${auth.id}`
                );

                const cartData = await cartResponse.json();

                console.log("Billing Cart API:", cartData);

                if (cartData.carts.length > 0) {

                    setCartId(cartData.carts[0].id);

                    setCartItems(cartData.carts[0].products);

                } else {

                    setCartItems([]);

                }


                // Get user details
                const userResponse = await fetch(
                    `https://dummyjson.com/users/${auth.id}`
                );

                const userData = await userResponse.json();

                console.log("Billing User API:", userData);

                setName(
                    `${userData.firstName} ${userData.lastName}`
                );

                setEmail(userData.email);
                setPhone(userData.phone);

                setAddress(userData.address.address);
                setCity(userData.address.city);
                setCountry(userData.address.country);

            } catch (error) {

                console.log("Billing API Error:", error);

            } finally {

                setLoading(false);

            }

        };


        if (auth) {

            fetchBillingData();

        }

    }, [auth]);


    // Calculate subtotal
    const subtotal = cartItems.reduce(
        (total, item) =>
            total + item.price * item.quantity,
        0
    );


    const shipping = subtotal > 0 ? 10 : 0;

    const total = subtotal + shipping;


    const handlePlaceOrder = () => {

        if (!name || !email || !phone || !address || !city || !country) {

            alert("Please fill all billing details");

            return;

        }

        if (cartItems.length === 0) {

            alert("Your cart is empty");

            return;

        }

        console.log("Order Details:", {

            cartId,

            name,

            email,

            phone,

            address,

            city,

            country,

            products: cartItems,

            subtotal,

            shipping,

            total,

        });

        alert("Order placed successfully!");

    };


    if (!auth) {

        return (

            <div className="min-h-screen flex items-center justify-center">

                <div className="text-center">

                    <h1 className="text-3xl font-bold">
                        Please Login First
                    </h1>

                    <Link
                        href="/loginpage"
                        className="inline-block mt-6 bg-black text-white px-6 py-3 rounded-lg"
                    >
                        Login
                    </Link>

                </div>

            </div>

        );

    }


    if (loading) {

        return (

            <div className="min-h-screen flex items-center justify-center">

                <h1 className="text-2xl font-bold">
                    Loading Billing...
                </h1>

            </div>

        );

    }


    return (

        <div className="min-h-screen bg-gray-100 py-10 px-5">

            <div className="max-w-7xl mx-auto">
                {/* Heading */}

                <div className="mb-10">

                    <h1 className="text-4xl font-bold">
                        Billing
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Complete your billing details and place your order
                    </p>

                </div>


                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">


                    {/* LEFT SIDE */}

                    <div className="lg:col-span-2 space-y-8">


                        {/* BILLING DETAILS */}

                        <div className="bg-white rounded-xl shadow-md p-6">

                            <div className="flex items-center gap-3 mb-6">

                                <FaCreditCard className="text-2xl" />

                                <h2 className="text-2xl font-semibold">
                                    Billing Details
                                </h2>

                            </div>


                            {/* Name */}

                            <div className="mb-5">

                                <p className="font-medium mb-2">
                                    Full Name
                                </p>

                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) =>
                                        setName(e.target.value)
                                    }
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-black"
                                    placeholder="Enter your name"
                                />

                            </div>


                            {/* Email */}

                            <div className="mb-5">

                                <p className="font-medium mb-2">
                                    Email
                                </p>

                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(e.target.value)
                                    }
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-black"
                                    placeholder="Enter your email"
                                />

                            </div>


                            {/* Phone */}

                            <div className="mb-5">

                                <p className="font-medium mb-2">
                                    Phone
                                </p>

                                <input
                                    type="text"
                                    value={phone}
                                    onChange={(e) =>
                                        setPhone(e.target.value)
                                    }
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-black"
                                    placeholder="Enter your phone"
                                />

                            </div>


                            {/* Address */}

                            <div className="mb-5">

                                <p className="font-medium mb-2">
                                    Address
                                </p>

                                <input
                                    type="text"
                                    value={address}
                                    onChange={(e) =>
                                        setAddress(e.target.value)
                                    }
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-black"
                                    placeholder="Enter your address"
                                />

                            </div>


                            {/* City + Country */}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                                <div>

                                    <p className="font-medium mb-2">
                                        City
                                    </p>

                                    <input
                                        type="text"
                                        value={city}
                                        onChange={(e) =>
                                            setCity(e.target.value)
                                        }
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-black"
                                        placeholder="Enter city"
                                    />

                                </div>


                                <div>

                                    <p className="font-medium mb-2">
                                        Country
                                    </p>

                                    <input
                                        type="text"
                                        value={country}
                                        onChange={(e) =>
                                            setCountry(e.target.value)
                                        }
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-black"
                                        placeholder="Enter country"
                                    />

                                </div>

                            </div>

                        </div>


                        {/* CART ITEMS */}

                        <div className="bg-white rounded-xl shadow-md p-6">

                            <div className="flex items-center gap-3 mb-6">

                                <FaShoppingBag className="text-2xl" />

                                <h2 className="text-2xl font-semibold">
                                    Your Items
                                </h2>

                            </div>


                            {cartItems.length === 0 ? (

                                <div className="text-center py-10">

                                    <p className="text-gray-500">
                                        Your cart is empty
                                    </p>

                                    <Link
                                        href="/products"
                                        className="inline-block mt-5 bg-black text-white px-6 py-3 rounded-lg"
                                    >
                                        Continue Shopping
                                    </Link>

                                </div>

                            ) : (

                                <div className="space-y-5">

                                    {cartItems.map((item) => (

                                        <div
                                            key={item.id}
                                            className="flex items-center justify-between border-b pb-5">
                                            <div className="flex items-center gap-4">
                                                <img
                                                    src={item.thumbnail}
                                                    alt={item.title}
                                                    className="w-20 h-20 object-contain rounded-lg bg-gray-100"
                                                />

                                                <div>
                                                    <p className="font-semibold">{item.title}</p>
                                                    <p className="text-gray-500 mt-1">Quantity: {item.quantity}</p>
                                                </div>
                                            </div>
                                            <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* RIGHT SIDE */}
                    <div>
                        <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
                            <h2 className="text-2xl font-semibold mb-6">
                                Order Summary
                            </h2>

                            <div className="flex justify-between mb-4">
                                <span className="text-gray-600">Items</span>
                                <span>{cartItems.length}</span>
                            </div>

                            <div className="flex justify-between mb-4">
                                <span className="text-gray-600">Subtotal</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>

                            <div className="flex justify-between mb-4">
                                <span className="text-gray-600">Shipping</span>
                                <span>${shipping.toFixed(2)}</span>
                            </div>

                            <div className="border-t pt-4 flex justify-between">
                                <span className="text-xl font-bold">Total</span>
                                <span className="text-xl font-bold text-[#803f14]">${total.toFixed(2)}</span>
                            </div>
                            <button onClick={handlePlaceOrder} className="w-full mt-6 bg-black text-white py-3 rounded-lg hover:bg-gray-800">
                                Place Order
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}