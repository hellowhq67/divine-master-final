import { NextResponse } from "next/server";
import Orders from "@/models/Orders";
import connectMongoDB from "@/database/index";

// Assuming the user ID is passed as a query parameter
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const userID = searchParams.get('userID'); // Fetch userID from query parameters

  if (!userID) {
    return NextResponse.json({ error: "UserID is required" }, { status: 400 });
  }

  try {
    await connectMongoDB();

    // Fetch orders only for the specified user
    const orders = await Orders.find({ uid: userID });

    // Check if orders are found
    if (orders.length === 0) {
      return NextResponse.json({ message: "No orders found for this user" }, { status: 404 });
    }

    return NextResponse.json({ orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}
