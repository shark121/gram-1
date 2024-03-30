import Link from "next/link";
import { useEffect, useState } from "react";
import Icon from "../images/svgImages/gram";
import CategoriesSlider from "../../components/ui/categoriesSlider";
import Element from "../../components/ui/Element";
import airpods from "../images/airpodsNoBg.png";
import iphone from "../images/iphone-12-pro-cropped.png";
// import UserSVG from "@/images/svgImages/userSVG";
import { Comfortaa } from "next/font/google";
import { getAuth } from "firebase/auth";
import { app } from "../../firebaseConfig";
import { SheetComponent } from "../../components/ui/sheet";
import useWindowDimensions from "../lib/hooks/useWindowDiamentions";
import {isMobile} from "../lib/utils/utils"

const comfortaa = Comfortaa({
  weight: "400",
  subsets: ["latin"],
});

let products = [
  {
    name: "airpods Pro",
    price: 1199.0,
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/gram-gadget.appspot.com/o/airpods-3rd-gen-nobg.png?alt=media&token=507260d1-996c-4cc7-be4e-3c2709174a5f&_gl=1*1pgxv45*_ga*MTQ4NzUxOTk5NC4xNjc5MTk3MjM4*_ga_CW55HF8NVT*MTY5NjcxNjY2MC4xNDguMS4xNjk2NzE2ODUwLjcuMC4w",
    initial: 1400,
  },
  {
    name: "series 3",
    price: 1200.0,
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/gram-gadget.appspot.com/o/daniel-korpai-hbTKIbuMmBI-unsplash.jpg?alt=media&token=cbf54c84-e231-457e-817e-c37024ecb3ba&_gl=1*16dfo48*_ga*MTQ4NzUxOTk5NC4xNjc5MTk3MjM4*_ga_CW55HF8NVT*MTY5NjY5NjcyMy4xNDYuMS4xNjk2Njk2NzM1LjQ4LjAuMA..",
    newItem: true,
  },
  {
    name: "iphone 11 Pro",
    price: 1200.0,
    imageUrl: iphone,
  },
  {
    name: "airpods Pro",
    price: 1200.0,
    imageUrl: airpods,
    initial: 3000,
  },
  {
    name: "airpods Pro",
    price: 1200.0,
    imageUrl: airpods,
  },
  {
    name: "airpods Pro",
    price: 1200.0,
    imageUrl: airpods,
  },
  {
    name: "airpods Pro",
    price: 1200.0,
    imageUrl: airpods,
  },
  {
    name: "airpods Pro",
    price: 1200.0,
    imageUrl: airpods,
  },
  {
    name: "airpods Pro",
    price: 1200.0,
    imageUrl: airpods,
  },
  {
    name: "airpods Pro",
    price: 1200.0,
    imageUrl: airpods,
  },
  {
    name: "airpods Pro",
    price: 1200.0,
    imageUrl: airpods,
  },
  {
    name: "airpods Pro",
    price: 1200.0,
    imageUrl: airpods,
  },
  {
    name: "airpods Pro",
    price: 1200.0,
    imageUrl: airpods,
  },
  {
    name: "airpods Pro",
    price: 1200.0,
    imageUrl: airpods,
  },
  {
    name: "airpods Pro",
    price: 1200.0,
    imageUrl: airpods,
  },
  {
    name: "airpods Pro",
    price: 1200.0,
    imageUrl: airpods,
  },
  {
    name: "airpods Pro",
    price: 1200.0,
    imageUrl: airpods,
  },
  {
    name: "airpods Pro",
    price: 1200.0,
    imageUrl: airpods,
  },
  {
    name: "airpods Pro",
    price: 1200.0,
    imageUrl: airpods,
  },
  {
    name: "airpods Pro",
    price: 1200.0,
    imageUrl: airpods,
  },
  {
    name: "airpods Pro",
    price: 1200.0,
    imageUrl: airpods,
  },
  {
    name: "airpods Pro",
    price: 1200.0,
    imageUrl: airpods,
    newItem: true,
  },
];


function HomePage() {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  console.log(width, "width");
  let list = [];

  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    console.log(width, "width");
  }, [width]);

  list = products.map((element, i) => {
    return (
      <Element
        price={element.price}
        name={element.name}
        image={element.imageUrl}
        initial={element.initial}
        newItem={element.newItem}
        scale={element.scale}
        key={i}
      />
    );
  });

  return (
    <main className={`flex items-center justify-center `}>
      <div className="flex w-full flex-col items-center justify-center ">
        <div className="sticky top-0 z-50 flex h-[6rem] w-full flex-col items-center justify-between bg-white">
          <div className="flex h-[2.5rem] w-full items-center justify-between px-4 py-2">
            <SheetComponent />
            <Icon height={"7rem"} width={"8rem"} />
            <div className="h-[10rem]l  flex w-[5rem] items-center justify-between">
              <Link
                href={"/userPage"}
                className=" hidden h-[2rem] w-[2.2rem] items-center justify-center rounded-full bg-gray-200"
              >
                {/* <UserSVG height={"2rem"} /> */}
              </Link>
              <div className="hidden h-[3rem] w-[3rem] bg-red-400"></div>
            </div>
          </div>
          <div className="h-[2.5rem] w-full sm:w-[25rem]">
            <CategoriesSlider />
          </div>
        </div>
        <div className="flex w-full flex-wrap items-center justify-center">
          {...list}
        </div>
      </div>
    </main>
  );
}

export default HomePage;
