import React from "react";
import ProductCard from "../components/common/ProductCard";
import { FaSearch } from 'react-icons/fa'


export default async function Products() {
    const response = await fetch("https://dummyjson.com/products?limit=100");
    const data = await response.json();

    return (

        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
            <div className="flex flex-col lg:flex-row gap-8">

                {/* <nav>
                    <div className="relative hidden sm:block">
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="w-48 xl:w-64 pl-3 pr-10 py-2 border border-gray-200 rounded-full text-sm "
                        />
                        <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    </div>
                </nav> */}

                {/* Sidebar */}
                <div className="hidden lg:block w-72 shrink-0  top-24 h-fit bg-white border rounded-xl p-6 shadow-sm">

                    <div className="flex items-center justify-between mb-6">
                        <h2 className="font-semibold text-xl">
                            Filter Options
                        </h2>

                        <button className="text-sm text-gray-500 hover:text-black">
                            Clear All
                        </button>
                    </div>

                    {/* Category */}
                    <div className="border-t pt-5">
                        <h3 className="font-semibold mb-4">Category</h3>
                        <div className="space-y-3">
                            {["Men", "Women", "Accessories", "Perfumes", "Shoes", "Watches",].map((cat) => (
                                <label key={cat} className="flex items-center justify-between cursor-pointer">
                                    <div className="flex items-center gap-3">
                                        <input type="checkbox" />
                                        <span>{cat}</span>
                                    </div>
                                    <span className="text-gray-500 text-sm">(20)</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Price */}
                    <div className="border-t mt-6 pt-5">
                        <h3 className="font-semibold mb-4">
                            Price Range
                        </h3>

                        <div className="space-y-3">
                            {[
                                "$0 - $100",
                                "$100 - $300",
                                "$300 - $500",
                                "$500 - $1000",
                            ].map((price) => (
                                <label key={price} className="flex items-center gap-3">
                                    <input type="checkbox" />{price}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Availability */}
                    <div className="border-t mt-6 pt-5">
                        <h3 className="font-semibold mb-4">
                            Availability
                        </h3>
                        <div className="space-y-3">
                            {["In Stock", "Out of Stock"].map((item) => (
                                <label key={item} className="flex items-center gap-3" >
                                    <input type="checkbox" /> {item}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Discount */}
                    <div className="border-t mt-6 pt-5">
                        <h3 className="font-semibold mb-4">
                            Discount
                        </h3>
                        <div className="space-y-3">
                            {["10%", "20%", "50%", "60%", "80%"].map((item) => (
                                <label key={item} className="flex items-center gap-3">
                                    <input type="checkbox" />
                                    {item} Discount
                                </label>
                            ))}
                        </div>
                    </div>
                    {/* Buttons */}
                    <button className="w-full mt-8 bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-900 transition">
                        Apply Filters
                    </button>
                    <button className="w-full mt-3 border py-3 rounded-lg font-medium hover:bg-gray-100 transition">
                        Clear All Filters
                    </button>
                </div>

                {/* Right Section */}
                <div className="flex-1">
                    {/* Heading */}
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">
                        <div>
                            <h1 className="text-4xl font-bold">
                                All Products
                            </h1>
                            <p className="text-gray-500 mt-2">
                                Discover our exclusive collection
                            </p>
                            <p className="text-gray-500 mt-6">
                                Showing {data.products.length} of {data.total} products
                            </p>
                        </div>

                        {/* Desktop Controls */}
                        <div className="hidden lg:flex items-center gap-5">

                            <span className="text-gray-600">
                                Sort By:
                            </span>

                            <select className="border rounded-lg px-5 py-2">
                                <option>Popularity</option>
                                <option>Newest</option>
                                <option>Price: Low to High</option>
                                <option>Price: High to Low</option>
                                <option>Name A-Z</option>
                            </select>
                        </div>
                    </div>

                    Mobile Controls
                    <div className="lg:hidden sticky top-0 bg-white z-20 shadow-sm border rounded-lg p-3 mb-6">
                        <div className="flex gap-3">
                            <button className="flex-1 bg-black text-white rounded-lg py-2">
                                Filters
                            </button>
                            <select className="flex-1 border rounded-lg px-3">
                                <option>Popularity</option>
                                <option>Newest</option>
                                <option>Price </option>
                                <option>Price </option>
                            </select>
                        </div>
                    </div>

                    {/* Product Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                        {data.products.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}