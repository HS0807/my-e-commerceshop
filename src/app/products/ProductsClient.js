"use client";

import { useEffect, useState } from "react";
import ProductCard from "../components/common/ProductCard";
import { FaSearch } from "react-icons/fa";

const categories = [
"mens-shirts",
"mens-shoes",
"mens-watches",
"womens-dresses",
"womens-shoes",
"womens-bags",
"womens-jewellery",
"fragrances",
"beauty",
];

const priceRanges = {
"$0 - $100": (price) => price >= 0 && price <= 100,
"$100 - $300": (price) => price > 100 && price <= 300,
"$300 - $500": (price) => price > 300 && price <= 500,
"$500 - $1000": (price) => price > 500 && price <= 1000,
};

const pageSize = 12;

const defaultFilters = {
category: [],
priceRanges: [],
availability: [],
discount: [],
};

export default function ProductsClient({
initialProducts,
initialTotal,
}) {
const [products, setProducts] = useState(initialProducts);
const [total, setTotal] = useState(initialTotal);
const [search, setSearch] = useState("");
const [sort, setSort] = useState("");
const [currentPage, setCurrentPage] = useState(1);
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");
const [isFilterModelOpen, setIsFilterModelOpen] = useState(false);
const [filters, setFilters] = useState(defaultFilters);

useEffect(() => {
const controller = new AbortController();

const timer = setTimeout(async () => {
  try {
    setLoading(true);
    setError("");

    const params = new URLSearchParams();

    params.set("limit", "100");

    if (search.trim()) {
      params.set("q", search.trim());
    }

    if (sort) {
      new URLSearchParams(sort).forEach((value, key) => {
        params.set(key, value);
      });
    }

    const endpoint = search.trim()
      ? "https://dummyjson.com/products/search"
      : "https://dummyjson.com/products";

    const response = await fetch(
      `${endpoint}?${params.toString()}`,
      { signal: controller.signal }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await response.json();

    setProducts(data.products);
    setTotal(data.total);
  } catch (err) {
    if (err.name !== "AbortError") {
      setError("Unable to load products. Please try again.");
    }
  } finally {
    if (!controller.signal.aborted) {
      setLoading(false);
    }
  }
}, 300);

return () => {
  clearTimeout(timer);
  controller.abort();
};

}, [search, sort]);

useEffect(() => {
setCurrentPage(1);
}, [search, sort, filters]);

const handleFilterChange = (type, value) => {
setFilters((prev) => ({
...prev,
[type]: prev[type].includes(value)
? prev[type].filter((item) => item !== value)
: [...prev[type], value],
}));
};

const clearFilters = () => {
setFilters({
category: [],
priceRanges: [],
availability: [],
discount: [],
});

setCurrentPage(1);
setIsFilterModelOpen(false);
};

const filteredProducts = products.filter((product) => {
return (
(!filters.category.length ||
filters.category.includes(product.category)) &&
(!filters.priceRanges.length ||
filters.priceRanges.some((range) =>
priceRanges[range](product.price)
)) &&
(!filters.availability.length ||
filters.availability.includes(
product.stock > 0 ? "In Stock" : "Out of Stock"
)) &&
(!filters.discount.length ||
filters.discount.some(
(discount) =>
product.discountPercentage >=
Number(discount.replace("%", ""))
))
);
});

const totalPages = Math.ceil(filteredProducts.length / pageSize);
const startIndex = (currentPage - 1) * pageSize;

const paginatedProducts = filteredProducts.slice(
startIndex,
startIndex + pageSize
);

const FilterSection = () => (
<> <div className="mb-6 flex items-center justify-between gap-2"> <h2 className="text-xl font-semibold">Filter Options</h2>
    <button
      onClick={clearFilters}
      className="text-sm text-gray-500 hover:text-black"
    >
      Clear All
    </button>
  </div>

  <div className="border-t pt-5">
    <h3 className="mb-4 font-semibold">Category</h3>

    <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
      {categories.map((category) => (
        <label
          key={category}
          className="flex min-w-0 items-center gap-2 text-sm"
        >
          <input
            type="checkbox"
            checked={filters.category.includes(category)}
            onChange={() =>
              handleFilterChange("category", category)
            }
          />

          <span className="wrap-break-words">{category}</span>
        </label>
      ))}
    </div>
  </div>

  <div className="mt-6 border-t pt-5">
    <h3 className="mb-4 font-semibold">Price Range</h3>

    <div className="space-y-3">
      {Object.keys(priceRanges).map((range) => (
        <label
          key={range}
          className="flex items-center gap-2 text-sm"
        >
          <input
            type="checkbox"
            checked={filters.priceRanges.includes(range)}
            onChange={() =>
              handleFilterChange("priceRanges", range)
            }
          />

          {range}
        </label>
      ))}
    </div>
  </div>

  <div className="mt-6 border-t pt-5">
    <h3 className="mb-4 font-semibold">Availability</h3>

    <div className="space-y-3">
      {["In Stock", "Out of Stock"].map((item) => (
        <label
          key={item}
          className="flex items-center gap-2 text-sm"
        >
          <input
            type="checkbox"
            checked={filters.availability.includes(item)}
            onChange={() =>
              handleFilterChange("availability", item)
            }
          />

          {item}
        </label>
      ))}
    </div>
  </div>

  <div className="mt-6 border-t pt-5">
    <h3 className="mb-4 font-semibold">Discount</h3>

    <div className="space-y-3">
      {["10%", "20%", "50%", "60%", "80%"].map((item) => (
        <label
          key={item}
          className="flex items-center gap-2 text-sm"
        >
          <input
            type="checkbox"
            checked={filters.discount.includes(item)}
            onChange={() =>
              handleFilterChange("discount", item)
            }
          />

          {item} Discount
        </label>
      ))}
    </div>
  </div>
</>

);

return ( <main className="mx-auto max-w-7xl px-3 py-6 sm:px-6 lg:px-8 lg:py-8"> <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
{/* Desktop Sidebar */} <aside className="hidden h-fit w-64 shrink-0 rounded-xl border bg-white p-5 lg:block"> <FilterSection /> </aside>

    {/* Products Section */}
    <section className="min-w-0 flex-1">
      {/* Title and Search */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-3xl font-bold sm:text-4xl">
            All Products
          </h1>

          <p className="mt-2 text-sm text-gray-500 sm:text-base">
            Discover our exclusive collection
          </p>
        </div>

        <div className="flex min-w-0 gap-2 sm:w-auto sm:shrink-0">
          <div className="relative min-w-0 flex-1 sm:w-64 sm:flex-none lg:w-72">
            <input
              type="search"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-gray-200 py-3 pl-4 pr-10 text-sm outline-none focus:border-[#803f14]"
            />

            <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
          </div>

          <button
            onClick={() =>
              setIsFilterModelOpen((open) => !open)
            }
            aria-expanded={isFilterModelOpen}
            className="shrink-0 rounded-lg border px-3 py-2 text-sm lg:hidden"
          >
            Filters
          </button>
        </div>
      </div>

      {/* Sort and Count */}
      <div className="mb-5 flex items-center justify-between gap-2 sm:mb-6">
        <p className="text-xs text-gray-500 sm:text-sm">
          {filteredProducts.length > 0
            ? `Showing ${startIndex + 1}-${Math.min(
                startIndex + pageSize,
                filteredProducts.length
              )} of ${filteredProducts.length}`
            : "No products found"}
        </p>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          aria-label="Sort products"
          className="max-w-[65%] rounded-lg border px-2 py-2 text-sm sm:max-w-none sm:px-3"
        >
          <option value="">Popularity</option>
          <option value="sortBy=title&order=asc">Name A-Z</option>
          <option value="sortBy=title&order=desc">Name Z-A</option>
          <option value="sortBy=price&order=asc">
            Price: Low to High
          </option>
          <option value="sortBy=price&order=desc">
            Price: High to Low
          </option>
        </select>
      </div>

      {/* Mobile Filters */}
      {isFilterModelOpen && (
        <aside className="mb-6 rounded-xl border bg-white p-5 lg:hidden">
          <FilterSection />
        </aside>
      )}

      {/* Loading and Error */}
      {error ? (
        <p className="py-12 text-center text-red-600" role="alert">
          {error}
        </p>
      ) : loading ? (
        <p className="py-12 text-center text-gray-500" role="status">
          Loading products...
        </p>
      ) : paginatedProducts.length > 0 ? (
        <>
          {/* Responsive Product Grid */}
          <div className="grid grid-cols-2 items-stretch gap-3 sm:gap-5 xl:grid-cols-3 2xl:grid-cols-4">
            {paginatedProducts.map((product) => (
              <div
                key={product.id}
                className="h-full min-w-0"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <nav
              aria-label="Product pagination"
              className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:mt-10"
            >
              <button
                onClick={() =>
                  setCurrentPage((page) => page - 1)
                }
                disabled={currentPage === 1}
                className="rounded-lg border px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40 sm:px-4"
              >
                Previous
              </button>

              {Array.from(
                { length: totalPages },
                (_, index) => index + 1
              ).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  aria-current={
                    currentPage === page ? "page" : undefined
                  }
                  className={`h-9 min-w-9 rounded-lg border px-2 text-sm ${
                    currentPage === page
                      ? "border-[#803f14] bg-[#803f14] text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() =>
                  setCurrentPage((page) => page + 1)
                }
                disabled={currentPage === totalPages}
                className="rounded-lg border px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40 sm:px-4"
              >
                Next
              </button>
            </nav>
          )}
        </>
      ) : (
        <p className="py-12 text-center text-gray-500">
          No products found. Try changing your search or filters.
        </p>
      )}
    </section>
  </div>
</main>
);
}
