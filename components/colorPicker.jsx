import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSwiperSlide } from "swiper/react";
import { FreeMode, Mousewheel } from "swiper";
import { getDefaultStore, useAtom, atom, useSetAtom } from "jotai";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import Slider from "./Slider";

// import required modules

const colorData = [
    { id: 1, color: "bg-[rgb(251,107,9,1)]", name: "Orange" },
    { id: 2, color: "bg-[rgb(52,59,67)]", name: "Midnight" },
    { id: 3, color: "bg-[rgb(108,118,137)]", name: "Ash" },
    { id: 4, color: "bg-[rgb(183,110,121)]", name: "RoseGold" },
    { id: 5, color: "bg-[rgb(251,18,48)]", name: "Scarlet" },
    { id: 6, color: "bg-[rgb(80,200,120)]", name: "Emerald" },
    { id: 7, color: "bg-[rgb(255,255,255)]", name: "Starlight" },
    { id: 8, color: "bg-[rgb(229,221,234)]", name: "Purple" },
    { id: 9, color: "", name: "" },
    { id: 10, color: "", name: "" },
  ];

export const storageAtom = atom(colorData[0].name);

export default function ColorPicker() {
  let defaultStore = getDefaultStore();

  const [storageAtomState, setStorageAtomState] = useAtom(storageAtom);

  const [active, setActive] = useState();

  const [activeColor, setactiveColor] = useState();

  function setTrayStorage() {
    useEffect(() => {
      setStorageAtomState(activeColor);

      sessionStorage.setItem("color", activeColor);

      // console.log(storageAtomState, activeColor, defaultStore.get(storageAtom));
    }, [activeColor]);
  }

  setTrayStorage();

  let scale = "";
  let list = [];

  for (let element of colorData) {
    list.push(
      <SwiperSlide
        className={`flex h-[100%] w-[30%] items-center justify-center font-bold ${scale}`}
      >
        {({ isActive }) => {
          isActive ? setActive(element.id) : null;
          isActive ? setactiveColor(element.name) : null;
          active === element.id
            ? (scale = "text-gray-800 scale-110")
            : (scale = "text-gray-400 opacity-50");
          {
            return (
              <div className={`flex h-full w-full items-center justify-center ${scale} ease-in-out duration-300 px-4`}>
                <div className="h-full w-[20rem] flex items-center justify-center">
                  <div className="h-full w-[60%]  flex justify-center items-center text-gray-500">
                    {element.name}
                  </div>
                  <div className={`h-[4rem] w-[4rem] ${element.color} rounded-xl`}></div>
                </div>
              </div>
            );
          }
        }}
      </SwiperSlide>
    );
  }

  return (
    <div className=" flex h-screen w-screen  flex-col items-center justify-center overflow-hidden pt-4">
      <div className="h-[70%] w-full">
        <Swiper
          keyboard={{
            enabled: true,
          }}
          direction="vertical"
          mousewheel={true}
          slidesPerView={3}
          spaceBetween={30}
          freeMode={true}
          modules={[FreeMode, Mousewheel]}
          className="mySwiper flex h-full  w-full items-center justify-center"
        >
          {...list}
        </Swiper>
      </div>
      {/* <button className="p-4 w-[80%] font-bold text-[#ff0066] md:hover:scale-x-110 text-[2rem] md:w-[15rem] m-4">Next</button> */}
    </div>
  );
}
