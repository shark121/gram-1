import { motion } from "framer-motion";
import Slider from "../../components/Slider";
import {atom, getDefaultStore} from "jotai"
import SearchBar from "../../components/SearchBar";
import Menu from "../../components/Menu";
import airpods from "../images/airpods.jpg";
import iphone from "../images/iphone.jpg";
import accessoriesImg from "../images/accessories.jpg";
import watchesImg from "../images/watches.jpg";
import Logo from "../images/LogoSmall.png";
import Image from "next/image";
import { useEffect } from "react";



export let containerArrayAtom = atom([]);

export const dataArrayAtom = atom([])

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
    <div
      className={`flex min-h-screen w-full flex-col items-center justify-center bg-white p-2 overflow-x-hidden`}
    >
      <div className="relative flex h-[5rem] w-[12rem] items-center justify-center">
        <Image
          src={Logo}
          fill
          className="object-cover"
          quality={10}
          alt={"logo"}
        />
      </div>
      <SearchBar />
      <div className="flex h-[20rem] w-full items-center justify-center !px-2 !py-4 md:[&>*]:w-[40rem] ">
        <Slider />
      </div>
      <Menu menuItems={menuItems} menuType={"homePage"} />
    </div>
  )


 
}

export default HomePage;
