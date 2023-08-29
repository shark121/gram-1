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

const colorData = [
  { id: 0, color: "" },
  { id: 1, color: "bg-[#fb6b09]", name: "Orange" },
  { id: 2, color: "bg-[#343b43]", name: "Black" },
  { id: 3, color: "bg-[#6c7689]", name: "Ash" },
  { id: 4, color: "bg-[#B76E79]", name: "RoseGold" },
  { id: 5, color: "bg-[#fb1230]", name: "Red" },
  { id: 6, color: "bg-[#50C878]", name: "Green" },
  { id: 7, color: "bg-[#faf7f2]", name: "Starlight" },
  { id: 8, color: "bg-[#e5ddea]", name: "Purple" },
  { id: 0, color: "" },
];

export default function ColorSlider() {
  const [middleElement, setMiddleElement] = useState();
  const [activeColor, setActiveColor] = useState("");
  const [textColor, setTextColor] = useState("");

  useEffect(() => {
    console.log(textColor);
    console.log(middleElement);
  }, [activeColor]);

  let scale = "";
  let list = [];

  let animation = { rotate: 135, x: 0 };

  let rotate;

  //   <SwiperSlide className=" rounded-xl bg-red-200"></SwiperSlide>

  for (let element of colorData) {
    let isMiddleElement;

    list.push(
      <SwiperSlide className={` flex items-center justify-center rounded-2xl`}>
        {({ isActive }) => {
          let color = element.color.replace("bg", "text");
          isActive ? setMiddleElement(element.id + 1) : null;
          isActive ? setActiveColor(element.color) : null;
          isMiddleElement = middleElement === element.id;
          isMiddleElement ? setTextColor(color) : "";

          isMiddleElement ? (scale = "scale-110") : (scale = "scale-100");

          {
            return (
              <div
                className={`flex h-full w-full items-center justify-center ${sacramento.className}`}
              >
                <motion.div
                  animate={isMiddleElement ? animation : ""}
                  className={`m-4 box-border ${
                    isMiddleElement
                      ? "h-[3rem] w-[3rem]"
                      : "h-[3.5rem] w-[8rem]"
                  } p-4 ease-in-out ${element.color} ${
                    element.color ? "shadow-lg" : ""
                  } rounded-2xl
                  `}
                ></motion.div>

                {isMiddleElement ? (
                  <motion.div
                    animate={{ x: 10 }}
                    initial={{ x: 200 }}
                    className={`h-full w-[10rem] ${textColor}flex items-center justify-center text-[3rem]`}
                  >
                    {console.log(textColor)}
                    {element.name}
                  </motion.div>
                ) : (
                  ""
                )}
              </div>
            );
          }
        }}
      </SwiperSlide>
    );
  }

  function shouldResize() {
    let ratio;
    useEffect(() => {
      window.addEventListener("resize", () => {
        ratio = window.innerHeight / window.innerWidth;
        console.log(ratio);

        if (ratio >= 1.5) return true;
        return false;
      });
    }, []);
  }

  shouldResize();

  return (
    <div className="h-screen w-screen bg-white pt-6">
      <div className="background flex h-full w-full flex-col p-4">
        <Swiper
          direction={"vertical"}
          spaceBetween={30}
          slidesPerView={3}
          freeMode={true}
          mousewheel={true}
          modules={[FreeMode, Mousewheel]}
          className={` !m-0 h-[60%] w-full  rounded-2xl bg-gray-100 !py-8 px-4 ${textColor.replace(
            "text",
            "ring"
          )}`}
        >
          {...list}
        </Swiper>
        {/* <div className="h-[30vh] w-[100vw]">
          <Wave />
        </div> */}
      </div>
    </div>
  );
}
