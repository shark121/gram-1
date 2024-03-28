import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";
import { Sacramento } from "@next/font/google";
import airpods from "../src/images/airpodsNoBg.png";
import Image from "next/image";
import watch from "../src/images/watchCropped.png";
import iphone from "../src/images/iphone-12-pro-cropped.png";
import Element from "./ui/Element";

let products = [
  {
    name: "airpods Pro",
    price: 12000,
    imageUrl: airpods,
    flash: true,
  },
  {
    name: "series 3",
    price: 12000,
    imageUrl: watch,
    newItem: true,
  },
  {
    name: "iphone 11 Pro",
    price: 12000,
    imageUrl: iphone,
    scale: 1.5,
  },
  {
    name: "airpods Pro",
    price: 12000,
    imageUrl: airpods,
  },
  {
    name: "airpods Pro",
    price: 12000,
    imageUrl: airpods,
  },
  {
    name: "airpods Pro",
    price: 12000,
    imageUrl: airpods,
    newItem: true,
  },
];
const sacramento = Sacramento({
  subsets: ["latin"],
  weight: ["400"],
});

// import required modules
import { FreeMode, Mousewheel, EffectFade } from "swiper";

export default function HomeSlider({}) {
  let list = [];

  for (let element of products) {
    list.push(
      <SwiperSlide
        key={element.id}
        className={` flex items-center justify-center rounded-2xl`}
      >
        {({ isActive }) => {
          return (
            <Element image={element.imageUrl} flash={element.flash} newItem={element.newItem} price={element.price} name={element.name} />
          );
        }}
      </SwiperSlide>
    );
  }

  return (
    <div className="h-full w-full">
      <div className="background flex h-full w-full flex-col">
        <Swiper
          direction={"horizontal"}
          // spaceBetween={2}
          slidesPerView={2.5}
          freeMode={true}
          mousewheel={true}
          modules={[FreeMode, Mousewheel]}
          className={`  w- !m-0 w-full  !py-6 px-4 `}
        >
          {...list}
        </Swiper>
      </div>
    </div>
  );
}
