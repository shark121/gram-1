import { getDefaultStore } from "jotai";
import { idGenerator } from "../../../components/idGenerator";
import { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/router";
import iphone from "../../images/iphoneBgBlack.jpg";
import Image from "next/image";
import { database } from "../../../firebaseConfig";
import Icon from "@/images/svgImages/gram";

import Customize from "../../../components/customize";

import {
  collection,
  doc,
  getDoc,
} from "firebase/firestore";
import Loading from "../loading";


const collectionRef = collection(database, "phoneItems");
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

  const router = useRouter();

  let availableStorge = Object.keys(itemData[0]);

  let storageArray = availableStorge.map((element, i) => ({
    id: i,
    name: element + " GB",
  }));

  const [storageState, setStorageState] = useState(storageArray[0]);

  let currentStorage = storageState.name.slice(0, 3).trim();

  let getAvailableColors = Object.keys(itemData[0][currentStorage]);

  let availableColors = [];

  for (let element of colorData) {
    if (getAvailableColors.includes(element.name)) {
      availableColors.push(element);
    }
  }

  const [colorState, setColorState] = useState(availableColors[0].name);
  const [isDisabled, setIsDisabled] = useState(false);
  const [typeState, setTypeState] = useState("");
  const [storageArraysState, setStorageArrayState] = useState(storageArray);

  function createObjectsWithData() {
    setStorageArrayState(storageArray);

    let currentStorage = storageState.name.slice(0, 3).trim();

    let getAvailableColors = Object.keys(itemData[0][currentStorage]);

    let availableColors = [];

    for (let element of colorData) {
      if (getAvailableColors.includes(element.name)) {
        availableColors.push(element);
      }
    }

    setColorState(availableColors[0]);
  }

  useEffect(() => {
    setTypeState(sessionStorage.getItem("type"));
  }, []);
  
  function checkAvailable() {
    useEffect(() => {
      createObjectsWithData();
      console.log(storageState)
    }, [storageState]);
  }
  
  checkAvailable();
  
  function handleOnClick() {
    
    let newId = idGenerator();
    // document.documentElement.requestFullscreen()

    let itemType = sessionStorage.getItem("type")
    let itemColor = sessionStorage.getItem("color")
    let itemStorage =  sessionStorage.getItem("storage")
    let trimmedStorage = itemStorage.slice(0,3).trim()
    let maximum = itemData[0][trimmedStorage][itemColor]
   

    let trayJson = JSON.stringify({
      type: itemType,
      color: itemColor,
      storage: itemStorage,
      id: newId,
      maximum: maximum,
      
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
    <Suspense fallback={<Loading/>}>

    <div 
    className={` min-h-screen flex items-center justify-center `}
    >
      <div className="flex min-h-screen w-screen sm:w-[30rem] flex-col items-center justify-center relative landscape:h-[50vh]">

        <div className="relative flex h-[50vh] bg-gray-100 box-border w-full sm:w-[35rem] items-center justify-center px-3">
          <Image
            src={iphone}
            fill
            className="object-cover hidden absolute rounded-b-[2rem] left-2 right-2"
            />
        </div>
        <div className=" h-[49vh] landscape:[50vh] w-full  flex items-start justify-center">
          <Customize
            storageData={storageArraysState}
            colorData={availableColors}
            setStorageState={setStorageState}
            setColorState={setColorState}
            storageState={storageState}
            colorState={colorState}
            handleOnClick={handleOnClick}
            isDisabled={isDisabled}
            typeState={typeState}
            />
        </div>
      </div>
    </div>
</Suspense>
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
    collectedData.push(data.data());
  });


  console.log(collectedData)
  return {
    props: {
      itemData: collectedData,
    },
  };
}
