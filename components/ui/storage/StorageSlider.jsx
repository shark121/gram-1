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

const storageData = [
  { id: 1, name: "256 GB" },
  { id: 2, name: "128 GB" },
  { id: 3, name: "64  GB" },
  { id: 4, name: "32  GB" },
  { id: 5, name: "16  GB" },
  { id: null, name: "" },
  { id: null, name: "" },
];

export const storageAtom = atom(storageData[0].name);

export default function StorageSlider() {
  
  let defaultStore = getDefaultStore();

  const [storageAtomState, setStorageAtomState] = useAtom(storageAtom);

  const [active, setActive] = useState();

  const [activeStorage, setActiveStorage] = useState();


  function setTrayStorage() {
    useEffect(() => {
      setStorageAtomState(activeStorage);

      sessionStorage.setItem("storage",(activeStorage))
      
      // console.log(storageAtomState, activeStorage, defaultStore.get(storageAtom));
    }, [activeStorage]);
  }

  setTrayStorage();

  let scale = "";
  let list = [];

  for (let element of storageData) {
    list.push(
      <SwiperSlide
        className={`flex h-[100%] w-[30%] items-center justify-center font-bold ${scale}`}
      >
        {({ isActive }) => {
          isActive ? setActive(element.id) : null;
          isActive ? setActiveStorage(element.name) : null;
          active === element.id
            ? (scale = "text-gray-800 scale-110")
            : (scale = "text-gray-400");
          {
            return (
              <div
                className={`${scale} flex h-full w-full items-center justify-center text-[3rem]  transition-all duration-300`}
              >
                {element.name}
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
