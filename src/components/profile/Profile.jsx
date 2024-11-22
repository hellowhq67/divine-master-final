"use client";
import React, { useState, useEffect } from "react";
import styles from "./style.module.css";
import { getAuth } from "firebase/auth";
import { UseAuth } from "@/app/context/AuthContext";
import img from "@/assests/products/1.jpg";
import Image from "next/image";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { ToastContainer, toast } from "react-toastify";
import Loder from "@/components/loder/Loder";
import axios from "axios";
import { UploadDropzone } from "@uploadthing/react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
const Profile = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites); // Access the favorites state
  const cartitems = useSelector((state) => state.cart.items);
  const { user, logOut } = UseAuth();
  const userID = user ? user.uid : null;
  const [loading, setLoading] = useState(true);
  const [greeting, setGreeting] = useState("");
  const [open, setOpen] = React.useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profile, setProfile] = useState("");
  const [userProfile, setUserProfile] = useState({});
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setLoading(false);
    };
    checkAuthentication();
  }, [user]);
  useEffect(() => {
    const bot = () => {
      const currentHour = new Date().getHours();
      if (currentHour < 12) {
        return "Good Morning";
      } else if (currentHour < 18) {
        return "Good afternoon";
      } else {
        return "Good evenig";
      }
    };
    setGreeting(bot());
    setLoading(false);
  }, []);
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await fetch(`/api/user/all-users/${userID}`);
        const data = await response.json();

        setUserProfile(data.user);
      } catch (error) {
        console.error("Error fetching addresses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAddresses();
  }, [userID]);
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`/api/user/orders/all`);
        const ordersData = response.data.orders;

        // Filter orders based on userID
        const userOrders = ordersData.filter((order) => order.uid === userID);

        setOrders(userOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [userID]);
  const handleSubmit = async () => {
    try {
      const response = await fetch(`/api/user/all-users/${userID}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uid: userID,
          name: name,
          email: email,
          profile: profile,
        }),
      });
      const responseData = await response.json();
      toast.success("profile updated");
    } catch (error) {
      toast.error("An error occurred while creating the product");
    }
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    height: 600,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handelLogout = async () => {
    try {
      // Delete user from MongoDB
      if (userID) {
        const response = await fetch(
          `http://localhost:3000/api/user/all-users/${userID}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ uid: userID }),
          }
        );
        if (response.ok) {
          alert("user deleted");
        }

        if (!response.ok) {
          throw new Error("Failed to delete user");
        }

        const responseData = await response.json();
        console.log("Delete API Response:", responseData);
      }

      // Log out user from Firebase
      await logOut();
    } catch (err) {
      console.log(err);
    }
  };
  const handleCancelOrder = async (orderId) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel the order?"
    );
    if (!confirmCancel) return;

    try {
      const response = await fetch(`/api/user/orders/cancel/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ OrderStatus: "Cancelled" }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Order cancelled successfully.");
        // Optionally, refetch orders or update state to reflect changes
        setOrders(
          orders.map((order) =>
            order._id === orderId
              ? { ...order, OrderStatus: "Cancelled" }
              : order
          )
        );
      } else {
        alert(`Failed to cancel order: ${data.message}`);
      }
    } catch (error) {
      console.error("Error cancelling order:", error);
      alert("An error occurred while cancelling the order.");
    }
  };

  if (loading) {
    return <Loder />;
  }

  return (
    <>
      <ToastContainer />
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Update profile
            </Typography>
            <hr />

            <div className="flex flex-col gap-y-2">
              <label htmlFor="">Enter Your Name</label>
              <input
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                type="text"
                onChange={(e) => setName(e.target.value)}
              />
              <label htmlFor="">Enter Your Email</label>
              <input
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                type="text"
                onChange={(e) => setEmail(e.target.value)}
              />
              {!profile && (
                <UploadDropzone
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    // Do something with the response
                    const fileUrl = res?.[0]?.url;
                    setProfile(fileUrl);
                    console.log("Files: ", res);
                  }}
                  onUploadError={(error) => {
                    console.log(error);
                  }}
                />
              )}

              {profile && (
                <div>
                  <img
                    width={40}
                    src={profile}
                    className=""
                    alt="Uploaded Image"
                  />
                  {/* Button to remove the uploaded image and show UploadDropzone again */}
                  <button onClick={() => setProfile(null)}>Remove Image</button>
                </div>
              )}

              <button
                onClick={handleSubmit}
                className=" bg-slate-950 text-white py-2 "
              >
                Update Profile
              </button>
            </div>
          </Box>
        </Fade>
      </Modal>
      {loading && !user ? (
        <div
          class="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300"
          role="alert"
        >
          <span class="font-medium">Warning alert!</span> Change a few things up
          and try submitting again.
        </div>
      ) : (
        <div className="">
          <div
            className="p-4 mb-4 shadow-md text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
            role="alert"
          >
            <span className="font-medium">
              Hi, {user ? user.displayName : "Guest"}
            </span>{" "}
            {greeting}, welcome to Divine - where innovation meets luxury.
            Explore our exclusive collection and redefine your style.
          </div>

          <div className=" border-2 bg-slate-50 rounded-lg shadow-lg overflow-scroll  p-4 text-xl  flex flex-col">
            <div className="flex items-center">
              {!userProfile ? (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-14"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                </>
              ) : (
                <>
                  <img
                    className="w-10 rounded-full h-10 object-contain"
                    src={userProfile.profile}
                    alt=""
                  />
                </>
              )}
              <div>
                <span>{user ? user.displayName : null}</span>
                <label className="text-sm flex items-center" htmlFor="">
                  {userProfile ? userProfile.email : null}
                </label>
              </div>
            </div>

            <div class="flex items-center justify-start gap-10 py-4">
              <div>
  <div className="flex items-center gap-1">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75"
      />
    </svg>

    <span className="flex items-center text-xl text-gray-900 dark:text-white">
      {orders ? orders.length : "no orders"}
    </span>
  </div>
  <Link
    href={"#"}
    className="mb-2 text-sm lg:text-xl text-gray-500 dark:text-gray-400 underline"
  >
    Orders made
  </Link>
</div>
<div>
  <div className="flex items-center gap-1">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
      />
    </svg>

    <span className="flex items-center text-xl text-gray-900 dark:text-white">
      {cartitems.length}
    </span>
  </div>
  <Link
    href={"/cart"}
    className="mb-2 text-sm lg:text-xl text-gray-500 dark:text-gray-400 underline"
  >
    Added To Cart
  </Link>
</div>
<div>
  <div className="flex items-center gap-1">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
      />
    </svg>

    <span className="flex items-center text-xl text-gray-900 dark:text-white">
      {favorites.length}
    </span>
  </div>
  <Link
    href={"/favorite"}
    className="mb-2 text-sm lg:text-xl text-gray-500 dark:text-gray-400 underline"
  >
    Wishlist Products
  </Link>
</div>
            </div>

            <hr />

            <div>
              <button
                onClick={handleOpen}
                className="bg-black text-white text-sm p-2 flex items-center  rounded my-2 "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                  color="white"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                Update profile
              </button>
            </div>

            <div>
              <h2 className="text-gray-700 font-bold-lg">Your Orders</h2>
              {orders.length === 0 ? (
                <div className="text-center py-10">
                  <p>No orders found.</p>
                  <Link href="/shop">
                    <p className="text-blue-600 underline">Continue Shopping</p>
                  </Link>
                </div>
              ) : (
                <div>
                  {orders.map((x) => (
                    <div
                      key={x._id}
                      className="w-full bg-slate-100 h-50 border-2 p-4"
                    >
                      <div className="flex justify-between w-full flex-col sm:flex-row md:flex-row">
                        <div>
                          <h2 className="text-sm">Order ID: {x._id}</h2>
                          <h2 className="text-sm">Order Date: {x.createdAt}</h2>
                        </div>
                        <div className="flex items-center gap-1">
                          {x.OrderStatus == "pending" ? (
                            <button
                              className="bg-red-600 text-sm text-yellow-50 rounded p-1"
                              onClick={() => handleCancelOrder(x._id)}
                            >
                              Cancel Order
                            </button>
                          ) : (
                            ""
                          )}
                          <button
                            className="bg-green-600 text-sm text-yellow-50 rounded p-1"
                            onClick={() => router.push(`/orders/${x._id}`)}
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                      <hr />
                      <div
                        className={`flex items-center gap-10 ${styles.orderCard}`}
                      >
                        <div className="flex items-center flex-col  md:flex-row sm:flex-row gap-2">
                          {x.products.map((z) => (
                            <div
                              key={z.productId}
                              className="flex items-center   gap-2"
                            >
                              <div>
                                <img
                                  className="w-20 h-20 object-contain"
                                  src={z.productImage1}
                                  alt=""
                                />
                              </div>
                              <div>
                                <h2 className="text-sm">
                                  {` Name: ${z.productName.slice(0, 20)}...`}
                                </h2>
                                <h3 className="text-sm text-slate-900">
                                  Price: {z.smartPrice || z.price}
                                </h3>
                                <h3 className="text-sm text-slate-900">
                                  Size: {z.size}
                                </h3>
                                <h3 className="text-sm text-slate-900">
                                  Quantity: {z.quantity}
                                </h3>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div>
                          <h3 className="text-sm text-slate-900">
                            Customer Name: {x.cus_name}
                          </h3>
                          <h3 className="text-sm text-slate-900">
                            Customer Email: {x.cus_email}
                          </h3>
                          <h3 className="text-sm text-slate-900">
                            Payment Status: {x.paymentStatus}
                          </h3>
                        </div>
                        <div>
                          <h3 className="text-sm text-slate-900">
                            Total: {x.total_amount}
                          </h3>
                          <h3 className="text-sm text-slate-900">
                            Delivery Status: {x.OrderStatus}
                          </h3>
                          <h3 className="text-sm text-slate-900">
                            Delivery Address: {x.ship_city}, {x.ship_state},{" "}
                            {x.ship_add1}
                          </h3>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
