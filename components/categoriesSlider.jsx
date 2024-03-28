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
import IphoneSVG from "@/images/svgImages/iphoneSVG";
import WatchSVG from "@/images/svgImages/watchSVG";
import AccessoriesSVG from "@/images/svgImages/accessories";
import AirpodsSVG from "@/images/svgImages/airpodsSVG";

let menuItems = [
  {
    image: <AirpodsSVG/>,
    name: "airpods",
    collection: "airpods",
  },
  {
    image: <IphoneSVG/>,
    name: "iphone",
    collection: "phones",
  },
  {
    image: <WatchSVG/>,
    name: "apple watch",
    collection: "watches",
  },
  {
    image: <AccessoriesSVG/>,
    name: "accessories",
    collection: "accessories",
  },
  {
    
  }
];

const sacramento = Sacramento({
  subsets: ["latin"],
  weight: ["400"],
});

// import required modules
import { FreeMode, Mousewheel, EffectFade } from "swiper";
import { Router, useRouter } from "next/router";

export default function CategoriesSlider({}) {
  const router = useRouter();

  let list = [];

  function handleOnClick(itemName) {
    router.push(`./${itemName}`);

    sessionStorage.setItem("type", itemName);

  }

  for (let element of menuItems) {
    list.push(
      <SwiperSlide
        key={element.id}
        className={` flex items-center justify-center`}
      >
        {({ isActive }) => {
          return (
            <button
              className="m-2 flex h-[4rem]  items-center justify-between rounded-sm bg-gray-100  px-4 py-1 font-extrabold text-gray-500   "
              onClick={() => handleOnClick(element.collection)}
            >
              <div className="relative h-full w-[2.5rem] content-center justify-center ">
                {element.image}
              </div>

              {element.name}
            </button>
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
          slidesPerView={"2.6"}
          freeMode={true}
          mousewheel={true}
          modules={[FreeMode, Mousewheel]}
          className={`!m-0 w-full `}
        >
          {...list}
        </Swiper>
      </div>
    </div>
  );
}
