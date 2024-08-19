'use client'
import React, { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from "@/components/admin/sidebar/Sidebar";

const orderData = [
  {
    orderId: "123456",
    userId: "78910",
    userName: "John Doe",
    email: "johndoe@example.com",
    userAddressStreet: "123 Main St",
    userAddressCity: "Anytown",
    userAddressState: "CA",
    userAddressZip: "12345",
    userAddressCountry: "USA",
    productId: "1",
    productName: "Basic Tee",
    productImageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    productImageAlt: "Front of men's Basic Tee in black.",
    productPrice: "$35",
    productColor: "Black",
    quantity: 2,
    totalPrice: "$70",
    deliveryStatus: "Processing",
    deliveryAddressStreet: "456 Elm St",
    deliveryAddressCity: "Othertown",
    deliveryAddressState: "NY",
    deliveryAddressZip: "67890",
    deliveryAddressCountry: "USA",
    payment: "Cash On Delivery",
  },
  {
    orderId: "789101",
    userId: "78910",
    userName: "Jane Smith",
    email: "janesmith@example.com",
    userAddressStreet: "456 Oak St",
    userAddressCity: "Anycity",
    userAddressState: "TX",
    userAddressZip: "54321",
    userAddressCountry: "USA",
    productId: "2",
    productName: "Premium Hoodie",
    productImageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-02.jpg",
    productImageAlt: "Front of men's Premium Hoodie in gray.",
    productPrice: "$60",
    productColor: "Gray",
    quantity: 1,
    totalPrice: "$60",
    deliveryStatus: "Shipped",
    deliveryAddressStreet: "789 Pine St",
    deliveryAddressCity: "Othertown",
    deliveryAddressState: "NY",
    deliveryAddressZip: "98765",
    deliveryAddressCountry: "USA",
    payment: "Credit Card",
  },
];

function OrderTable() {
  const [orders, setOrders] = useState(orderData);

  const handleStatusChange = (orderId, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.orderId === orderId ? { ...order, deliveryStatus: newStatus } : order
      )
    );
  };

  const handleUpdate = (orderId) => {
    // Implement the update functionality here
    console.log("Update order with ID:", orderId);
    toast.success(`Order with ID ${orderId} updated successfully.`);
  };

  const handleCancel = (orderId) => {
    // Implement the cancel functionality here
    console.log("Cancel order with ID:", orderId);
    setOrders((prevOrders) => prevOrders.filter((order) => order.orderId !== orderId));
    toast.success(`Order with ID ${orderId} cancelled successfully.`);
  };

  return (
    <>
      <Sidebar />
      <ToastContainer />
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2">Product Image</th>
                  <th className="py-2">Product Name</th>
                  <th className="py-2">User Name</th>
                  <th className="py-2">Payment Status</th>
                  <th className="py-2">Order Status</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.orderId} className="border-t">
                    <td className="py-2 text-center">
                      <img
                        src={order.productImageSrc}
                        alt={order.productImageAlt}
                        className="h-16"
                      />
                    </td>
                    <td className="py-2 text-center">{order.productName}</td>
                    <td className="py-2 text-center">{order.userName}</td>
                    <td className="py-2 text-center">{order.payment}</td>
                    <td className="py-2 text-center">
                      <select
                        value={order.deliveryStatus}
                        onChange={(e) => handleStatusChange(order.orderId, e.target.value)}
                        className="border p-2 rounded"
                      >
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="py-2 text-center">
                      <button
                        onClick={() => handleUpdate(order.orderId)}
                        className="text-blue-500 ml-2"
                      >
                        Update
                      </button>
                
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderTable;
