"use client";

import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { BsHandbag, BsTrash, BsPlus, BsDash } from "react-icons/bs";
import { removeFromCart, updateQuantity, } from "../redux/slices/cartSlice";

export default function Cart() {

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="w-full max-w-7xl mx-auto my-12 px-4">
      {/* Heading */}
      <div className="flex items-center gap-4 mb-10">
        <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center">
          <BsHandbag className="text-white text-3xl" />
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl font-bold">
            Your Cart
          </h1>
          <p className="text-gray-500">
            Review your items and proceed to checkout
          </p>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left */}
        <div className="w-full lg:w-2/3">
          {cartItems.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <p className="text-gray-600 text-lg">
                Your cart is empty
              </p>
              <Link href="/products" className="inline-block mt-5 bg-black text-white px-6 py-3 rounded-lg">
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow-md p-5 flex flex-col sm:flex-row gap-5">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-40 h-40 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold">
                      {item.title}
                    </h2>
                    <p className="text-[#803f14] font-bold text-xl mt-2">
                      ${item.price}
                    </p>
                    <div className="flex items-center gap-3 mt-5">
                      <button onClick={() => dispatch(updateQuantity({
                        id: item.id, quantity: item.quantity - 1,
                      }))
                      }
                        className="border p-2 rounded" > <BsDash />
                      </button>
                      <span className="font-semibold">
                        {item.quantity}
                      </span>
                      <button onClick={() => dispatch( updateQuantity({
                              id: item.id,
                              quantity: item.quantity + 1,
                            })
                          )
                        }
                        className="border p-2 rounded">
                        <BsPlus />
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      dispatch(removeFromCart(item.id))
                    }
                    className="text-red-500 text-2xl self-start">
                    <BsTrash />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right */}
        <div className="w-full lg:w-1/3">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <h3 className="text-xl font-semibold mb-5">
              Order Summary
            </h3>
            <div className="flex justify-between mb-3">
              <span>Items</span>
              <span>{cartItems.length}</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t pt-4">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button className="w-full mt-6 bg-black text-white py-3 rounded-lg hover:bg-gray-800">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}