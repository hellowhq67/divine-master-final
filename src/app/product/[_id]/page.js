import Nav from "@/components/Navbar/Nav";
import Navigation from "@/components/Navbar/Navigation";
import React from "react";
import ProductDetail from "@/components/Product Details/ProductDetail";
import Footer from "@/components/Footer/Footer";
import ProductReview from "@/components/Product Details/ProductReview";
import RelatedProducts from "@/components/Product Details/RelatedProducts";
import RecentView from "@/components/Product Details/RecentView";
import { sendGTMEvent } from "@next/third-parties/google"; // Assuming this is your utility function

export const dynamic = "force-dynamic";

export default async function Page({ params: { _id } }) {
  const response = await fetch(
    `https://divinemenswear.com/api/admin/products/${_id}`
  );
  const data = await response.json();
  const product = data.products;
  const category = product ? product.category : null;

  // Step 2: Prepare the data for sending to GTM, GA4, and Facebook Pixel
  

  // Step 3: Send the event to GTM for forwarding to GA4 and Facebo

  return (
    <>
      <Navigation />
      <ProductDetail product={product} productID={_id} />
      <RelatedProducts category={category} />
      <RecentView />
      <ProductReview productID={_id} />
      <Footer />
    </>
  );
}
