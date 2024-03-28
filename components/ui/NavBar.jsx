
import Image from "next/image";
// import Logo from "../src/images/Logo.png";
// import Link from "next/link";
import Cart from "../../src/images/svgImages/cart";
import { useState } from "react";
import { motion as m } from "framer-motion";
import ExploreSVG from "../../src/images/svgImages/exploreSVG";
import SearchIcon from "../../src/images/svgImages/searchIcon";
import HomeSVG from "../../src/images/svgImages/homeSVG";
// navigation home

let navigations = [
  {
    destination: "home",
    svgUrl: <HomeSVG />,
    link: "#",
  },
  {
    destination: "explore",
    svgUrl: <ExploreSVG />,
    link: "#",
  },
  {
    destination: "search",
    svgUrl: <SearchIcon />,
    link: "#",
  },
  {
    destination: "cart",
    svgUrl: <Cart />,
    link: "#",
  },
];
export default function NavBar() {
  const [destinationState, setDestinationState] = useState("home");

  function handleOnclick(destination, setCurrent, link) {
    setDestinationState(destination);
  }

  function Destination({ destination, svgUrl, link }) {
    let isCurrent = destination === destinationState;

    let currentStyling = "bg-gray-800 rounded-sm";
    return (
      <button
        onClick={() => handleOnclick(destination)}
        className={`h-full w-[25%] flex items-center justify-center ${isCurrent ? currentStyling : ""}`}
      >
        <div className="h-full w-full p-4">
          {svgUrl}
          <div className="flex  h-[20%] w-full items-center justify-center mt-[2px] ">
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

  let list = [];

  list = navigations.map(({ destination, svgUrl, link }) => {
    return (
      <Destination destination={destination} svgUrl={svgUrl} link={link} key={destination} />
    );
  });

  return (
    <div className="box-border flex h-[4rem] w-screen items-center justify-around  bg-gray-200 m-4 rounded-sm">
      {...list}
    </div>
  );
}