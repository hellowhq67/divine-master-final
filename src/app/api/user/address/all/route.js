import connectMongoDB from "@/database/index";
import Address from "@/models/Address";
import { NextResponse } from "next/server";

export async function GET() {
    try {
      await connectMongoDB()
      const address = await Address.find({});
      return NextResponse.json({address }); // Return the products as JSON response
    } catch (error) {
      console.error("Error fetching products:", error);
      return NextResponse.error(error); // Return an error response if there's an error
    }
  }