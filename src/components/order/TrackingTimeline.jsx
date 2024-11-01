"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Loder from "@/components/loder/Loder";

const TrackingTimeline = ({ trackingNumber, orderId }) => {
  const [orderData, setOrderData] = useState({});
  const [trackingData, setTrackingData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderAndTracking = async () => {
      setLoading(true);
      try {
        const trackResponse = await axios.get(
          `/api/shipping/track/${trackingNumber}`
        );
        const response = await axios.get(`/api/user/orders/${orderId}`);
        setOrderData(response.data.order);
        setTrackingData(trackResponse.data);
        console.log("Tracking Data:", trackResponse.data);
        console.log("Order Data:", response.data.order);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderAndTracking();
  }, [trackingNumber, orderId]);

  if (loading) return <Loder />;
  return (
    <>
      <section class="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
        <div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
            {`  Track the delivery of order ${trackingNumber}`}
          </h2>

          <div class="mt-6 sm:mt-8 lg:flex lg:gap-8">
            <div class="w-full divide-y divide-gray-200 overflow-hidden rounded-lg border border-gray-200 dark:divide-gray-700 dark:border-gray-700 lg:max-w-xl xl:max-w-2xl">
              {orderData.products.map((product, index) => (
                <div class="space-y-4 p-6" key={index}>
                  <div class="flex items-center gap-6">
                    <Link href={product._id} class="h-14 w-14 shrink-0">
                      <img
                        class="h-full w-full dark:hidden"
                        src={product.productImage1}
                        alt="imac image"
                      />
                    
                    </Link>

                    <Link
                      href={product._id}
                      class="min-w-0 flex-1 font-medium text-gray-900 hover:underline dark:text-white"
                    >
                      {product.productName}
                    </Link>
                  </div>
                </div>
              ))}

              <div class="space-y-4 bg-gray-50 p-6 dark:bg-gray-800">
                <div class="space-y-2">
                {orderData.products.map((product, index) => (
                <dl class="flex items-center justify-between gap-4">
                <dt class="font-normal text-gray-500 dark:text-gray-400">
                  Product price
                </dt>
                <dd class="font-medium text-gray-900 dark:text-white">
                  USD
                 {product.priceUsd

                 }
                </dd>
              </dl>
              ))}
                 

               
                </div>

                <dl class="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                  <dt class="text-lg font-bold text-gray-900 dark:text-white">
                    Total
                  </dt>
                  <dd class="text-lg font-bold text-gray-900 dark:text-white">
                   {orderData.total_amount
                   }
                  </dd>
                </dl>
              </div>
            </div>

            <div class="mt-6 grow sm:mt-8 lg:mt-0">
              <div class="space-y-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                <div className="mx-auto max-w-screen-lg px-4">
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                    Shipment Tracking Details
                  </h2>

                  <div className="space-y-6">
                    {trackingData.map((event, index) => (
                      <div
                        key={index}
                        className="flex items-start space-x-4 border-l-4 border-blue-500 pl-4"
                      >
                        <div className="flex flex-col">
                          <span className="text-lg font-medium text-gray-800 dark:text-gray-100">
                            {event.eventDescription}
                          </span>
                          {event.city && (
                            <span className="text-gray-500 dark:text-gray-400">
                              {event.city}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div class="gap-4 sm:flex sm:items-center">
                  <Link
                    href="/profile"
                    class="mt-4 flex w-full items-center justify-center rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300  dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 sm:mt-0"
                  >
                    Order details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TrackingTimeline;
