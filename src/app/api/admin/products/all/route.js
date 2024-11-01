import connectMongoDB from "@/database/index";
import { NextResponse } from "next/server";
import Product from "@/models/products";

export async function GET(request) {
  try {
    await connectMongoDB();

    const { searchParams } = new URL(request.url);
    const searchQuery = searchParams.get("query"); // Get search term from the query parameters

    let products;
    if (searchQuery) {
      // If a search query is provided, filter products by name or other relevant fields
      products = await Product.find({
        name: { $regex: searchQuery, $options: "i" }, // Case-insensitive search
      });
    } else {
      // If no search query, return all products
      products = await Product.find({});
    }

    return NextResponse.json({ products });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}
