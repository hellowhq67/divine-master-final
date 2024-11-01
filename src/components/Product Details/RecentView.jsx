"use client";
import React, { useState, useEffect } from "react";
import styles from "./reletedproducts.module.css";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Navigation } from "swiper/modules";
import Link from "next/link";
function RecentView() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function fetchData() {
      setLoading(true); // Start loading

      try {
        const productsResponse = await axios.get(
          `http://localhost:3000/api/admin/products`
        );

        setProducts(productsResponse.data.recentViews);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false); // Stop loading
      }
    }

    fetchData();
  }, []);
  return (
    <div className="flex flex-col items-start justify-start w-screen h-full mt-6">
      <h2 className=" ml-6  mb-6 text-3xl font-sans font-semibold  text-gray-900 text-center">
        Recent Views
        <hr />
      </h2>

      <Swiper
        slidesPerView={1}
        spaceBetween={10}
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
                      <span className="font-sans text-sm px-1 text-black">
                        BTD
                      </span>
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

export default RecentView;
