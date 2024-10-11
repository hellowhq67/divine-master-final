"use client";
import React from "react";
import Link from "next/link";
import style from "./style.module.css";
import Img from "@/assests/banner/newbanner.jpg";
import Image from "next/image";
export default function Banner2() {
  return (
    <div className={style.bannerConteiner2}>
      <div className={style.bannerTextConteiner2}>
        <Link
          href={`/products`}
          className={`${style.btn2} absolute bottom-10 left-6 text-back bg-white text-md font-blod py-2 px-4 flex item-center`}
        >
          SHOP NOW{" "}
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
              d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}
