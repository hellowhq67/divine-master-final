"use client";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { add } from "@/redux/Cartslice";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import Icon from "./taka.png";
import styles from "./styles.module.css";
import Image from "next/image";
// Import required modules
import { Pagination, Navigation } from "swiper/modules";

export default function Featured() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch products data from your API endpoint
    fetch("/api/admin/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products.filter((product) => product.isFeatured));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  const handleAdd = (product) => {
    dispatch(add(product));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className={styles.loader}></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start justify-start w-screen h-full">
      <h2 className=" ml-6  mb-6 text-3xl font-sans font-semibold  text-gray-900 text-center">
        NEW ARRIVAL
      </h2>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
        clickable:true,
        }}
        navigation={true}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        }}
        modules={[Pagination, Navigation]}
        className={styles.mySwiper}
      >
        {products.map((product) => (
          <SwiperSlide key={product._id}>
            <div className={styles.Card}>
              <Link
                href={`/product/${product._id}`}
                className={styles.productImgae}
              >
                <img src={product.productImage1} alt={product.productName} />
                <span className={styles.discount}>{`${Math.round(
                  ((product.price - product.smartPrice) / product.price) * 100
                )}% off`}</span>
              </Link>
              <div className={styles.ProductInfo}>
                <h2 className={styles.productTitle}>
                  {`${product.productName.slice(0, 20)} ....`}
                </h2>
                <div className="flex items-start justify-start">
                  {!product.smartPrice ? (
                    <span>{product.price}</span>
                  ) : (
                    <span className=" flex items-center text-sm">
                      <span className="font-sans text-sm px-1 text-black">BTD</span>
                      {product.smartPrice}
                      <span className="mx-1 text-sm line-through text-gray-600">
                        {product.price}
                      </span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
        
      </Swiper>
    </div>
  );
}
