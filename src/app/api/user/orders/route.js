import { NextResponse } from "next/server";
import Orders from "@/models/Orders";
import connectMongoDB from "@/database/index";
import crypto from "crypto";
export async function GET(req) {
  try {
    // Connect to the MongoDB database
    await connectMongoDB();

    // Extract query parameters for pagination
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);

    if (isNaN(page) || isNaN(limit) || page <= 0 || limit <= 0) {
      return NextResponse.json(
        { message: "Invalid page or limit parameters" },
        { status: 400 }
      );
    }

    const startIndex = (page - 1) * limit;

    // Fetch orders for the current page
    const orders = await Orders.find({})
      .skip(startIndex)
      .limit(limit)
      .exec();

    // Get total count of orders
    const totalOrders = await Orders.countDocuments();

    // Fetch all orders for calculations (optimize this if the dataset is large)
    const allOrders = await Orders.find({}, "total_amount products createdAt");

    // Calculate total sales
    const totalSales = allOrders.reduce((acc, order) => acc + order.total_amount, 0);

    // Calculate total profit
    const totalProfit = allOrders.reduce(
      (acc, order) =>
        acc +
        order.products.reduce(
          (prodAcc, prod) =>
            prodAcc +
            (!prod.smartPrice
              ? prod.price
              : prod.smartPrice - prod.costing) *
              prod.quantity,
          0
        ),
      0
    );

    // Calculate last week's sales
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const lastWeekSales = allOrders
      .filter(order => new Date(order.createdAt) >= oneWeekAgo)
      .reduce((acc, order) => acc + order.total_amount, 0);

    // Calculate this month's sales
    const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const thisMonthSales = allOrders
      .filter(order => new Date(order.createdAt) >= startOfMonth)
      .reduce((acc, order) => acc + order.total_amount, 0);

    // Return response
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
    console.error("Error retrieving orders:", error);
    return NextResponse.json(
      { message: "Error retrieving orders", error: error.message },
      { status: 500 }
    );
  }
}
 // Import crypto

export async function POST(req) {
  try {
    // Connect to MongoDB
    await connectMongoDB();

    // Get the data from the request body
    const body = await req.json();
    
    // Extract order details from the request body
    const {
      uid,
      total_amount,
      currency,
      cus_name,
      cus_email,
      cus_add1,
      cus_add2,
      cus_city,
      cus_state,
      cus_postcode,
      cus_country,
      cus_phone,
      cus_fax,
      shipping_method,
      ship_name,
      ship_add1,
      ship_add2,
      ship_city,
      ship_state,
      ship_postcode,
      ship_country,
      products,
      paymentStatus,
      OrderStatus,
    } = body;

    // Generate a unique transaction ID (tran_id) using crypto
    const tran_id = crypto.randomBytes(16).toString("hex");

    // Create a new order object with the generated tran_id
    const newOrder = new Orders({
      uid,
      total_amount,
      currency,
      cus_name,
      cus_email,
      cus_add1,
      cus_add2,
      cus_city,
      cus_state,
      cus_postcode,
      cus_country,
      cus_phone,
      cus_fax,
      shipping_method,
      ship_name,
      ship_add1,
      ship_add2,
      ship_city,
      ship_state,
      ship_postcode,
      ship_country,
      products,
      paymentStatus,
      OrderStatus,
      tran_id, // Add tran_id to the order
    });

    // Save the new order to the database
    await newOrder.save();

    // Return a success response
    return NextResponse.json(
      {
        message: "Order created successfully",
        order: newOrder,
      },
      { status: 201 }
    );
  } catch (error) {
    // Log and return an error response in case of failure
    console.error("Error creating order:", error);
    return NextResponse.json(
      { message: "Error creating order", error: error.message },
      { status: 500 }
    );
  }
}
