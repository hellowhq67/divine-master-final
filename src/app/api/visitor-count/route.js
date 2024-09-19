// app/api/visitor-count/route.js
import { NextResponse } from "next/server";
import connectMongoDB from "@/database/index"; // Ensure your connectMongoDB is correctly set up
import VisitorCount from "@/models/VisitorCount";
import { v4 as uuidv4 } from 'uuid'; // For generating unique visitor IDs

export async function GET(request) {
  await connectMongoDB();

  // Get cookies from the request
  const cookies = request.headers.get("cookie") || "";
  const visitorCookie = cookies.split(";").find(c => c.trim().startsWith("visitorId="));
  let visitorId = visitorCookie ? visitorCookie.split("=")[1] : null;

  if (!visitorId) {
    visitorId = uuidv4(); // Generate a unique ID if it doesn't exist
  }

  // Increment the visitor count only if the visitor ID is not present
  try {
    // Check if the visitor ID already exists
    const existingVisitor = await VisitorCount.findOne({ "visitors.id": visitorId });

    if (!existingVisitor) {
      // Create or update the visitor count document
      await VisitorCount.updateOne(
        {},
        { $inc: { count: 1 }, $push: { visitors: { id: visitorId, date: new Date() } } },
        { upsert: true }
      );
    }

    // Fetch the current visitor count
    const visitor = await VisitorCount.findOne();
    const currentVisitorCount = visitor ? visitor.count : 0;

    // Set the visitor cookie
    const response = NextResponse.json({ count: currentVisitorCount });
    response.cookies.set("visitorId", visitorId, { httpOnly: true, sameSite: "strict" });

    return response;

  } catch (error) {
    console.error("Error updating visitor count:", error);
    return NextResponse.json({ error: "Error updating visitor count" }, { status: 500 });
  }
}
