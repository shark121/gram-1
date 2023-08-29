//ring-[#fa0a8f]
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSwiperSlide } from "swiper/react";
import { FreeMode, Mousewheel } from "swiper";
import { getDefaultStore, useAtom, atom, useSetAtom } from "jotai";
import watchNoBg from "../src/images/watchNoBg.png"
import splash from "../src/images/splash.png"
import Image from "next/image";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import Slider from "./Slider";

// import required modules

const storageData = [
  { id: 1, text: "best watch deals", imageSrc: "" },
  
];

export const storageAtom = atom(storageData[0].text);

export default function StorageSlider() {
  let defaultStore = getDefaultStore();

  const [storageAtomState, setStorageAtomState] = useAtom(storageAtom);

  const [active, setActive] = useState();

  const [activeStorage, setActiveStorage] = useState();

  function setTrayStorage() {
    useEffect(() => {
      setStorageAtomState(activeStorage);

      sessionStorage.setItem("storage", activeStorage);

      // console.log(storageAtomState, activeStorage, defaultStore.get(storageAtom));
    }, [activeStorage]);
  }

  setTrayStorage();

  let scale = "";
  let list = [];

  for (let element of storageData) {
    list.push(
      <SwiperSlide
        className={`flex h-[100%] w-[30%] flex-row items-center justify-center font-bold ${scale} relative`}
      >
        {({ isActive }) => {
          isActive ? setActive(element.id) : null;
          isActive ? setActiveStorage(element.text) : null;
          active === element.id
            ? (scale = "text-gray-800 scale-110")
            : (scale = "text-gray-400");
          {
            return (
              <div className="h-full w-full flex ">
                <div className={`h-full w-[50%] text-[2rem] text-gray-500 flex justify-center items-center`}>
                  {element.text}
                </div>
                <div className="h-full w-[60%] relative">
                  <Image className=" fixed object-contain -z-10" fill src={splash}/>
                  <Image className="object-cover "  fill src={watchNoBg}/>
                </div>
              </div>
            );
          }
        }}
      </SwiperSlide>
    );
  }

  return (
    <div className=" flex h-full w-screen  flex-col items-center justify-center overflow-hidden ">
      <div className="h-full w-full">
        <Swiper
          keyboard={{
            enabled: true,
          }}
          autoplay={true}
          direction="horizontal"
          mousewheel={true}
          slidesPerView={1.2}
          spaceBetween={10}
          freeMode={true}
          modules={[FreeMode, Mousewheel]}
          className="mySwiper  flex h-[20rem]  w-full items-center justify-center"
        >
          {...list}
        </Swiper>
      </div>
      {/* <button className="p-4 w-[80%] font-bold text-[#ff0066] md:hover:scale-x-110 text-[2rem] md:w-[15rem] m-4">Next</button> */}
    </div>
  );
}
