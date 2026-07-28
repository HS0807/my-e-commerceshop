"use client";
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { LuHeart } from "react-icons/lu";
import { BsHandbag } from "react-icons/bs";
import { removefromwishlist } from '../redux/slices/wishlistSlice';
import { addToCart } from "../redux/slices/cartSlice";


export default function Wishlist() {

  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.items);
  return (
    <div className='w-full max-w-7xl mx-auto my-12 px-4'>
      <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-6'>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center">
            <LuHeart className="text-white text-3xl" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">My Wishlist</h1>
            <p className="text-sm md:text-base text-gray-500 mt-1">
              All the items you love, in one place.
            </p>
          </div>
        </div>
        <Link href="/cart" className='flex items-center gap-2 bg-black text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition'>
          <BsHandbag />Move All to Cart
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
        {wishlist.length > 0 ? (
          wishlist.map((product) => (
            <div key={product.id} className="border rounded-lg p-4">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-52 object-cover rounded"
              />

              <h2 className="mt-3 font-semibold">
                {product.title}
              </h2>

              <p className="text-[#803f14] font-bold mt-2">
                ${product.price}
              </p>

              <div className="mt-4 flex flex-col gap-2">
                <button
                  onClick={() => dispatch(addToCart(product))}
                  className="w-full bg-black text-white py-2 rounded-lg"
                >
                  Add to Cart
                </button>

                <button
                  onClick={() => dispatch(removefromwishlist(product.id))}
                  className="w-full bg-red-500 text-white py-2 rounded-lg"
                >
                  Remove from Wishlist
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <h2 className="text-2xl font-semibold">Your wishlist is empty ❤️</h2>
            <p className="text-gray-500 mt-2">
              Add products to your wishlist.
            </p>

            <Link
              href="/products"
              className="inline-block mt-6 bg-black text-white px-6 py-3 rounded-lg"
            >
              Continue Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}



