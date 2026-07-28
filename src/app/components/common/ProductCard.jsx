"use client";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { addTowishlist, removefromwishlist } from "@/app/redux/slices/wishlistSlice";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { addToCart } from "@/app/redux/slices/cartSlice";

export default function ProductCard({ product }) {

  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const isWishlisted = wishlistItems.some(
    (item) => item.id === product.id
  );
  const handleWishlist = () => {
    if (isWishlisted) {
      dispatch(removefromwishlist(product.id));
    } else {
      dispatch(addTowishlist(product));
    }
  };

 const handleAddToCart = () => {
  console.log(product);
  dispatch(addToCart(product));
};

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300">
      <div className="relative h-60 bg-gray-100">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-64 object-cover hover:scale-105 transition duration-300" />
        <button onClick={handleWishlist} className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md hover:scale-110 transition" >
          {isWishlisted ? (<FaHeart className="text-red-500 text-xl" />
          ) : (<FaRegHeart className="text-gray-600 text-xl" />)} </button>
      </div>
      <div className="p-4">
        <p className="text-sm text-gray-500">{product.brand}</p>
        <h2 className="text-lg font-semibold mt-1 line-clamp-2">
          {product.title}
        </h2>
        <div className="flex items-center justify-between mt-3">
          <p className="text-xl font-bold text-[#803f14]">
            ${product.price}
          </p>
          <span className="text-yellow-500">
            ⭐ {product.rating}
          </span>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <Link href={`/products/${product.id}`}>
            <button className="w-full bg-[#803f14] text-white py-2 rounded-lg hover:bg-[#6c3210] transition">
              View Product
            </button>
          </Link>

          <button onClick={handleAddToCart}  className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}