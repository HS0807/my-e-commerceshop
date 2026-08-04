import ProductCard from "../common/ProductCard";

export default async function NewArrivals() {
  const response = await fetch("https://dummyjson.com/products");
  const data = await response.json();

  const latestProducts = data.products.slice(0, 8);

  return (
    <section className="p-5">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mt-2 text-[#803f14] font-serif">
          Latest Products
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {latestProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}