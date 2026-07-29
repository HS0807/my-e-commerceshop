import ProductsClient from "./ProductsClient";

export default async function Products() {
  const response = await fetch("https://dummyjson.com/products?limit=100", {
    cache: "no-store",
  });

  const data = await response.json();

  return (
    <ProductsClient
      initialProducts={data.products}
      initialTotal={data.total}
    />
  );
}