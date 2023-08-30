import { motion } from "framer-motion";
import Slider from "../../components/Slider";
import { atom, getDefaultStore } from "jotai";
import SearchBar from "../../components/SearchBar";
import Menu from "../../components/Menu";
import airpods from "../images/airpods.jpg";
import iphone from "../images/iphone.jpg";
import accessoriesImg from "../images/accessories.jpg";
import watchesImg from "../images/watches.jpg";
import Logo from "../images/LogoSmall.png";
import Image from "next/image";
import { useEffect } from "react";
import Icon from "../images/svgImages/gram";

export let containerArrayAtom = atom([]);

export const dataArrayAtom = atom([]);

let menuItems = [
  {
    image: airpods,
    name: "airpods",
    collection: "airpods",
  },
  {
    image: iphone,
    name: "iphone",
    collection: "phones",
  },
  {
    image: watchesImg,
    name: "apple watch",
    collection: "watches",
  },
  {
    image: accessoriesImg,
    name: "accessories",
    collection: "accessories",
  },
];

function HomePage() {
  return (
    <div className="min-w-screen flex min-h-screen items-center justify-center">
      <div
        className={`flex min-h-screen w-full flex-col items-center justify-center self-center justify-self-center overflow-x-hidden  bg-white p-2 md:w-[50rem]`}
      >
        <div className="h-[5rem] w-full bg-red-400">
          
        </div>
        <div className="flex h-[15rem] w-[22rem] scale-150 items-center justify-center">
          <Icon />
        </div>
        <Menu menuItems={menuItems} menuType={"homePage"} />
      </div>
    </div>
  );
}

export default HomePage;
