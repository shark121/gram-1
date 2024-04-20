import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react"
import CarouselComponent from "./ui/carouselComponent";

let menuItems = [
  {
    name: "airpods",
    collection: "airpods",
  },
  {
    name: "iphone",
    collection: "phones",
  },
  {
    name: "watches",
    collection: "watches",
  },
  {
    name: "accessories",
    collection: "accessories",
  },
];

// import required modules

export default function CategoriesSlider({}) {
const router = useRouter();
function handleOnClick(collectionType) {
  router.push(`./${collectionType}`);
  sessionStorage.setItem("collection", collectionType);
}

function MenuElement({ name, collection }) {
  return (
    <button
      className="mx-2 flex h-[2rem] items-center justify-center rounded-[1rem] bg-gray-100 px-4 py-2 font-medium text-gray-600"
      onClick={() => handleOnClick(collection)}
    >
      {name}
    </button>
  );
}

  const newList = menuItems.map((props) => <MenuElement {...props} />);

  // return <div className="flex h-full w-full">{newList}</div>;
  return <CarouselComponent elements={newList} />;
}
