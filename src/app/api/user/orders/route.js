import { NextResponse } from "next/server";
import Orders from "@/models/Orders";
import connectMongoDB from "@/database/index";

export async function GET(req) {
  try {
    // Connect to the MongoDB database
    await connectMongoDB();

    // Get query parameters for pagination
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);

    // Calculate the starting index
    const startIndex = (page - 1) * limit;

    // Retrieve orders with pagination
    const orders = await Orders.find({})
      .skip(startIndex)
      .limit(limit)
      .exec();

    // Get total count of orders
    const totalOrders = await Orders.countDocuments();

    // Calculate additional values
    const allOrders = await Orders.find({});
    const totalSales = allOrders.reduce((acc, order) => acc + order.total_amount, 0);
    const totalProfit = allOrders.reduce((acc, order) => acc + order.products.reduce((prodAcc, prod) => prodAcc + (!prod.smartPrice?prod.price:prod.smartPrice - prod.costing) * prod.quantity, 0), 0);

    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const lastWeekSales = allOrders
      .filter(order => new Date(order.createdAt) >= oneWeekAgo)
      .reduce((acc, order) => acc + order.total_amount, 0);

    const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const thisMonthSales = allOrders
      .filter(order => new Date(order.createdAt) >= startOfMonth)
      .reduce((acc, order) => acc + order.total_amount, 0);

    // Return a success response with the retrieved orders, pagination info, and additional values
    return NextResponse.json(
      {
        orders,
        currentPage: page,
        totalPages: Math.ceil(totalOrders / limit),
        totalOrders,
        totalSales,
        totalProfit,
        lastWeekSales,
        thisMonthSales,
      },
      { status: 200 }
    );
  } catch (error) {
    // Log and return an error response in case of failure
    console.error("Error retrieving orders:", error);
    return NextResponse.json(
      { message: "Error retrieving orders", error: error.message },
      { status: 500 }
    );
  }
}
