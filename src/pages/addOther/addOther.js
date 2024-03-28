// import iphone from "../../images/iphone-12-pro-cropped.png";
import { list } from "firebase/storage";
import iphone from "../../images/watchCropped.png";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { useAmp } from "next/amp";


function addSelectiveStyle(elementType) {
  if (elementType === "type")
    return "font-bold text-[#ff0066] text-[1.3rem] flex items-center justify-center my-2";

  return "w-full h-[2rem] text-[1.2rem] text-gray-800 font-bold";
}

export default function AddNonCustom() {
  const router = useRouter();

  const [itemID, setItemID] = useState();
  const [itemDataState, setItemDataState] = useState();
  const [parsedJsonState, setParsedJsonState] = useState();
  const [imageState, setImageState] = useState("");
  const [keysState, setKeysState] = useState([]);

  useEffect(() => {
    if (!router.isReady) return;

    console.log("ready", router.query.ID);

    let itemData = sessionStorage.getItem(router.query.ID);

    setItemDataState(itemData);
  }, [router.isReady]);


  function addToID_ARRAY(ID) {
    let ID_ARRAY = JSON.parse(sessionStorage.getItem("ID_ARRAY")) || [];

    ID_ARRAY.push(ID);

    ID_ARRAY = JSON.stringify(ID_ARRAY);

    sessionStorage.setItem("ID_ARRAY", ID_ARRAY);
  }

  function handleOnClick(id){

    addToID_ARRAY(parsedJsonState.id)

    router.push("/cart")


  }

  useEffect(() => {
    if (itemDataState) {
      let parsedItemData = JSON.parse(itemDataState);

      setParsedJsonState(parsedItemData);

      setImageState(parsedItemData.img)

      setKeysState(Object.keys(parsedItemData));
      console.log(parsedItemData);
    }
  }, [itemDataState]);

  // Object.keys(itemDataState);

  let list = keysState.map((key, i) => {
    let shouldNotDisplay = ["id", "", "img"];

    let dispKey = shouldNotDisplay.includes(key) ? "" : key;
    return (
      <div className={` ${addSelectiveStyle(key)} `} key={i}>
        {" "}
        {parsedJsonState[dispKey]}
      </div>
    );
  });

  return (
    <div className={` flex min-h-screen items-center justify-center `}>
      <div className="relative flex min-h-screen w-screen flex-col items-center justify-center sm:w-[30rem] landscape:h-[50vh]">
        <div className="relative box-border flex h-[50vh] w-full items-center justify-center bg-gray-100 px-3 sm:w-[35rem]">
          <Image
            src={imageState}
            fill
            className="object-contain"
            alt={"product image"}
          />
        </div>
        <div className=" landscape:[45vh] my-2 flex h-[49vh]  w-full flex-col items-start justify-start px-4 sm:px-0">
          <div className="w-full">{...list}</div>
          <button className="flex w-full items-center justify-center rounded-sm bg-gray-900 p-[0.7rem] font-bold text-white "
          onClick={handleOnClick}
          >
            buy
          </button>
        </div>
      </div>
    </div>
  );
}
