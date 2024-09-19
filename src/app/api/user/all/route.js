import connectMongoDB from "@/database/index";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectMongoDB();

    // Get the page and limit from the query parameters
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;

    // Calculate the skip value for pagination
    const skip = (page - 1) * limit;

    // Fetch the total count of users
    const totalUsers = await User.countDocuments();

    // Fetch the users with pagination
    const users = await User.find({})
      .skip(skip)
      .limit(limit);

    // Return the users and total count in the response
    return NextResponse.json({ 
      users, 
      totalUsers, 
      currentPage: page, 
      totalPages: Math.ceil(totalUsers / limit) 
    });

  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: "Error fetching users" }, { status: 500 });
  }
}