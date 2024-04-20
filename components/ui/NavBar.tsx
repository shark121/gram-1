
import Image from "next/image";
// import Logo from "../src/images/Logo.png";
// import Link from "next/destinationURL";
import Cart from "../../src/images/svgImages/cart";
import { useState } from "react";
import { motion as m } from "framer-motion";
import ExploreSVG from "../../src/images/svgImages/exploreSVG";
import SearchIcon from "../../src/images/svgImages/searchIcon";
import HomeSVG from "../../src/images/svgImages/homeSVG";
import { useRouter } from "next/router";
// navigation home

let navigations :{destination :string}[] = [
  {
    destination: "all",
  },
  {
    destination: "airpods",
  },
  {
    destination: "phones",
  },
  {
    destination: "watches",
  },
];

export default function NavBar({destinationState, setDestinationState}:{destinationState:string, setDestinationState:React.Dispatch<React.SetStateAction<string>> }) {
  const router = useRouter();

  function handleOnclick(destination:string) {
    setDestinationState(destination);
    // sessionStorage.setItem("collection", destination);
    
  }

  function Destination({destination}:{destination:string }) {
    let isCurrent = destination === destinationState;

    // let currentStyling = "bg-gray-800 rounded-sm";
    let currentStyling = "";
    return (
      <button 
        onClick={() => handleOnclick(destination)}
        className={`h-full flex items-center justify-center ${isCurrent ? currentStyling : ""}`}
      >
        <div className="h-full w-full text-black ">
          {/* {svgUrl} */}
          {destination}
          <div className="flex  w-full items-center justify-center mt-[2px] ">
            <m.div
            initial={{x:10}}
              animate={{ x: 0 }}
              transition={{ease:"easeInOut"}}
              className={`h-[7px] w-[7px]  rounded-full bg-[#ff0066]  ${
                !isCurrent ? "hidden" : ""
              }`}
            ></m.div>
          </div>
        </div>
      </button>
    );
  }


  let list = navigations.map(({ destination}) => {
    return (
      <Destination destination={destination}  key={destination} />
    );
  });

  return (
    <div className=" flex h-[4rem] w-full items-center justify-around my-2 rounded-sm">
      {...list}
    </div>
  );
}