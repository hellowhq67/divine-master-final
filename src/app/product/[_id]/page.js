import Nav from "@/components/Navbar/Nav";
import React from "react";
import ProductDetail from "@/components/Product Details/ProductDetail";
import Footer from "@/components/Footer/Footer";

export default async function Page({ params: { _id } }) {
  const response = await fetch(`/api/admin/products/${_id}`);
  const data = await response.json();
  const product = data.products;

  return (
    <div>
      <Nav />
      <ProductDetail product={product} />
      <Footer/>
    </div>
  );
}
