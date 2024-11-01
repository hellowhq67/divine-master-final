"use client";

import StripeCheckout from "@/components/Checkout/StripeCheckout";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { remove, incrementQuantity, decrementQuantity, selectTotalPrice, selectTotalQuantity,selectTotalPriceEUR  } from '@/redux/Cartslice';
import Link from 'next/link';
import { useDispatch, useSelector } from "react-redux";
import { setCurrency, selectCurrency } from "@/redux/currencySlice";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function Home() {
  const dispatch = useDispatch();
  const totalPriceEUR = useSelector(selectTotalPriceEUR);
  const shippingEuro = 35;
  const amount = totalPriceEUR+shippingEuro;

  return (
   
    <Elements
    stripe={stripePromise}
    options={{
      mode: "payment",
      amount: convertToSubcurrency(amount),
      currency: "usd",
    }}
  >
    <StripeCheckout amount={amount} shippingEuro={shippingEuro} />
  </Elements>
  );
}