import { motion } from "framer-motion";
import Slider from "../../components/Slider";
import { useEffect, useState } from "react";
import Icon from "../images/svgImages/gram";
import CategoriesSlider from "../../components/categoriesSlider";
import Element from "../../components/Element";
import airpods from "../images/airpodsNoBg.png";
import Image from "next/image";
import watch from "../images/watchCropped.png";
import iphone from "../images/iphone-12-pro-cropped.png";
import UserSVG from "@/images/svgImages/userSVG";

let products = [
  {
    name: "airpods Pro",
    price: 12000,
    imageUrl: airpods,
    flash: true,
  },
  {
    name: "series 3",
    price: 12000,
    imageUrl: watch,
    newItem: true,
  },
  {
    name: "iphone 11 Pro",
    price: 12000,
    imageUrl: iphone,
    scale: 1.5,
  },
  {
    name: "airpods Pro",
    price: 12000,
    imageUrl: airpods,
  },
  {
    name: "airpods Pro",
    price: 12000,
    imageUrl: airpods,
  },
  {
    name: "airpods Pro",
    price: 12000,
    imageUrl: airpods,
  },
  {
    name: "airpods Pro",
    price: 12000,
    imageUrl: airpods,
  },
  {
    name: "airpods Pro",
    price: 12000,
    imageUrl: airpods,
  },
  {
    name: "airpods Pro",
    price: 12000,
    imageUrl: airpods,
  },
  {
    name: "airpods Pro",
    price: 12000,
    imageUrl: airpods,
  },
  {
    name: "airpods Pro",
    price: 12000,
    imageUrl: airpods,
  },
  {
    name: "airpods Pro",
    price: 12000,
    imageUrl: airpods,
  },
  {
    name: "airpods Pro",
    price: 12000,
    imageUrl: airpods,
  },
  {
    name: "airpods Pro",
    price: 12000,
    imageUrl: airpods,
  },
  {
    name: "airpods Pro",
    price: 12000,
    imageUrl: airpods,
  },
  {
    name: "airpods Pro",
    price: 12000,
    imageUrl: airpods,
  },
  {
    name: "airpods Pro",
    price: 12000,
    imageUrl: airpods,
  },
  {
    name: "airpods Pro",
    price: 12000,
    imageUrl: airpods,
  },
  {
    name: "airpods Pro",
    price: 12000,
    imageUrl: airpods,
  },
  {
    name: "airpods Pro",
    price: 12000,
    imageUrl: airpods,
  },
  {
    name: "airpods Pro",
    price: 12000,
    imageUrl: airpods,
  },
  {
    name: "airpods Pro",
    price: 12000,
    imageUrl: airpods,
    newItem: true,
  },
];

function HomePage() {
  const [shouldDisplay, setShoulDisplay] = useState(false);

  let list = [];

  list = products.map(({ name, price, imageUrl, flash, newItem, scale }) => {
    return (
      <Element
        price={price}
        name={name}
        image={imageUrl}
        flash={flash}
        newItem={newItem}
        scale={scale}
      />
    );
  });

  setTimeout(() => setShoulDisplay(true), 3000);
  return (
    <div className="min-w-screen flex min-h-screen flex-col items-center justify-center">
      <div className="flex w-full flex-col items-center justify-center ">
        <div className="sticky top-0 z-50 flex h-[10rem] w-full flex-col items-center justify-between bg-white">
          <div className="flex h-[4rem] w-full justify-center items-center px-4">
            <Icon height={"6rem"} width={"70%"} />
            <div className=" w-[3.2rem] h-[3rem] bg-gray-200 rounded-full">
              <UserSVG/>
            </div>
          </div>
          <div className="h-[7.5rem] w-full sm:w-[25rem]">
            <CategoriesSlider />
          </div>
        </div>
        <div className="flex w-full flex-wrap items-center justify-center">
          {...list}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
