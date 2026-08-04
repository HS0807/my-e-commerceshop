"use client";

import Link from 'next/link';
import React, { useState } from 'react'
import { FaHeart, FaShoppingCart, FaUser, FaTimes, FaBars } from 'react-icons/fa'
import { useSelector } from 'react-redux';

export default function Navbar() {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // redux cart
  const cartItems = useSelector((state) => state.cart.items)
  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  //  redux wishlist
  const wishlistItems = useSelector((state) => state.wishlist.items)
  const wishlistItemCount = wishlistItems.length;


  return (
    <header>
      <nav className="relative z-50 bg-white shadow-md px-6 py-4 flex items-center justify-between">
        {/* logo */}
        <div className='flex flex-col leading-tight'>
          <Link href="/">
            <span className='text-lg md:text-2xl font-serif font-bold text-[#972020]'>
              V E L O U R A
            </span>
          </Link>
        </div>

        {/* center section nav link */}
        <div>
          <ul className='hidden md:flex gap-8 text-gray-700 font-medium'>
            <li>
              <Link href="/" className="text-[#be4444da] ">
                Home
              </Link>
            </li>
            <li>
              <Link href="/products" className="text-[#be4444da]">
                Products
              </Link>
            </li>
            <li>
              <Link href="/products" className="text-[#be4444da]">
                New Arrivals
              </Link>
            </li>

            <li>
              <Link href="/loginpage" className="">
                Login
              </Link>
            </li>
          </ul>


        </div>

        {/* wishlist, cart, profile */}
        <div className='flex item-center gap-6 text-gray-700 text-xl'>
          <div className='flex gap-6'>
            <Link href="/wishlist">
              <FaHeart className='hover:text-gray-500' />
              {wishlistItemCount > 0 && (
                <span className='absolute -top-3 -right-4 text-xs text-white bg-[#a91f64] rounded-full px-1.5 py-0.5'>{wishlistItemCount}</span>
              )}
            </Link>

            <Link href="/cart" className='relative '>
              <FaShoppingCart className='hover:text-gray-500' />
              <span className='absolute -top-3 -right-4 text-xs text-white bg-[#a91f64] rounded-full px-1.5 py-0.5'>{cartItemCount}</span>
            </Link>

            <Link href="/profile">
              <FaUser className='hover:text-gray-400' />
            </Link>
          </div>
        </div>

        {/* menu icon */}
        <div className='md:hidden flex '>
          <button onClick={toggleMenu}>
            {isMenuOpen ? (
              <FaTimes className="text-2xl hover:text-[#a91f64]" />
            ) : (
              <FaBars className="text-2xl hover:text-[#a91f64]" />
            )}
          </button>
        </div>

        {/* mobile menu */}
        {isMenuOpen && <ul className='absolute top-full left-0 w-full bg-white flex flex-col item-center gap-4 py-4 text-gray-700 font-medium md:hidden shadow-md'>
          <li>
            <Link href="/" className="text-[#be4444da] " onClick={toggleMenu}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/products" className="text-[#be4444da]" onClick={toggleMenu}>
              products
            </Link>
          </li>
          <li>
            <Link href="/men" className="text-[#be4444da]" onClick={toggleMenu}>
              New Arrivals
            </Link>
          </li>
          <li>
            <Link href="/women" className="text-[#be4444da]" onClick={toggleMenu}>
              Top Seller
            </Link>
          </li>
        </ul>

        }

      </nav>
    </header>
  )
}

