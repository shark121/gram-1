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
import Search from "../../components/search2";
import SearchIcon from "@/images/svgImages/searchIcon";

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
      <motion.div
        className={`flex min-h-screen  w-full flex-col items-center justify-center self-center justify-self-center overflow-x-hidden  bg-white p-2 md:w-[50rem]`}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 1,
          }}
          className="flex h-[5rem]  w-full items-center justify-center"
        >
          <Search />
        </motion.div>
        <div className="flex h-[20rem] w-[31rem]  items-center justify-center">
          <Icon />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 1,
          }}
        >
          <Menu menuItems={menuItems} menuType={"homePage"} />
        </motion.div>
      </motion.div>
    </div>
  );
}

export default HomePage;
