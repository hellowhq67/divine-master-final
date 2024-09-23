import axios from "axios";

import ProductDetail from "@/components/Product Details/ProductDetail";
import Nav from "@/components/Navbar/Nav";
import Footer from "@/components/Footer/Footer";

// Server Component (data fetching is handled on the server side)
export default async function ProductPage({ params }) {
  const { id } = params; // access the dynamic route parameter

  try {
    const response = await axios.get(`/api/admin/products/${id}`);
    const product = response.data.products;

    return (
      <div>
        <Nav />
        <ProductDetail product={product} />
        <Footer />
      </div>
    );
  } catch (error) {
    console.error("Error fetching product data:", error);
    return <div>Failed to load product details.</div>;
  }
}
