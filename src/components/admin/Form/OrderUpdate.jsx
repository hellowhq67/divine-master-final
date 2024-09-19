"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "@/components/admin/sidebar/Sidebar";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import Loder from "@/components/loder/Loder";
export default function OrderUpdate({ orderID }) {
  const [order, setOrder] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(`/api/user/orders/${orderID}`);
        const data = await response.json();
        if (response.ok) {
          setOrder(data.order);
          console.log(data.order);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error("Failed to fetch order details.");
        console.error(error);
      }
    };

    fetchOrderDetails();
  }, [orderID]);

  const updateOrderStatus = async (status, paymentStatus) => {
    try {
      const response = await fetch(`/api/user/orders/${orderID}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ OrderStatus: status, paymentStatus }),
      });

      const data = await response.json();
      if (response.ok) {
        setOrder((prevOrder) => ({
          ...prevOrder,
          OrderStatus: status,
          paymentStatus,
        }));
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to update order status.");
      console.error(error);
    }
  };
  const handelInvoice = async () => {
    try {
      const emailData = {
        to: order.cus_email,
        userEmail: order.cus_email,
        invoiceDate: new Date().toLocaleDateString(),
        orderId: order._id, // Assuming this is returned from the order API
        documentNo: order.OrderStatus, // Placeholder or use the real document number
        billedTo: {
          name: order.cus_name,

          address1: order.ship_add1,
          address2: order.ship_add2,
          city: order.ship_city,
          state: order.ship_state,
          postalCode: order.ship_postcode,
          country: "BD",
        },
        products: order.products,
        total: order.total_amount,
      };
      let emailRes = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailData),
      });

      let emailResponseJson = await emailRes.json();
      if (emailResponseJson) {
        toast.success("inovoice sent");
      }
    } catch (error) {
      console.log(error);
    }
  };
  if (!order) return <Loder/>;

  return (
    <>
      <Sidebar />
      <ToastContainer />

      <div className="p-4 sm:ml-64 mt-14">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <h1 className="text-2xl font-bold mb-4">Order Summary</h1>

          <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
            <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">
              Shipping Address
            </p>
            <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
              {order.ship_add1}, {order.ship_add2}, {order.ship_city},{" "}
              {order.ship_state}, {order.ship_postcode}, {order.ship_country}
            </p>
          </div>
          <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4">
            <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">
              Billing Address
            </p>
            <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
              {order.ship_add1}, {order.ship_add2}, {order.ship_city},{" "}
              {order.ship_state}, {order.ship_postcode}, {order.ship_country}
            </p>
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold">Order Details</h2>
            <p>
              <strong>Order ID:</strong> {order._id}
            </p>
            <p>
              <strong>Payment Status:</strong> {order.paymentStatus}
            </p>
            <p>
              <strong>Order Status:</strong> {order.OrderStatus}
            </p>
            <p>
              <strong>Total Amount:</strong> {order.total_amount}{" "}
              {order.currency}
            </p>
          </div>

          <div className="mt-10 flex flex-col xl:flex-row justify-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
            {order.products.map((product, index) => (
              <div
                key={product._id}
                className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8"
              >
                <div className="flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                  <p className="text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800">
                    Customer’s Cart
                  </p>
                  <div className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
                    <div className="pb-4 md:pb-8 w-full md:w-40">
                      <img
                        className="w-full hidden md:block"
                        src={product.productImage1}
                        alt="product"
                      />
                      <img
                        className="w-full md:hidden"
                        src={product.productImage2}
                        alt="product"
                      />
                    </div>
                    <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                      <div className="w-full flex flex-col justify-start items-start space-y-8">
                        <h3 className="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">
                          {product.productName}
                        </h3>
                        <div className="flex justify-start items-start flex-col space-y-2">
                          <p className="text-sm dark:text-white leading-none text-gray-800">
                            <span className="dark:text-gray-400 text-gray-300">
                              Style:{" "}
                            </span>{" "}
                            {product.description}
                          </p>
                          <p className="text-sm dark:text-white leading-none text-gray-800">
                            <span className="dark:text-gray-400 text-gray-300">
                              Size:{" "}
                            </span>{" "}
                            {product.size}
                          </p>
                          <p className="text-sm dark:text-white leading-none text-gray-800">
                            <span className="dark:text-gray-400 text-gray-300">
                              Color:{" "}
                            </span>{" "}
                            {product.color}
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-between space-x-8 items-start w-full">
                        <p className="text-base dark:text-white xl:text-lg leading-6">
                          ${product.smartPrice}{" "}
                          <span className="text-red-300 line-through">
                            {" "}
                            ${product.price}
                          </span>
                        </p>
                        <p className="text-base dark:text-white xl:text-lg leading-6 text-gray-800">
                          {product.quantity}
                        </p>
                        <p className="text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800">
                          ${product.price * product.quantity}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-col md:flex-row md:space-x-6">
            <button
              onClick={() => updateOrderStatus("Delivered", "Paid")}
              className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 flex items-center"
            >
             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-truck" viewBox="0 0 16 16">
  <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5zm1.294 7.456A2 2 0 0 1 4.732 11h5.536a2 2 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456M12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2"/>
</svg>  Delivered & Paid
            </button>
            <button
              onClick={() => updateOrderStatus("Shipped", "Unpaid")}
              className="mt-2 md:mt-0 px-4 py-2 bg-gray-50 dark:bg-gray-800 dark:text-white border border-gray-800 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
            >
              Mark as Shipped & Unpaid
            </button>
            <button className="flex items-center p-2 rounded-md bg-green-600 text-white" onClick={handelInvoice}> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-receipt" viewBox="0 0 16 16">
  <path d="M1.92.506a.5.5 0 0 1 .434.14L3 1.293l.646-.647a.5.5 0 0 1 .708 0L5 1.293l.646-.647a.5.5 0 0 1 .708 0L7 1.293l.646-.647a.5.5 0 0 1 .708 0L9 1.293l.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .801.13l.5 1A.5.5 0 0 1 15 2v12a.5.5 0 0 1-.053.224l-.5 1a.5.5 0 0 1-.8.13L13 14.707l-.646.647a.5.5 0 0 1-.708 0L11 14.707l-.646.647a.5.5 0 0 1-.708 0L9 14.707l-.646.647a.5.5 0 0 1-.708 0L7 14.707l-.646.647a.5.5 0 0 1-.708 0L5 14.707l-.646.647a.5.5 0 0 1-.708 0L3 14.707l-.646.647a.5.5 0 0 1-.801-.13l-.5-1A.5.5 0 0 1 1 14V2a.5.5 0 0 1 .053-.224l.5-1a.5.5 0 0 1 .367-.27m.217 1.338L2 2.118v11.764l.137.274.51-.51a.5.5 0 0 1 .707 0l.646.647.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.509.509.137-.274V2.118l-.137-.274-.51.51a.5.5 0 0 1-.707 0L12 1.707l-.646.647a.5.5 0 0 1-.708 0L10 1.707l-.646.647a.5.5 0 0 1-.708 0L8 1.707l-.646.647a.5.5 0 0 1-.708 0L6 1.707l-.646.647a.5.5 0 0 1-.708 0L4 1.707l-.646.647a.5.5 0 0 1-.708 0z"/>
  <path d="M3 4.5a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5m8-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5"/>
</svg>SENT INVOICE</button>
          </div>
        </div>
      </div>
    </>
  );
}
