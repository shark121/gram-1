import airpods from "../images/airpodsNoBg.png";
import Image from "next/image";
import watch from "../images/watchCropped.png";
import iphone from "../images/iphone-12-pro-cropped.png";
import NavBar from "../../components/NavBar";
import Element from "../../components/Element";

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
    scale : 1.5
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

export default function ExplorePage() {
  let list = [];



  list = products.map(({ name, price, imageUrl, flash, newItem, scale }) => {
    return (
      <Element
        price={price}
        name={name}
        image={imageUrl}
        flash={flash}
        newItem={newItem }
        scale={scale}
      />
    );
  });

  return (
    <div className="min-w-screen h-screen ">

      <div className="flex h-full w-full flex-wrap items-center justify-center gap-x-2 gap-y-1 p-4">
        {...list}
      </div>
    </div>
  );
}
