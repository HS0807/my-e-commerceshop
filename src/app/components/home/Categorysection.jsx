"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const ITEMS_PER_PAGE = 9;

export default function CategorySection() {
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch("https://dummyjson.com/products/category-list");
      const data = await res.json();
      setCategories(data);
    };

    fetchCategories();
  }, []);

  const totalPages = Math.ceil(categories.length / ITEMS_PER_PAGE);

  const currentCategories = categories.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <section className="py-10">
      <h1 className="text-4xl font-bold text-center mb-10">Shop By Category</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentCategories.map((category) => (
          <div
            key={category}
            className="rounded-2xl shadow-md hover:shadow-xl transition p-8 text-center">
            <h2 className="text-xl font-semibold capitalize mb-4">
              {category.replace(/-/g, " ")}
            </h2>

            <Link href={`/products?category=${category}`}
              className="text-[#803f14] hover:underline">Shop Now →</Link>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-10">
        <button
          onClick={() => setPage((prev) => prev - 1)}
          disabled={page === 1}
          className="px-5 py-2 bg-gray-200 rounded disabled:opacity-50">
          Previous
        </button>

        <span className="font-medium">
          {page} / {totalPages}
        </span>

        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page === totalPages}
          className="px-5 py-2 bg-[#803f14] text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </section>
  );
}