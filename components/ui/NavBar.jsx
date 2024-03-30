import Image from "next/image";
import Link from "next/link";
import Cart from "../../src/images/svgImages/cart";
import { useState } from "react";
import { motion as m } from "framer-motion";
// import HomeSVG from "/images/svgImages/homeSVG";
import HomeSVG from "../../src/images/svgImages/homeSVG";
import ExploreSVG from "../../src/images/svgImages/exploreSVG";
import SearchIcon from "../../src/images/svgImages/searchIcon";
// home explore cart search

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
        className={`flex h-full w-[25%] items-center justify-center ${
          isCurrent ? currentStyling : ""
        }`}
      >
        <div className="h-full w-full p-4">
          {svgUrl}
          <div className="mt-[2px]  flex h-[20%] w-full items-center justify-center ">
            <m.div
              initial={{ x: 10 }}
              animate={{ x: 0 }}
              transition={{ ease: "easeInOut" }}
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
      <Destination destination={destination} svgUrl={svgUrl} link={link} />
    );
  });

  return (
    <div className="m-4 box-border flex h-[4rem] w-screen items-center  justify-around rounded-sm bg-gray-200">
      {...list}
    </div>
  );
}
