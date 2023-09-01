import { getDefaultStore } from "jotai";
import { idGenerator } from "../../components/idGenerator";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import iphone from "../images/iphoneNoBg.png";
import Image from "next/image";
import StorageOptions from "../../components/storageOptions";
import ColorOptions from "../../components/colorOptions";
import Pieces from "../../components/Pieces";

function AddToCart() {
  let router = useRouter();

  const [colorState, setColorState] = useState("");
  const [storageState, setStorageState] = useState("");
  const [quantityState, setQuantityState] = useState(null);
  const [priceState, setPriceState] = useState(80);
  const [isDisabled, setIsDisabled] = useState(false);
  const [typeState, setTypeState] = useState("");

  useEffect(() => {
    setStorageState(sessionStorage.getItem("storage"));
    setColorState(sessionStorage.getItem("color"));
    setQuantityState(sessionStorage.getItem("number"));
    setTypeState(sessionStorage.getItem("type"));
  });

  function handleOnClick() {
    let newId = idGenerator();

    let trayJson = JSON.stringify({
      type: sessionStorage.getItem("type"),
      color: sessionStorage.getItem("color"),
      storage: sessionStorage.getItem("storage"),
      qty: sessionStorage.getItem("number"),
      id: newId,
      price: priceState,
      image: "",
    });

    sessionStorage.setItem(newId, trayJson);

    let idArray = JSON.parse(sessionStorage.getItem("ID_ARRAY"));

    let elementsArray = [];

    for (let key in idArray) {
      elementsArray.push(idArray[key]);
    }

    elementsArray.includes(newId) ? null : elementsArray.push(newId);

    sessionStorage.setItem("ID_ARRAY", JSON.stringify(elementsArray));

    setIsDisabled(true);

    router.push("/cart");
  }

  return (
    <div className="min-w-screen flex min-h-screen flex-col items-center justify-center overflow-x-hidden p-4">
      <div className="flex h-full w-full flex-col items-center justify-center  bg-white sm:w-[25rem]">
        <div className="relative h-[25rem]  w-full  rounded-2xl">
          <Image fill src={iphone} className="rounded-2xl object-cover" />
        </div>
        <div className="flex h-[30%]  w-full flex-col items-center justify-center">
          <div className="items-left  m-4 flex w-full flex-col justify-center rounded-lg bg-gray-100 p-4 font-bold text-gray-500">
            <div className="m-2 flex justify-center items-center text-[1.5rem] font-bold w-full">
              <div className="flex justify-center items-center">{typeState}</div>
            </div>

            <div className="m-2 flex items-center justify-between">
              <ColorOptions />
            </div>

            <div className="m-2 flex items-center justify-between">
              <div>Storage</div>

              <StorageOptions />
            </div>

            <div className="m-2 flex justify-between">
              <div>qty</div>
              <Pieces/>
            </div>
            <div className="flex h-[5rem] w-full items-center justify-center">
              <button
                onClick={handleOnClick}
                className=" w-full rounded-sm bg-[#ff0066] p-4 font-bold text-white disabled:opacity-75 sm:w-[18rem]"
                disabled={isDisabled}
              >
                add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddToCart;
