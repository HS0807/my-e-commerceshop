"use client";

import { useEffect, useState } from "react";
import ProductCard from "../components/common/ProductCard";
import { FaSearch } from "react-icons/fa";


export default function ProductsClient({
  initialProducts,
  initialTotal,
}) {
  const [products, setProducts] = useState(initialProducts);
  const [total, setTotal] = useState(initialTotal);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      let url = search
        ? `https://dummyjson.com/products/search?q=${search}`
        : "https://dummyjson.com/products?limit=100";

      if (sort) {
        url += url.includes("?") ? "&" : "?";
        url += sort;
      }

      const response = await fetch(url);
      const data = await response.json();

      setProducts(data.products);
      setTotal(data.total);
    };

    fetchProducts();
  }, [search, sort]);

  const [isFilterModelOpen, setIsFilterModelOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: [],
    priceRanges: [],
    availability: [],
    discount: [],
  });

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: prev[filterType].includes(value)
        ? prev[filterType].filter((v) => v !== value)
        : [...prev[filterType], value],
    }));
  };

  const priceRanges = {
    "$0 - $100": (price) => price >= 0 && price <= 100,
    "$100 - $300": (price) => price > 100 && price <= 300,
    "$300 - $500": (price) => price > 300 && price <= 500,
    "$500 - $1000": (price) => price > 500 && price <= 1000,
  };

  const filteredProducts = products.filter((product) => {
    return (
      (filters.category.length === 0 ||
        filters.category.includes(product.category)) &&
      (filters.priceRanges.length === 0 ||
        filters.priceRanges.some((range) => priceRanges[range](product.price))) &&
      (filters.availability.length === 0 ||
        filters.availability.includes(product.stock > 0 ? "In Stock" : "Out of Stock")) &&
      (filters.discount.length === 0 ||
        filters.discount.some((d) => {
          const value = Number(d.replace("%", ""));
          return product.discountPercentage >= value;
        }))
    );
  });

  const FilterSection = () => (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-semibold text-xl">
          Filter Options
        </h2>
        <button onClick={clearFilters} className="text-sm text-gray-500 hover:text-black">
          Clear All
        </button>
      </div>

      {/* Category */}
      <div className="border-t pt-5">
        <h3 className="font-semibold mb-4">Category</h3>
        <div className="space-y-3">
          {[ "mens-shirts", "mens-shoes", "mens-watches", "womens-dresses", "womens-shoes", "womens-bags", "womens-jewellery", "fragrances", "beauty",].map((cat) => (
            <label key={cat} className="flex items-center justify-between cursor-pointer">
              <div className="flex items-center gap-3">
                <input type="checkbox" checked={filters.category.includes(cat)}
                  onChange={() => handleFilterChange("category", cat)} />
                <span>{cat}</span>
              </div>
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
          ].map((range) => (
            <label key={range} className="flex items-center gap-3">
              <input type="checkbox" checked={filters.priceRanges.includes(range)}
                onChange={() => handleFilterChange("priceRanges", range)} />{range}
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
              <input type="checkbox" checked={filters.availability.includes(item)}
                onChange={() => handleFilterChange("availability", item)} /> {item}
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
              <input type="checkbox" checked={filters.discount.includes(item)}
                onChange={() => handleFilterChange("discount", item)} />
              {item} Discount
            </label>
          ))}
        </div>
      </div>


    </>
  )

  const clearFilters = () => {
    setFilters({
      category: [],
      priceRanges: [],
      availability: [],
      discount: [],
    });
    setIsFilterModelOpen(false);
  };


  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">

        {/* Sidebar */}
        <div className="hidden lg:block w-72 shrink-0 h-fit bg-white border rounded-xl p-6 shadow-sm">
          <FilterSection />
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
                Showing {filteredProducts.length} of {total} products
              </p>
            </div>

            <div className="flex items-center gap-4">
              {/* search bar */}

              <div className="relative w-full sm:w-auto">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-48 xl:w-64 pl-3 pr-10 py-2 border border-gray-200 rounded-full text-sm"
                />
                <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
              </div>

              {/* Desktop Controls */}
              <div className="hidden lg:flex items-center gap-5">

                <span className="text-gray-600">
                  Sort By:
                </span>

                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="border rounded-lg px-5 py-2"
                >
                  <option value="">Popularity</option>
                  <option value="sortBy=title&order=asc">Name A-Z</option>
                  <option value="sortBy=title&order=desc">Name Z-A</option>
                  <option value="sortBy=price&order=asc">Price: Low to High</option>
                  <option value="sortBy=price&order=desc">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>

          {/* Mobile Controls */}
          <div className="lg:hidden mb-6">
            <div className="flex gap-3">
              <button onClick={() => setIsFilterModelOpen(!isFilterModelOpen)} className="flex-1 bg-black text-white rounded-lg py-2">
                Filters
              </button>

              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="flex-1 border rounded-lg px-3">
                <option value="">Popularity</option>
                <option value="sortBy=title&order=asc">Name A-Z</option>
                <option value="sortBy=title&order=desc">Name Z-A</option>
                <option value="sortBy=price&order=asc">Price: Low to High</option>
                <option value="sortBy=price&order=desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {isFilterModelOpen && (
            <div className="lg:hidden bg-white border rounded-xl p-6 shadow-sm mb-6">
               <FilterSection />
            </div>
          )}
          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
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