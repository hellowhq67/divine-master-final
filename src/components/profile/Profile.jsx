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

const Profile = () => {
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
