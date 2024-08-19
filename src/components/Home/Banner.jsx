"use client";
import Image from "next/image";
import Link from "next/link";
import style from "./style.module.css";
import React, { useRef, useState } from "react";

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
          <div className={style.bannerTextConteiner}>
            <h1 className={style.title}>UP TO 70% OF AT </h1>
            <h2 className={style.subtitle}>MENS COLLECTION</h2>
            <Link className={style.button} href={"/products"}>
              Shop Now
            </Link>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className={style.bannerConteiner}>
          <div className={style.bannerTextConteiner}>
            <h1 className={style.title}>UP TO 70% OF AT </h1>
            <h2 className={style.subtitle}>MENS COLLECTION</h2>
            <Link className={style.button} href={"/products"}>
              Shop Now
            </Link>
          </div>
        </div>
      </SwiperSlide>

    </Swiper>
  );
}
