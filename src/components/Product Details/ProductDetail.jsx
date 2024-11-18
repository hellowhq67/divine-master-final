"use client";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "./style.css";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { toast, ToastContainer } from "react-toastify";
import Rating from "@mui/material/Rating";
import { sendGTMEvent } from '@next/third-parties/google'
 

import Stack from "@mui/material/Stack";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { add } from "@/redux/Cartslice";
import { addToFavorites, removeFromFavorites } from "@/redux/favoritesSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
export default function ProductDetail({ product, productID }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const favorites = useSelector((state) => state.favorites); // Access the favorites state
  const isFavorite = favorites.some((item) => item._id === product._id);
  const [reviews, setReviews] = useState([]);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
useEffect(() => {
  const fetchReviews = async () => {
    try {
      const response = await axios.get("/api/admin/products/review");
      const allReviews = response.data.review;
      const filteredReviews = allReviews.filter(
        (review) => review.productId === productID
      );
      setReviews(filteredReviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  fetchReviews();

  // Facebook Pixel ViewContent Event
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq('track', 'ViewContent', {
      contents: [{ id: product._id, quantity: 1 }],
      content_type: 'product',
      value: product.price,
      currency: 'BDT',
    });
  }

  // Google Tag Manager Data Layer Event

}, [productID, product]);

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

const handleAddToCart = () => {
  if (!selectedSize) {
    toast.error("Please select your size first");
    return; 
  }


  dispatch(add({ ...product, size: selectedSize }));

  const items = [
    {
      productID: product._id,
      productName: product.productName,
      price: product.price,
      size: selectedSize,
      quantity: 1,
    },
  ];

  // Send the event to Google Tag Manager and Conversion API
  sendGTMEvent({
    event: "add_to_cart", 
   value:{
      ecommerce: {
        currency: "BDT", // Adjust according to your store's currency
        items: items.map(item => ({
          item_id: item.productID,
          item_name: item.productName,
          price: item.price,
          quantity: item.quantity,
          item_variant: item.size,
        })),
      },
    },
  });
}

  // Facebook Pixel tracking for 'AddToCart' event

  const handleToggleFavorite = () => {
    if (!product) return; // Prevent errors if product is undefined
    if (isFavorite) {
      dispatch(removeFromFavorites(product._id));
    } else {
      dispatch(addToFavorites(product));
    }
  };
  const buyNow = () => {
    handleAddToCart();
    router.push("/checkout");
  };

  const average = reviews.length
    ? (
        reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
      ).toFixed(1)
    : 0;
  return (
    <>
      <ToastContainer />
      <section className="relative ">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-4 ">
          <div className=" my-10 grid grid-cols-1 lg:grid-cols-2 gap-16 mx-auto max-md:px-2 ">
            <div className="img">
              <Swiper
                style={{
                  "--swiper-navigation-color": "#fff",
                  "--swiper-pagination-color": "#fff",
                }}
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper2"
              >
                <SwiperSlide>
                  <img src={product.productImage1} />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={product.productImage2} />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={product.productImage3} />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={product.productImage4} />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={product.productImage5} />
                </SwiperSlide>
              </Swiper>
              <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper"
              >
                <SwiperSlide>
                  <img src={product.productImage1} />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={product.productImage2} />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={product.productImage3} />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={product.productImage4} />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={product.productImage5} />
                </SwiperSlide>
              </Swiper>
            </div>
            <div className="data w-full lg:pr-8 pr-0 xl:justify-start justify-center flex items-center max-lg:pb-10 xl:my-2 lg:my-5 my-0">
              <div className="data w-full max-w-xl">
                <p className="text-lg font-medium leading-8 text-black mb-4">
                  {"product"} &nbsp; /&nbsp; {product.subcetagory}&nbsp; /&nbsp;{" "}
                  {product.department}
                </p>
                <h2 className="font-manrope font-bold text-3xl leading-10 text-gray-900 mb-2 capitalize">
                  {product.productName}Basic
                </h2>
                <div className="flex flex-col sm:flex-row sm:items-center mb-6">
                  <div className="flex items-center">
                    <h6 className="line-through font-manrope font-semibold text-2xl leading-9 text-gray-900 pr-5 sm:border-r border-gray-200 mr-5">
                      {product.price}
                    </h6>
                    <h6 className=" font-manrope font-semibold text-2xl leading-9 text-gray-900 pr-5 sm:border-r border-gray-200 mr-5">
                      {product.smartPrice}
                      BTD
                    </h6>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-0.5">
                      {/* Repeated SVG for rating stars */}

                      {!average ? null : (
                        <Stack>
                          <Rating
                            name="half-rating-read"
                            defaultValue={average}
                            readOnly
                          />
                        </Stack>
                      )}
                    </div>
                    <p className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">
                      {average}
                    </p>
                    <div className="text-sm font-medium leading-none text-gray-900 underline hover:no-underline dark:text-white">
                      {`${reviews.length} Reviews`}
                    </div>
                  </div>
                </div>

                <ul className="grid gap-y-4 mb-8">
                  <li className="flex items-center gap-3">
                    <svg
                      width="26"
                      height="26"
                      viewBox="0 0 26 26"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="26" height="26" rx="13" fill="#000" />
                      <path
                        d="M7.66669 12.629L10.4289 15.3913C10.8734 15.8357 11.0956 16.0579 11.3718 16.0579C11.6479 16.0579 11.8701 15.8357 12.3146 15.3913L18.334 9.37183"
                        stroke="white"
                        stroke-width="1.6"
                        stroke-linecap="round"
                      />
                    </svg>
                    <span className="font-normal text-base text-gray-900 ">
                      {`Delivary  Charge ${product.glodalshippings}BTD`}
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg
                      width="26"
                      height="26"
                      viewBox="0 0 26 26"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="26" height="26" rx="13" fill="#000" />
                      <path
                        d="M7.66669 12.629L10.4289 15.3913C10.8734 15.8357 11.0956 16.0579 11.3718 16.0579C11.6479 16.0579 11.8701 15.8357 12.3146 15.3913L18.334 9.37183"
                        stroke="white"
                        stroke-width="1.6"
                        stroke-linecap="round"
                      />
                    </svg>
                    <span className="font-normal text-base text-gray-900 ">
                      {`Quantity:${product.stock}`}
                    </span>
                  </li>
                  <li class="flex items-center gap-3">
                    <svg
                      width="26"
                      height="26"
                      viewBox="0 0 26 26"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="26" height="26" rx="13" fill="#000" />
                      <path
                        d="M7.66669 12.629L10.4289 15.3913C10.8734 15.8357 11.0956 16.0579 11.3718 16.0579C11.6479 16.0579 11.8701 15.8357 12.3146 15.3913L18.334 9.37183"
                        stroke="white"
                        stroke-width="1.6"
                        stroke-linecap="round"
                      />
                    </svg>
                    <span class="font-normal text-base text-gray-900 ">
                      {`Color:${product.color}`}
                    </span>
                  </li>

                  <li class="flex items-center gap-3">
                    <svg
                      width="26"
                      height="26"
                      viewBox="0 0 26 26"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="26" height="26" rx="13" fill="#000" />
                      <path
                        d="M7.66669 12.629L10.4289 15.3913C10.8734 15.8357 11.0956 16.0579 11.3718 16.0579C11.6479 16.0579 11.8701 15.8357 12.3146 15.3913L18.334 9.37183"
                        stroke="white"
                        stroke-width="1.6"
                        stroke-linecap="round"
                      />
                    </svg>
                    <span class="font-normal text-base text-gray-900 ">
                      Cash On delivery is available
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg
                      width="26"
                      height="26"
                      viewBox="0 0 26 26"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="26" height="26" rx="13" fill="#000" />
                      <path
                        d="M7.66669 12.629L10.4289 15.3913C10.8734 15.8357 11.0956 16.0579 11.3718 16.0579C11.6479 16.0579 11.8701 15.8357 12.3146 15.3913L18.334 9.37183"
                        stroke="white"
                        stroke-width="1.6"
                        stroke-linecap="round"
                      />
                    </svg>
                    <span class="font-normal text-base text-gray-900 ">
                      Select Your Size before added to cart
                    </span>
                  </li>
                </ul>
                <p className="text-gray-900 text-lg leading-8 font-medium mb-4">
                  Size
                </p>
                <div className="w-full pb-8 border-b border-gray-100 flex-wrap">
                  <div className="grid grid-cols-3 min-[400px]:grid-cols-5 gap-3 max-w-md">
                    {product.sizes[0].map((size) => (
                      <button
                        key={size}
                        className={`border-2 p-2 ${
                          selectedSize === size
                            ? "border-blue-500"
                            : "border-gray-400"
                        } ${selectedSize === size ? "bg-blue-100" : ""}`}
                        onClick={() => handleSizeSelect(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div className=" py-8">
                  <button
                    onClick={handleAddToCart}
                    className="group py-4 px-5 rounded-full bg-black text-white font-semibold text-lg w-full flex items-center justify-center gap-2 transition-all duration-500 hover:bg-gray-800"
                  >
                    <svg
                      class="stroke-white "
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.7394 17.875C10.7394 18.6344 10.1062 19.25 9.32511 19.25C8.54402 19.25 7.91083 18.6344 7.91083 17.875M16.3965 17.875C16.3965 18.6344 15.7633 19.25 14.9823 19.25C14.2012 19.25 13.568 18.6344 13.568 17.875M4.1394 5.5L5.46568 12.5908C5.73339 14.0221 5.86724 14.7377 6.37649 15.1605C6.88573 15.5833 7.61377 15.5833 9.06984 15.5833H15.2379C16.6941 15.5833 17.4222 15.5833 17.9314 15.1605C18.4407 14.7376 18.5745 14.0219 18.8421 12.5906L19.3564 9.84059C19.7324 7.82973 19.9203 6.8243 19.3705 6.16215C18.8207 5.5 17.7979 5.5 15.7522 5.5H4.1394ZM4.1394 5.5L3.66797 2.75"
                        stroke=""
                        stroke-width="1.6"
                        stroke-linecap="round"
                      />
                    </svg>
                    Add to cart
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleToggleFavorite}
                    className={`group transition-all duration-500 p-4 rounded-full ${
                      isFavorite
                        ? "bg-black shadow-sm "
                        : "bg-black hover:bg-gray-950 hover:shadow-sm"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="26"
                      height="26"
                      viewBox="0 0 26 26"
                      fill={isFavorite ? "#ffff" : "none"}
                      color="#ffff"
                    >
                      <path
                        d="M4.47084 14.3196L13.0281 22.7501L21.9599 13.9506M13.0034 5.07888C15.4786 2.64037 19.5008 2.64037 21.976 5.07888C24.4511 7.5254 24.4511 11.4799 21.9841 13.9265M12.9956 5.07888C10.5204 2.64037 6.49824 2.64037 4.02307 5.07888C1.54789 7.51738 1.54789 11.4799 4.02307 13.9184M4.02307 13.9184L4.04407 13.939M4.02307 13.9184L4.46274 14.3115"
                        stroke="#ffff"
                        stroke-width="1.6"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={buyNow}
                    className="text-center w-full px-5 py-4 rounded-[100px] bg-black flex items-center justify-center font-semibold text-lg text-white shadow-sm transition-all duration-500 hover:bg-gray-900 hover:shadow-gray-400"
                  >
                    Buy Now
                  </button>
                </div>
                <div className="my-4">
                  <Accordion defaultExpanded>
                    <AccordionSummary
                      expandIcon={
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="size-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="m19.5 8.25-7.5 7.5-7.5-7.5"
                          />
                        </svg>
                      }
                      aria-controls="panel1-content"
                      id="panel1-header"
                    >
                      <Typography>Description</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>{product.description}</Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="size-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="m19.5 8.25-7.5 7.5-7.5-7.5"
                          />
                        </svg>
                      }
                      aria-controls="panel2-content"
                      id="panel2-header"
                    >
                      <Typography>Trams And Condition</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        {`
                      

Terms & Conditions
Delivery: We deliver all over Bangladesh with an estimated delivery time of 3 to 7 business days. International shipping is also available with the same delivery timeframe.

Returns:

If you receive the wrong product, we will arrange a free return and replacement.
If you wish to return a product for any other reason (e.g., change of mind), you will be responsible for the return shipping costs.
Refund Policy: To be eligible for a return, products must be in their original condition, unworn, and with all tags intact.

Order Issues: Please contact our support team within 48 hours of receiving your order if you encounter any issues.

By purchasing, you agree to these terms. For more details, visit
                    `}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
