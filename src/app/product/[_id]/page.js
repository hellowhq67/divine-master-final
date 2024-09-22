export default async function Page({ params: { _id } }) {
  try {
    const response = await fetch(`/api/admin/products/${_id}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
   

    const data = await response.json();
    console.log(data); // log the data for debugging
    const product = data.products;

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
