import { collection } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Cart from "../src/images/svgImages/cart";
import { use, useEffect } from "react";
import { useState } from "react";

function MapList({ image, itemName, price }) {
  let customizable = ["laptops", "phones"];

  let router = useRouter();

  function navigateToNext() {
    let itemCollection = sessionStorage.getItem("collection");

    const imageString = String(image);

    sessionStorage.setItem("img", imageString);

    if (customizable.includes(itemCollection)) {
      router.push(`./addToCart/${itemName}?image=${imageString}`);
    } else {
      router.push(
        `./addNonCustom/${itemCollection}/${itemName}?image=${imageString}`
      );
    }

    sessionStorage.setItem("type", itemName);
  }

  return (
    <button
    className=" relative my-4 sm:h-[20rem] h-[15rem] w-[10rem] sm:w-[10rem] rounded-md border-gray-500 p-2 "
    onClick={()=>navigateToNext()}
  
  >
    <div className="relative flex h-full w-full items-center justify-center">
      {/* <div className="h-[2.5rem] w-[2.5rem] rounded-full bg-gray-900 absolute top-3 right-3 flex items-center justify-center z-20">
     <BsFillHandbagFill className="text-white"/>
      </div> */}
      <Image
        height={120}
        width={120}
        alt="phone"
        className={``}
        src={image}
        style={{
          height: "120px",
          width: "auto"
        }}
      />
    </div>
    <div className="absolute left-0 bottom-0 z-10 w-[100px] h-[50px] text-ellipsis text-[0.9rem] sm:text-[0.9rem]">
    <div className="font-medium text-gray-600 w-full overflow-clip">{itemName}</div>
      {/* <div className="font-bold text-[#ff0066]">₵{price}</div> */}
    </div>
  </button>
  );
}

function Menu({ menuItems, menuType }) {
  let router = useRouter();
  const collectionType = router.query.ListedItems;
  console.log(collectionType);

  let list = menuItems.map((item) => {
    console.log(item)
    
    const image = Object.values(item)[0];
    const nameID = Object.keys(item)[0];

    console.log(image, nameID);
    return (
      <MapList
        image={image}
        itemName={nameID}
        key={nameID}
        menuType={menuType}
      />
    );
  });

  return (
    <div className="relative flex w-full flex-wrap items-center justify-center rounded-xl pt-10 transition-all duration-150">
      <div className=" absolute top-0 h-[2rem] font-semibold ">
        {collectionType}
      </div>
      <div className="absolute -top-1 right-0 h-[2rem] w-[2rem] ">
        {<Cart />}
      </div>
      <div className="flex flex-wrap justify-between h-full gap-1">{...list}</div>
    </div>
  );
}

export default Menu;
