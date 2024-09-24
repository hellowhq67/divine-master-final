"use client";
import Link from "next/link";
import style from "./style.module.css";
import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

export default function Banner() {
  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper"
    >
      <SwiperSlide>
        <div className={style.bannerConteiner}>
          <img
            src="../../assests/banner/img33.jpg"
            alt="Banner 1"
            width={1300}
            height={400}
            className={style.bannerImage}
          />
          <div className={style.bannerTextConteiner}>
            <Link className={style.button} href={"/products"}>
              Shop Now
            </Link>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className={style.bannerConteiner}>
          <img
            src="../../assests/banner/img33.jpg"
            alt="Banner 2"
            width={1300}
            height={400}
            className={style.bannerImage}
          />
          <div className={style.bannerTextConteiner}>
            <Link className={style.button} href={"/products"}>
              Shop Now
            </Link>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
}
