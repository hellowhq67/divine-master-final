import connectToDB from "@/database";
import { URL } from "url";
import { NextResponse } from "next/server";
import Product from "@/models/products";

export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    // Connect to the database
    await connectToDB();

    // Parse the request URL to extract query parameters
    const requestUrl = new URL(request.url);
    const page = requestUrl.searchParams.get("page") || 1;
    const limit = requestUrl.searchParams.get("limit") || 10;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Extract search queries (productName, category, subcategory)
    const productName = requestUrl.searchParams.get("productName");
    const category = requestUrl.searchParams.get("category");
    const subcategory = requestUrl.searchParams.get("subcategory");

    // Build the search query
    const searchQuery = {};

    if (productName) {
      searchQuery.productName = { $regex: productName, $options: "i" }; // Case-insensitive match
    }

    if (category) {
      searchQuery.category = category;
    }

    if (subcategory) {
      searchQuery.subcategory = subcategory;
    }

    // Fetch products based on the search query with pagination
    const products = await Product.find(searchQuery).skip(skip).limit(parseInt(limit));

    // Fetch recent views by sorting based on 'createdAt' field (replace with 'viewCount' if applicable)
    const recentViews = await Product.find({})
      .sort({ createdAt: -1 }) // Sort by most recent first
      .limit(5);

    // Fetch related products based on category or tags (e.g., using category)
    const relatedCategory = requestUrl.searchParams.get("category");
    let relatedProducts = [];

    if (relatedCategory) {
      relatedProducts = await Product.find({ category: relatedCategory })
        .limit(5)
        .exec();
    }

    // Return the fetched products along with recent views and related products as a JSON response
    return NextResponse.json({
      success: true,
      products,
      recentViews,
      relatedProducts,
    });
  } catch (error) {
    // Log the error and return an error response
    console.error(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong! Please try again later.",
    });
  }
}
