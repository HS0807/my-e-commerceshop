import Link from "next/link";
import { notFound } from "next/navigation";
import { FaArrowLeft, FaShieldAlt, FaStar, FaTruck, FaUndo } from "react-icons/fa";

async function getProduct(pid) {
  const response = await fetch(`https://dummyjson.com/products/${pid}`, {
    next: { revalidate: 3600 },
  });
  if (!response.ok) {
    return null;
  }
  return response.json();
}

export default async function ProductDetails({ params }) {
  const { pid } = await params;
  const product = await getProduct(pid);

  if (!product) {
    notFound();
  }

  const originalPrice = (product.price / (1 - product.discountPercentage / 100)).toFixed(2);
  const inStock = product.stock > 0;

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <Link
        href="/products"
        className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-[#803f14]">
        <FaArrowLeft aria-hidden="true" />
        Back to products
      </Link>

      <section className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="overflow-hidden rounded-2xl bg-gray-100">
          <img
            src={product.images?.[0] || product.thumbnail}
            alt={product.title}
            className="h-full min-h-80 w-full object-cover"/>
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#803f14]">
            {product.brand || product.category}
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {product.title}
          </h1>

          <div className="mt-4 flex items-center gap-3">
            <span className="flex items-center gap-1 text-sm font-medium text-yellow-500">
              <FaStar aria-hidden="true" />
              {product.rating}
            </span>
          </div>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="text-3xl font-bold text-[#803f14]">${product.price}</span>
            {product.discountPercentage > 0 && (
              <>
                <span className="text-lg text-gray-400 line-through">${originalPrice}</span>
                <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                  {Math.round(product.discountPercentage)}% off
                </span>
              </>
            )}
          </div>
          <p className="mt-6 leading-7 text-gray-600">{product.description}</p>
          <div className="mt-6 flex items-center gap-2 text-sm font-medium">
            <span className={`h-2.5 w-2.5 rounded-full ${inStock ? "bg-green-500" : "bg-red-500"}`} />
            <span className={inStock ? "text-green-700" : "text-red-600"}>
              {inStock ? `In stock (${product.stock} available)` : "Out of stock"}
            </span>
          </div>
          <button
            type="button"
            disabled={!inStock}
            className="mt-8 w-full rounded-lg bg-[#803f14] px-6 py-4 font-semibold text-white transition hover:bg-[#6c3210] disabled:cursor-not-allowed disabled:bg-gray-300 sm:w-auto">
            {inStock ? "Add to cart" : "Out of stock"}
          </button>
        </div>
      </section>
    </main>
  );
}
