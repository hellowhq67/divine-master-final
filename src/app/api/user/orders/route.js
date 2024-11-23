import { NextResponse } from "next/server";
import Orders from "@/models/Orders";
import connectMongoDB from "@/database/index";
import crypto from "crypto";
export async function GET(req) {
  try {
    // Connect to the MongoDB database
    await connectMongoDB();

    // Get query parameters for pagination
    const page = parseInt(req.headers.get("page") || "1", 10); // Default to page 1
    const limit = parseInt(req.headers.get("limit") || "10", 10); // Default to limit 10
    if (page < 1 || limit < 1) throw new Error("Invalid pagination parameters.");

    // Calculate the starting index
    const skip = (page - 1) * limit;

    // Retrieve paginated orders
    const orders = await Orders.find({})
      .skip(skip)
      .limit(limit)
      .exec();

    // Get total count of orders
    const totalOrders = await Orders.countDocuments();

    // Use aggregation for calculating total sales and profits
    const aggregationResults = await Orders.aggregate([
      {
        $group: {
          _id: null,
          totalSales: { $sum: "$total_amount" },
          totalProfit: {
            $sum: {
              $sum: {
                $map: {
                  input: "$products",
                  as: "product",
                  in: {
                    $multiply: [
                      {
                        $cond: [
                          { $ifNull: ["$$product.smartPrice", false] },
                          { $subtract: ["$$product.smartPrice", "$$product.costing"] },
                          "$$product.price",
                        ],
                      },
                      "$$product.quantity",
                    ],
                  },
                },
              },
            },
          },
        },
      },
    ]);

    const { totalSales = 0, totalProfit = 0 } = aggregationResults[0] || {};

    // Calculate last week's sales
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const lastWeekSales = await Orders.aggregate([
      { $match: { createdAt: { $gte: oneWeekAgo } } },
      { $group: { _id: null, lastWeekSales: { $sum: "$total_amount" } } },
    ]);

    const lastWeekSalesTotal = lastWeekSales[0]?.lastWeekSales || 0;

    // Calculate this month's sales
    const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);

    const thisMonthSales = await Orders.aggregate([
      { $match: { createdAt: { $gte: startOfMonth } } },
      { $group: { _id: null, thisMonthSales: { $sum: "$total_amount" } } },
    ]);

    const thisMonthSalesTotal = thisMonthSales[0]?.thisMonthSales || 0;

    // Return a success response with the retrieved orders and additional values
    return NextResponse.json(
      {
        orders,
        currentPage: page,
        totalPages: Math.ceil(totalOrders / limit),
        totalOrders,
        totalSales,
        totalProfit,
        lastWeekSales: lastWeekSalesTotal,
        thisMonthSales: thisMonthSalesTotal,
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
