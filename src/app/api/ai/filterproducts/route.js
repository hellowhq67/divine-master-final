import { NextResponse } from 'next/server';
import Product from "@/models/products";
import connectMongoDB from "@/database/index";

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const filter = url.searchParams.get('filter'); // 'latestOffers', 'bestDiscounts', etc.

    // Connect to MongoDB
    await connectMongoDB();

    let filteredProducts;

    switch (filter) {
      case 'latestOffers':
        // Example query: products added today or later
        filteredProducts = await Product.find({ date: { $gte: new Date() } }).exec();
        break;
      case 'bestDiscounts':
        // Example query: products with smartPrice less than price
        filteredProducts = await Product.find({ smartPrice: { $lt: '$price' } }).exec();
        break;
      case 'events':
        // Example query: implement your event logic if necessary
        filteredProducts = await Product.find(/* your query for events */).exec();
        break;
      case 'freeShipping':
        // Example query: products with free shipping
        filteredProducts = await Product.find({ freeShipping: true }).exec();
        break;
      default:
        // Fetch all products if no filter is applied
        filteredProducts = await Product.find().exec();
        break;
    }

    return NextResponse.json({ success: true, products: filteredProducts });
  } catch (error) {
    console.error('Error filtering products:', error);
    return NextResponse.error(error);
  }
}
