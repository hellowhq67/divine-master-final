import connectToDB from "@/database";
import { URL } from "url";
import { NextResponse } from "next/server";
import Product from "@/models/products";

export async function GET(request, { params }) {
  try {
    // Destructure the category from the params
    const { category } = params;

    // Connect to the database
    await connectToDB();

    // Parse the request URL to extract pagination parameters
    const requestUrl = new URL(request.url);
    const page = parseInt(requestUrl.searchParams.get('page')) || 1; // Default to page 1
    const limit = parseInt(requestUrl.searchParams.get('limit')) || 10; // Default to 10 products per page
    const skip = (page - 1) * limit;

    // Fetch products based on category with pagination
    const products = await Product.find({ category })
      .skip(skip)
      .limit(limit);

    // Get total count of products in the category for pagination purposes
    const totalProducts = await Product.countDocuments({ category });

    // Calculate the total number of pages
    const totalPages = Math.ceil(totalProducts / limit);

    // Return the fetched products along with pagination data
    return NextResponse.json({
      success: true,
      products,
      pagination: {
        page,
        limit,
        totalPages,
        totalProducts,
      },
    });
  } catch (error) {
    // Log the error and return an error response
    console.error(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong! Please try again later.",
    }, { status: 500 });
  }
}
