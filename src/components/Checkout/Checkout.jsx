"use client";
import React, { useState, useEffect } from "react";
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
} from "@/redux/Cartslice";
import { UseAuth } from "@/app/context/AuthContext";
import Loder from "@/components/loder/Loder";
import { toast, ToastContainer } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/navigation";
const Checkout = () => {
  const router =useRouter()
  const [loading, setLoading] = useState(true);
  const [loader, setLoader] = useState(false);
  const [show, setShow] = useState(false);
  const { user, logOut } = UseAuth();
  const dispatch = useDispatch();
  const cartitems = useSelector((state) => state.cart);
  const totalPrice = useSelector(selectTotalPrice);
  const totalQuantity = useSelector(selectTotalQuantity);
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
  const handleremove = (id) => {
    dispatch(remove(id));
  };

  const [method, setMethod] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const PaymentOption = async () => {
    setLoader(true);
    const token = await user.getIdToken();

    // Dummy data for testing the payment process
    const paymentData = {
      uid: user ? user.uid : null,
      total_amount: total, // The total amount to be paid
      currency: "BDT", // Currency for the transaction
      cus_name: user ? user.displayName : "", // Customer's name
      cus_email: email, // Customer's email
      cus_add1: address1, // Customer's address line 1
      cus_add2: address2, // Customer's address line 2
      cus_city: city, // Customer's city
      cus_state: state, // Customer's state
      cus_postcode: postalCode, // Customer's postcode
      cus_country: "Bangladesh", // Customer's country
      cus_phone: phoneNumber, // Customer's phone number
      cus_fax: phoneNumber, // Customer's fax number (optional)
      shipping_method: "Courier", // Shipping method
      ship_name: user ? user.displayName : "", // Shipping name
      ship_add1: address1, // Shipping address line 1
      ship_add2: address2, // Shipping address line 2
      ship_city: city, // Shipping city
      ship_state: state, // Shipping state
      ship_postcode: postalCode, // Shipping postcode
      ship_country: "Bangladesh", // Shipping country
      product_name: cartitems.map((x) => ({
        name: x.productName,
        quantity: x.quantity,
        price: !x.smartPrice ? x.price : x.smartPrice,
      })), // Name of the product
      product_category: cartitems.category,
      product_profile: "general", // Product profile (e.g., general, physical goods)
      product_amount: cartitems.length, // Quantity of the product
    };
    console.log(paymentData);
    try {
      let res = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Add Authorization header
        },
        body: JSON.stringify(paymentData),
      });

      setLoader(false);
      setShow(true);
      const responseJson = await res.json();
      // Assuming the API response structure is correct
      setMethod(responseJson["data"]["desc"]);
    } catch (error) {
      console.error("Error fetching payment options:", error);
      setLoader(false);
    }
  };
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
      !total ||
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
        total_amount: total,
        currency: "BTD",
        cus_name: user ? user.displayName : "",
        cus_email: email,
        cus_add1: address1,
        cus_add2: address2,
        cus_city: city,
        cus_state: state,
        cus_postcode: postalCode,
        cus_country: "BD",
        cus_phone: phoneNumber,
        cus_fax: phoneNumber,
        shipping_method: "courier",
        ship_name: user ? user.displayName : "",
        ship_add1: address1,
        ship_add2: address2,
        ship_city: city,
        ship_state: state,
        ship_postcode: postalCode,
        ship_country: "BD",
        products: cartitems,
        paymentStatus: "COD",
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
          total: total,
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
        if (emailResponseJson) {
          router.push(`/success`);
        }
        console.log("Email sent: ", emailResponseJson);
      }
    } catch (error) {
      console.error("Error processing order:", error);
      toast.error(
        "Something went wrong while processing your order. Please try again."
      );
    } finally {
      setLoader(false);
      toast.dismiss(pendingToastId); // Dismiss the pending toast once the process is complete
    }
  };

  const PayNow = (PayURL) => {
    window.location.replace(PayURL);
  };
  const total = totalPrice + shipping;
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
                      <p className="text-lg font-bold">
                        {!product.smartPrice
                          ? product.price
                          : product.smartPrice}
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
                onChange={() => setShipping(100)}
              />
              <span class="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
              <label
                class="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                for="radio_1"
              >
                <img
                  class="w-14 object-contain"
                  src="https://steadfast.com.bd/landing-page/asset/images/logo/logo.svg"
                  alt=""
                />
                <div class="ml-5">
                  <span class="mt-2 font-semibold"> Inside Dhaka </span>
                  <p class="text-slate-500 text-sm leading-6">
                    {" Delivery: 2-4 Days,100 Tk"}
                  </p>
                </div>
              </label>
            </div>
            <div class="relative">
              <input
                class="peer hidden"
                id="radio_2"
                type="radio"
                name="radio"
                onChange={() => setShipping(140)}
              />
              <span class="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
              <label
                class="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                for="radio_2"
              >
                <img
                  class="w-14 object-contain"
                  src="https://steadfast.com.bd/landing-page/asset/images/logo/logo.svg"
                  alt=""
                />
                <div class="ml-5">
                  <span class="mt-2 font-semibold">OutSide Dhaka</span>
                  <p class="text-slate-500 text-sm leading-6">
                    {`  Delivery: 2-7 Days 140 tk`}
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
                  class="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                />
              </div>
            </div>

            <div class="mt-6 border-t border-b py-2">
              <div class="flex items-center justify-between">
                <p class="text-sm font-medium text-gray-900">Subtotal</p>
                <p class="font-semibold text-gray-900">{totalPrice}</p>
              </div>
              <div class="flex items-center justify-between">
                <p class="text-sm font-medium text-gray-900">Shipping</p>
                <p class="font-semibold text-gray-900">{shipping}</p>
              </div>
            </div>
            <div class="mt-6 flex items-center justify-between">
              <p class="text-sm font-medium text-gray-900">Total</p>
              <p class="text-2xl font-semibold text-gray-900">{total}</p>
            </div>
          </div>
          {/*    <span>
         <input
              type="checkbox"
              onChange={() => setPayment(!payment)}
              name=""
              id=""
            />{" "}
            Cash On Delivery
          </span>*/}
          <SubmitButton
            onClick={COD}
            submit={loader}
            className="btn btn-primary bg-black text-white p-2 w-full"
            text="Cash On Deilvery"
          />
        </div>
      </div>

      {show && (
        <div
          className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-300 ${
            show ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={handleClose}
          ></div>
          <div className="relative bg-white rounded-lg shadow-lg max-w-lg w-full p-2 z-10 h-screen overflow-scroll">
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
            >
              ✕
            </button>
            <h2 className="text-lg font-semibold mb-4">Payment Methods</h2>
            <div className="flex gap-4 items-center flex-wrap w-full">
              {method.map((item, i) => {
                return (
                  <a
                    onClick={() => {
                      PayNow(item["redirectGatewayURL"]);
                    }}
                  >
                    <img className="w-20 pay-img" src={item["logo"]} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
