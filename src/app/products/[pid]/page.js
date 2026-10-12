import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { FaArrowLeft, FaStar } from "react-icons/fa";

async function getProduct(pid) {
const response = await fetch(
`https://dummyjson.com/products/${pid}`,
{
next: { revalidate: 3600 },
}
);

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

const originalPrice = (
product.price /
(1 - product.discountPercentage / 100)
).toFixed(2);

const inStock = product.stock > 0;
const image = product.images?.[0] || product.thumbnail;

return ( <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-12"> <Link
     href="/products"
     className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-[#803f14] sm:mb-8"
   > <FaArrowLeft aria-hidden="true" />
Back to products </Link>

  <section className="grid gap-8 lg:grid-cols-2 lg:gap-16">
    <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100">
      <Image
        src={image}
        alt={product.title}
        fill
        priority
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="object-contain p-4"
      />
    </div>

    <div className="flex flex-col justify-center">
      <p className="text-sm font-semibold uppercase tracking-wider text-[#803f14]">
        {product.brand || product.category}
      </p>

      <h1 className="mt-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl lg:text-4xl">
        {product.title}
      </h1>

      <div className="mt-4 flex items-center gap-2 text-sm font-medium text-yellow-500">
        <FaStar aria-hidden="true" />
        <span>{product.rating}</span>
      </div>

      <div className="mt-6 flex flex-wrap items-baseline gap-3">
        <span className="text-2xl font-bold text-[#803f14] sm:text-3xl">
          ${product.price}
        </span>

        {product.discountPercentage > 0 && (
          <>
            <span className="text-base text-gray-400 line-through sm:text-lg">
              ${originalPrice}
            </span>

            <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
              {Math.round(product.discountPercentage)}% off
            </span>
          </>
        )}
      </div>

      <p className="mt-5 text-sm leading-7 text-gray-600 sm:mt-6 sm:text-base">
        {product.description}
      </p>

      <div className="mt-6 flex items-center gap-2 text-sm font-medium">
        <span
          className={`h-2.5 w-2.5 rounded-full ${
            inStock ? "bg-green-500" : "bg-red-500"
          }`}
        />

        <span className={inStock ? "text-green-700" : "text-red-600"}>
          {inStock
            ? `In stock (${product.stock} available)`
            : "Out of stock"}
        </span>
      </div>

      <button
        type="button"
        disabled={!inStock}
        className="mt-8 w-full rounded-lg bg-[#803f14] px-6 py-3.5 font-semibold text-white transition hover:bg-[#6c3210] disabled:cursor-not-allowed disabled:bg-gray-300 sm:w-fit sm:px-8"
      >
        {inStock ? "Add to cart" : "Out of stock"}
      </button>
    </div>
  </section>
</main>

);
}
