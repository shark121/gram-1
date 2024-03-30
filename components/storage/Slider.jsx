//ring-[#fa0a8f]
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSwiperSlide } from "swiper/react";
import { FreeMode, Mousewheel } from "swiper";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";


export default function SliderComponent({
  data,
  setStorageState,
  storageState,
}) {
  const [activeId, setActiveId] = useState(storageState.id);

  const [activeStorage, setActiveStorage] = useState(storageState);

  function setTrayStorage() {
    useEffect(() => {
      setStorageState(activeStorage);
      sessionStorage.setItem("storage", activeStorage.name)
    }, [activeStorage]);
  }

  setTrayStorage();

  let indicatorStyle = "";
  let list = [];

  for (let element of data) {
    list.push(
      <SwiperSlide
      key={element.id}
        className={`relative flex h-full flex-row items-center justify-center font-bold `}
        onClick={() => {
          setActiveId(element.id);
          setActiveStorage(element);
        }}
      >
        {({ isActive }) => {
          activeId === element.id
            ? (indicatorStyle = "text-gray-900 border-x-[2px] border-gray-600")
            : (indicatorStyle = "text-gray-500");
          {
            return (
              <button
                className={`flex h-full w-[4.6rem] items-center  justify-center text-gray-500`}
              >
                <div className={`h-full ${indicatorStyle} rounded-sm  p-2`}>
                  <div
                    className={`flex h-full w-full items-center justify-center  `}
                  >
                    {element.name}
                  </div>
                </div>
              </button>
            );
          }
        }}
      </SwiperSlide>
    )
    
  }

  return (
    <div className="  w-full ">
      <Swiper
        keyboard={{
          enabled: true,
        }}
        autoplay={true}
        direction="horizontal"
        mousewheel={true}
        slidesPerView={3.2}
        spaceBetween={"1px"}
        freeMode={true}
        modules={[FreeMode, Mousewheel]}
        className="mySwiper  flex h-full   w-full items-center justify-center"
      >
        {...list}
      </Swiper>
    </div>
  );
}
