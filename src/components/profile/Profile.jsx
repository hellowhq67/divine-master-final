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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
const orderData = [
  {
    orderId: "123456",
    userId: "78910",
    userName: "John Doe",
    email: "johndoe@example.com",
    phone: 89305930529,
    products: [
      {
        productId: 1,
        productName: "Basic Tee",
        productImageSrc: img,
        productImageAlt: "Front of men's Basic Tee in black.",
        productPrice: "$35",
        productColor: "Black",
        quantity: 1,
      },
    ],

    totalPrice: "$70",
    date: "7,27,2024",
    deliveryStatus: "Processing",
    deliveryAddressStreet: "456 Elm St",
    deliveryAddressCity: "Othertown",
    deliveryAddressState: "NY",
    deliveryAddressZip: "67890",
    deliveryAddressCountry: "USA",
    pyment: "Cash On Delivery",
  },
];
const Profile = () => {
  const { user, logOut } = UseAuth();
  const userID = user ? user.uid : null;
  const [loading, setLoading] = useState(true);
  const [greeting, setGreeting] = useState("");
  const [open, setOpen] = React.useState(false);
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [address, setAddress] = useState("");

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
        const response = await fetch(
          "/api/user/address/all"
        );
        const data = await response.json();

        if (userID) {
          const filteredAddresses = data.address.filter(
            (address) => address.uid === userID
          );
          setAddress(filteredAddresses);

        }
      } catch (error) {
        console.error("Error fetching addresses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAddresses();
  }, [userID]);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/user/address", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uid: userID,
          fullName: address1,
          address: address2,
          country: country,
          city: city,
          state: state,
          postalCode: postalCode,
        }),
      });

      const newAddress = await response.json();
      setAddress((prevAddresses) => [...prevAddresses, newAddress]);
      toast.success("Address submitted");
      handleClose();
    } catch (error) {
      toast.error("An error occurred while submitting the address");
    }
  };
  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `/api/user/address/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setAddress((prevAddresses) =>
          prevAddresses.filter((address) => address._id !== id)
        );
        toast.success(`Address with ID ${id} deleted successfully.`);
      } else {
        console.error(`Failed to delete address with ID ${id}.`);
      }
    } catch (error) {
      console.error(`An error occurred while deleting the address: ${error}`);
    }
  };

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
              SHIPPING ADDRESS
            </Typography>
            <hr />

            <div className="flex flex-col">
              <select
                className="p-2 bg-slate-100 border-slate-200  border-2"
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="">Select Country</option>
                <option value="Bangladesh">Bangladesh </option>
                <option value="USA">USA </option>
                <option value="EURO">EURO</option>
              </select>
              <div className="flex items-center justify-between ">
                <input
                  className="bg-slate-100  my-2 border-2 border-slate-200  p-2 text-black w-full "
                  type="text"
                  placeholder="Address 1"
                  onChange={(e) => setAddress1(e.target.value)}
                />
                <input
                  className="bg-slate-100  my-2 border-2 border-slate-200  p-2 text-black w-full mx-2 "
                  type="text"
                  placeholder="Address 2"
                  onChange={(e) => setAddress2(e.target.value)}
                />
              </div>
              <input
                className="bg-slate-100  my-2 border-2 border-slate-200  p-2 text-black"
                type="text"
                placeholder="CITY"
                onChange={(e) => setCity(e.target.value)}
              />
              <input
                nput
                className="bg-slate-100  my-2 border-2 border-slate-200 p-2 text-black"
                type="text"
                placeholder="STATE"
                onChange={(e) => setState(e.target.value)}
              />
              <input
                className="bg-slate-100  my-2 border-2 border-slate-200  p-2 text-black"
                type="text"
                placeholder="ZIP CODE"
                onChange={(e) => setPostalCode(e.target.value)}
              />
              <button
                onClick={handleSubmit}
                className=" bg-slate-950 text-white py-2 "
              >
                SUBMIT ADDRESS
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
        <div className="    ">
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
              <div>
                <span>{user ? user.displayName : null}</span>
                <label className="text-sm flex items-center" htmlFor="">
                  {user ? user.email : null}
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
                Add Address
              </button>
            </div>
            <div className="flex gap-3 my-4">
              {loading ? (
                <Loder />
              ) : address.length > 0 ? (
                address.map((address) => (
                  <div
                    className="border-2 px-4 py-2 w-full rounded-lg h-30 bg-slate-50 shadow-xl"
                    key={address._id}
                  >
                    {}
                    <div className="flex justify-between w-full">
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="size-6"
                          color="green"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                          />
                        </svg>
                      </div>
                      <button
                        className=""
                        onClick={() => handleDelete(address._id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="size-6"
                          color="red"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                          />
                        </svg>
                      </button>
                    </div>
                    <p className="text-sm">
                      {!address ? (
                        <Loder />
                      ) : (
                        <>
                          {address.fullName}
                          <br />
                          {address.address},{address.city}, {address.state}, ,{" "}
                          {address.postalCode}
                        </>
                      )}
                    </p>
                  </div>
                ))
              ) : (
                <p>No addresses found</p>
              )}
            </div>

            <h2 className="text-gray-700 font-bold-lg">Your Orders</h2>
            <div>
              {orderData.map((x) => {
                return (
                  <>
                    <div
                      key={x.id}
                      className="w-full bg-slate-100 h-50 border-2 p-4"
                    >
                      <div className="flex justify-between w-full ">
                        <div>
                          <h2 className="text-sm">Order ID:{x.orderId}</h2>
                          <h2 className="text-sm">Order Date:{x.date}</h2>
                        </div>
                        <div>
                          <button className="bg-red-600 text-sm text-yellow-50 rounded p-2 uppercase">
                            cancel order
                          </button>
                        </div>
                      </div>
                      <hr />
                      <div
                        className={`flex  items-center gap-10 ${styles.orderCard}`}
                      >
                        <div className="flex items-center gap-2">
                          {x.products.map((z) => {
                            return (
                              <>
                                <div>
                                  <img
                                    className="w-full h-40 object-contain"
                                    src={z.productImageSrc.src}
                                    alt=""
                                  />
                                </div>
                                <div>
                                  <h2 className="text-lg">
                                    Name: {z.productName}
                                  </h2>
                                  <h3 className="text-lg text-slate-900 ">
                                    Price:{z.productPrice}
                                  </h3>
                                  <h3 className="text-lg text-slate-900 ">
                                    Color:{z.productColor}
                                  </h3>
                                  <h3 className="text-lg text-slate-900 ">
                                    Quantity:{z.quantity}
                                  </h3>
                                </div>
                              </>
                            );
                          })}
                        </div>
                        <div>
                          <h3 className="text-lg text-slate-900">
                            Customer Name:{x.userName}
                          </h3>
                          <h3 className="text-lg text-slate-900">
                            Customer Email:{x.email}
                          </h3>
                          <h3 className="text-lg text-slate-900">
                            Payment status:{x.pyment}
                          </h3>
                        </div>
                        <div>
                          <h3 className="text-lg text-slate-900 ">
                            Total:{x.totalPrice}
                          </h3>
                          <h3 className="text-lg text-slate-900">
                            {" "}
                            Delivery Statuts :{x.deliveryStatus}
                          </h3>
                          <h3 className="text-lg text-slate-900">
                            {" "}
                            Delivery Adress :{x.deliveryAddressCity},
                            {x.deliveryAddressState},{x.deliveryAddressStreet},
                          </h3>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
