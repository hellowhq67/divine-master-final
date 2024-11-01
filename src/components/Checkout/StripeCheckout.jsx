"use client";

import React, { useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import SubmitButton from "./SubmitButton";
import { Modal } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { jsPDF } from "jspdf"; // For generating the PDF invoice

import {
  remove,
  incrementQuantity,
  decrementQuantity,
  selectTotalPrice,
  selectTotalQuantity,
  selectTotalPriceEUR

} from "@/redux/Cartslice";
import { UseAuth } from "@/app/context/AuthContext";
import Loder from "@/components/loder/Loder";
import { toast, ToastContainer } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/navigation";
const StripeCheckout = ({ amount,shippingEuro }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState(false);
  const [show, setShow] = useState(false);
  const { user, logOut } = UseAuth();
  const dispatch = useDispatch();
  const cartitems = useSelector((state) => state.cart.items);
  const totalPrice = useSelector(selectTotalPrice);
  const totalQuantity = useSelector(selectTotalQuantity);
  const totalPriceEUR = useSelector(selectTotalPriceEUR);
  const [email, setEmail] = useState("");
  const [phoneNumber, SetPhoneNumber] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [shipping, setShipping] = useState(0);
  const [payment, setPayment] = useState(false);
  const [method, setMethod] = useState([]);
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState();
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: convertToSubcurrency(amount) }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret))
      
  }, [amount]);
  const COD = async () => {
    setLoader(true);
  
    // Show a pending toast notification
    const pendingToastId = toast.info("Processing your order...", {
      autoClose: false, // Keep the toast open until manually dismissed
    });
  
    if (
      !user ||
      !email ||
      !address1 ||
      !city ||
      !state ||
      !postalCode ||
      !phoneNumber ||
      !amount ||
      !cartitems.length
    ) {
      toast.error("Please fill in all required fields.");
      setLoader(false); // Stop loader on validation error
      toast.dismiss(pendingToastId); // Dismiss pending toast on validation error
      return;
    }
  
    try {
      const token = await user.getIdToken();
  
      const paymentData = {
        uid: user ? user.uid : "",
        total_amount: amount,
        currency: "EUR",
        cus_name: user ? user.displayName : "",
        cus_email: email,
        cus_add1: address1,
        cus_add2: address2,
        cus_city: city,
        cus_state: state,
        cus_postcode: postalCode,
        cus_country: "EUR",
        cus_phone: phoneNumber,
        cus_fax: phoneNumber,
        shipping_method: "DSL",
        ship_name: user ? user.displayName : "",
        ship_add1: address1,
        ship_add2: address2,
        ship_city: city,
        ship_state: state,
        ship_postcode: postalCode,
        ship_country: "BD",
        products: cartitems,
        paymentStatus: "STRIPE",
        OrderStatus: "pending",
      };
  
      console.log(paymentData);
  
      let res = await fetch("/api/user/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(paymentData),
      });
  
      let responseJson = await res.json();
      console.log(responseJson);
  
      if (responseJson) {
        const emailData = {
          to: email,
          userEmail: email,
          invoiceDate: new Date().toLocaleDateString(),
          orderId: responseJson.orderId, // Assuming this is returned from the order API
          documentNo:'pending', // Placeholder or use the real document number
          billedTo: {
            name: `${user.displayName}`,
            address1: address1,
            address2: address2,
            city: city,
            state: state,
            postalCode: postalCode,
            country: "BD",
          },
          products: cartitems,
          total: amount,
        };
  
        let emailRes = await fetch("/api/send-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(emailData),
        });
  
        let emailResponseJson = await emailRes.json();
        
       
      }
    } catch (error) {
      
      toast.error(
        "Something went wrong while processing your order. Please try again."
      );
    } finally {
      setLoader(false);
      toast.dismiss(pendingToastId); // Dismiss the pending toast once the process is complete
    }
  };

  const handleSubmit = async (event) => {

      // Show a pending toast notification
   
    event.preventDefault();
    setLoading(true);
    COD();
    if (!stripe || !elements) {
      return;
    }

    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `http://www.localhost:3000/success?amount=${amount}`,
      },
    });

    if (error) {
      setErrorMessage(error.message);
    }

    setLoading(false);
  };

  if (!clientSecret || !stripe || !elements) {
    return (
      <div className="flex items-center justify-center">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <ToastContainer />
      <div class="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
        <div class="px-4 pt-8">
          <p class="text-xl font-medium">Order Summary</p>
          <p class="text-gray-400">
            {` Check your items. And select a suitable shipping method.`}
          </p>
          <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
            {cartitems.length === 0 ? (
              <>
                <Link href="/products">Continue to shopping</Link>
              </>
            ) : (
              <>
                {cartitems.map((product) => (
                  <div
                    key={product.id}
                    className="flex flex-col rounded-lg bg-white sm:flex-row"
                  >
                    <img
                      className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                      src={product.productImage1}
                      alt={product.productName}
                    />
                    <div className="flex w-full flex-col px-4 py-4">
                      <span className="font-semibold">
                        {product.productName}
                      </span>
                      <span className="float-right text-gray-400">
                        {product.Sizes}
                      </span>
                      <p className="text-md font-bold">
                        {product.priceUsd} EUR
                      </p>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>

          <p class="mt-8 text-lg font-medium">Shipping Methods</p>
          <form class="mt-5 grid gap-6">
            <div class="relative">
              <input
                class="peer hidden"
                id="radio_1"
                type="radio"
                name="radio"
                required
              />
              <span class="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
              <label
                class="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                for="radio_1"
              >
                <img
                  class="w-14 object-contain"
                  src="https://w7.pngwing.com/pngs/797/345/png-transparent-dhl-express-supply-chain-management-dhl-supply-chain-business-business-label-text-rectangle-thumbnail.png"
                  alt=""
                />
                <div class="ml-5">
                  <span class="mt-2 font-semibold"> EUROPE </span>
                  <p class="text-slate-500 text-sm leading-6">
                    {" Delivery: 3-7 Days,35 EUR "}
                  </p>
                </div>
              </label>
            </div>
           
          </form>
        </div>
        <div class="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
          <p class="text-xl font-medium">Payment Details</p>
          <p class="text-gray-400">
            {"       Complete your order by providing your payment details."}
          </p>

          <div class="">
            <label for="email" class="mt-4 mb-2 block text-sm font-medium">
              Email
            </label>

            <div class="relative">
              <input
                type="text"
                id="email"
                name="email"
                required
                class="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="your.email@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
              />
              <div class="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </div>
            </div>
            <div class="mt-4">
              <label
                for="address"
                class="block text-gray-700 dark:text-white mb-1"
              >
                {`  Phone Number `}
              </label>
              <input
                type="number"
                required
                onChange={(e) => SetPhoneNumber(e.target.value)}
                class="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
              />
            </div>
            <div class="mt-4">
              <label
                for="address"
                class="block text-gray-700 dark:text-white mb-1"
              >
                {`  Address `}
              </label>
              <input
                type="text"
                required
                onChange={(e) => setAddress1(e.target.value)}
                class="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
              />
            </div>
            <div class="mt-4">
              <label class="block text-gray-700 dark:text-white mb-1">
                Street Address
              </label>
              <input
                type="text"
                id="address"
                required
                onChange={(e) => setAddress2(e.target.value)}
                class="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
              />
            </div>

            <div class="mt-4">
              <label
                for="city"
                class="block text-gray-700 dark:text-white mb-1"
              >
                City
              </label>
              <input
                type="text"
                onChange={(e) => setCity(e.target.value)}
                class="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
              />
            </div>

            <div class="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label
                  for="state"
                  class="block text-gray-700 dark:text-white mb-1"
                >
                  State
                </label>
                <input
                  type="text"
                  id="state"
                  required
                  onChange={(e) => setState(e.target.value)}
                  class="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                />
              </div>
              <div>
                <label
                  for="zip"
                  class="block text-gray-700 dark:text-white mb-1"
                >
                  ZIP Code
                </label>
                <input
                  type="text"
                  id="zip"
                  onChange={(e) => setPostalCode(e.target.value)}
                  required
                  class="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                />
              </div>
            </div>

            <div class="mt-6 border-t border-b py-2">
              <div class="flex items-center justify-between">
                <p class="text-sm font-medium text-gray-900">Subtotal</p>
                <p class="font-semibold text-gray-900">{totalPriceEUR}</p>
              </div>
              <div class="flex items-center justify-between">
                <p class="text-sm font-medium text-gray-900">Shipping</p>
                <p class="font-semibold text-gray-900">{shippingEuro}</p>
              </div>
            </div>
            <div class="mt-6 flex items-center justify-between">
              <p class="text-sm font-medium text-gray-900">Total</p>
              <p class="text-2xl font-semibold text-gray-900">{amount}</p>
            </div>
          </div>
         
          <form onSubmit={handleSubmit} className="bg-white p-2 rounded-md">
            {clientSecret && <PaymentElement />}

            {errorMessage && <div>{errorMessage}</div>}

            <button
              disabled={!stripe || loading}
              className="text-white w-full p-5 bg-black mt-2 rounded-md font-bold disabled:opacity-50 disabled:animate-pulse"
            >
              {!loading ? `Pay ${amount} EUR` : "Processing..."}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StripeCheckout;
