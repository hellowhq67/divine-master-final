import { NextResponse } from "next/server";
import Orders from "@/models/Orders";
import connectMongoDB from "@/database/index";
export async function GET() {
  try {
    await connectMongoDB()
    const orders = await Orders.find({});
    return NextResponse.json({  orders}); // Return the products as JSON response
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.error(error); // Return an error response if there's an error
  }
}
