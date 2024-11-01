// app/api/calculate/route.js
import { NextRequest, NextResponse } from 'next/server';

const calculateTotalPrice = (items) => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};

const calculateShippingCharge = (quantity, region) => {
  if (region === "Bangladesh") {
    return quantity > 4 ? 100 + (quantity - 4) * 40 : 100;
  } else if (region === "Europe" || region === "USA") {
    return quantity > 4 ? 100 : 50;
  }
  return 0;
};

const calculateTax = (totalPrice, region) => {
  if (region === "Europe" || region === "USA") {
    return totalPrice * 0.15; // 15% tax
  }
  return 0;
};

export async function POST(req) {
  try {
    const { items, region } = await req.json();

    // Perform calculations
    const totalPrice = calculateTotalPrice(items);
    const shippingCharge = calculateShippingCharge(items.length, region);
    const tax = calculateTax(totalPrice, region);

    const finalPrice = totalPrice + shippingCharge + tax;

    return NextResponse.json({ totalPrice, shippingCharge, tax, finalPrice });
  } catch (error) {
    return NextResponse.json({ error: 'An error occurred while calculating totals.' }, { status: 500 });
  }
}
