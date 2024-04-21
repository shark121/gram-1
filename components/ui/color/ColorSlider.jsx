import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";
import { Sacramento } from "@next/font/google";

const sacramento = Sacramento({
  subsets: ["latin"],
  weight: ["400"],
});

// import required modules
import { FreeMode, Mousewheel, EffectFade } from "swiper";


export default function ColorSlider({colorData, colorState, setColorState}) {

  
  const [activeColor, setActiveColor] = useState(colorState);

  useEffect(() => {
    // console.log(activeColor);
    console.log(activeColor)
    setColorState(activeColor)
    sessionStorage.setItem("color",activeColor)
  }, [activeColor]);

  let list = [];

  for (let element of colorData) {
    list.push(
      <SwiperSlide
      key={element.id}
      className={` flex items-center justify-center rounded-2xl`}>
        {({ isActive }) => {
          let isActiveColor = activeColor === element.name
          {
            return (
              <button
                className={`flex h-full w-full items-center justify-center ${sacramento.className} relative`}
                onClick={() => setActiveColor(element.name)}
              >
                <div
                  className={`${isActiveColor ? "" : "hidden"} h-[2.5rem] w-[2.5rem] ${element.color} absolute -z-20  rounded-full opacity-50`}
                ></div>
                <div
                  className={`absolute -z-10 h-[2.2rem] w-[2.2rem] rounded-full bg-gray-200 opacity-70`}
                ></div>
                <div
                  className={` box-border h-[2rem] w-[2rem]  ease-in-out ${element.color}  rounded-full
                  `}
                ></div>
              </button>
            );
          }
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
          slidesPerView={4}
          freeMode={true}
          mousewheel={true}
          modules={[FreeMode, Mousewheel]}
          className={` !m-0 w-full  !py-6 px-4`}
        >
          {...list}
        </Swiper>
      </div>
    </div>
  );
}
