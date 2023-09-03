import { getDefaultStore } from "jotai";
import { idGenerator } from "../../../components/idGenerator";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import iphone from "../../images/iphoneNoBg.png";
import Image from "next/image";
import StorageOptions from "../../../components/storageOptions";
import ColorOptions from "../../../components/colorOptions";
import Pieces from "../../../components/Pieces";
import { database } from "../../../firebaseConfig";
import {
  collection,
  doc,
  setDoc,
  getDoc,
  where,
  query,
  getDocs,
} from "firebase/firestore";

const max = 0;

const collectionRef = collection(database, "phoneItems");

export const storageData = [
  { id: 1, name: "256 GB" },
  { id: 2, name: "128 GB" },
  { id: 3, name: "64  GB" },
  { id: 4, name: "32  GB" },
  { id: 5, name: "16  GB" },
];

const colorData = [
  { id: 2, color: "bg-[rgb(52,59,67)]", name: "black" },
  { id: 3, color: "bg-[rgb(108,118,137)]", name: "ash" },
  { id: 4, color: "bg-[rgb(183,110,121)]", name: "RoseGold" },
  { id: 5, color: "bg-[rgb(251,18,48)]", name: "red" },
  { id: 6, color: "bg-[rgb(80,200,120)]", name: "green" },
  { id: 7, color: "bg-[rgb(255,255,255)]", name: "Starlight" },
  { id: 8, color: "bg-[rgb(229,221,255)]", name: "blue" },
];

function AddToCart({ itemData }) {

  console.log(itemData)
  const router = useRouter();

  let availableStorge = Object.keys(itemData[0]);

  let storageArray = availableStorge.map((element, i) => ({
    id: i,
    name: element + " GB",
  }));

  const [storageState, setStorageState] = useState(storageArray[0]);
  
  let currentStorage = storageState.name.slice(0,3).trim()
  
  let getAvailableColors = Object.keys(itemData[0][currentStorage]);
  
  let availableColors=[]
  
  for (let element of colorData) {
    if (getAvailableColors.includes(element.name)) {
      availableColors.push(element)
    }
  }
  
  const [colorState, setColorState] = useState(availableColors[0]);
  const [quantityState, setQuantityState] = useState(null);
  const [priceState, setPriceState] = useState(80);
  const [isDisabled, setIsDisabled] = useState(false);
  const [typeState, setTypeState] = useState("");
  const [storageArraysState, setStorageArrayState] = useState(storageArray);
  const [colorDataState, setColorDataState] =  useState([])

  function createObjectsWithData() {

    setStorageArrayState(storageArray);

    let currentStorage = storageState.name.slice(0,3).trim()

    let getAvailableColors = Object.keys(itemData[0][currentStorage]);
     
    let availableColors=[]

    for (let element of colorData) {
      if (getAvailableColors.includes(element.name)) {
        availableColors.push(element)
      }
    }
    
    setColorState(availableColors[0])
    
  }

  useEffect(() => {
    setTypeState(sessionStorage.getItem("type"));
  }, []);

  function checkAvailable() {
    useEffect(() => {
      createObjectsWithData();
    },[storageState]);
  }

  function fecthMaximum(){

  }

  checkAvailable()

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
    <div className="min-w-screen flex min-h-screen flex-col items-center justify-center overflow-x-hidden py-4">
      <div className="flex h-full w-full flex-col items-center justify-center  bg-white sm:w-[34rem]">
        <div className="relative h-[25rem]  w-full  rounded-2xl">
          <Image fill src={iphone} className="rounded-2xl object-cover" />
        </div>
        <div className="flex h-[30%]  w-full flex-col items-center justify-center">
          <div className="items-left  m-4 flex w-full flex-col justify-center rounded-lg bg-gray-100 p-4 font-bold text-gray-500">
            <div className="m-2 flex w-full items-center justify-center text-[1.5rem] font-bold">
              <div className="flex items-center justify-center">
                {typeState}
              </div>
            </div>
            <div className="m-2 flex items-center justify-between">
              <div>Storage</div>

              <StorageOptions
                storage={storageState}
                storageData={storageArraysState}
                setStorage={setStorageState}
              />
            </div>

            <div className="m-2 flex items-center justify-between">
              <ColorOptions
                color={colorState}
                colorData={availableColors}
                setColor={setColorState}
              />
            </div>


            <div className="m-2 flex justify-between">
              <div>qty</div>
              <Pieces max={max} />
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

export async function getStaticPaths() {
  return {
    fallback: true,
    paths: [
      {
        params: {
          addToCart: "I PHONE X",
        },
      },
    ],
  };
}

export async function getStaticProps(context) {
  let collectedData = [];

  let itemRoute = context.params.addToCart;

  const docRef = doc(collectionRef, itemRoute);

  await getDoc(docRef).then((data) => {
    // console.log(data.id);
    collectedData.push(data.data());
  });

  return {
    props: {
      itemData: collectedData,
    },
  };
}
