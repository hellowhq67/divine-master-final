import connectMongoDB from "@/database/index";
import User from "@/models/User";
import { NextResponse } from "next/server";
export async function GET() {
  try {
    await connectMongoDB()
    const user = await User.find({});
    return NextResponse.json({ user }); // Return the products as JSON response
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.error(error); // Return an error response if there's an error
  }
}
