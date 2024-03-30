import { idGenerator } from "../utils/Globalfunctions/idGenerator";
import { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/router";
import iphone from "../../images/iphoneBgBlack.jpg";
import Image from "next/image";
import { database } from "../../../firebaseConfig";
import Customize from "../../../components/ui/customize";
import { collection, doc, getDoc } from "firebase/firestore";

const collectionRef = collection(database, "phones");
const colorData = [
  { id: 2, color: "bg-[rgb(52,59,67)]", name: "black" },
  { id: 3, color: "bg-[rgb(108,118,137)]", name: "ash" },
  { id: 4, color: "bg-[rgb(183,110,121)]", name: "RoseGold" },
  { id: 5, color: "bg-[rgb(251,18,48)]", name: "red" },
  { id: 6, color: "bg-[rgb(80,200,120)]", name: "Green" },
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

  const [imageState, setImageState] = useState(router.query.image);
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

  useEffect(() => {
    if (!router.isReady) return;
    
    let imageUrl = router.query.image
    setImageState(imageUrl);
    console.log(imageUrl,"done here")
  }, [router.isReady]);


  function checkAvailable() {
    useEffect(() => {
      createObjectsWithData();
      console.log(storageState);
    }, [storageState]);
  }

  useEffect(()=>{
     console.log(imageState) 
  },[imageState])

  checkAvailable();

  function handleOnClick() {
    let newId = idGenerator();
    let itemType = sessionStorage.getItem("type");
    let itemColor = sessionStorage.getItem("color");
    let itemStorage = sessionStorage.getItem("storage");
    let trimmedStorage = itemStorage.slice(0, 3).trim();
    let maximum = itemData[0][trimmedStorage][itemColor];
    let image = sessionStorage.getItem("img");


    let trayJson = JSON.stringify({
      type: (itemType+`(${trimmedStorage})`),
      color: itemColor,
      storage: itemStorage,
      id: newId,
      maximum: maximum,
      img: image,
      qty:1
    });

    sessionStorage.setItem(newId, trayJson);

    let idArray = JSON.parse(sessionStorage.getItem("ID_ARRAY")) || [];

    idArray.push(newId);


    sessionStorage.setItem("ID_ARRAY", JSON.stringify(idArray));

    setIsDisabled(true);

    router.push("/cart");
  }

  return (
    
      <div className={` flex min-h-screen items-center justify-center `}>
        <div className="relative flex min-h-screen w-screen flex-col items-center justify-center sm:w-[30rem] landscape:h-[50vh]">
          <div className="relative box-border flex h-[50vh] w-full items-center justify-center bg-gray-100 px-3 sm:w-[35rem]">
            <Image
              src={imageState}
              fill
              className="absolute left-2 right-2 rounded-b-[2rem] object-contain"
            />
          </div>
          <div className=" landscape:[50vh] flex h-[49vh]  w-full items-start justify-center">
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
  );
}

export default AddToCart;

export async function getStaticPaths() {
  return {
    fallback: true,
    paths: [
      {
        params: {
          addToCart: "iPhone X",
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

  console.log(collectedData);
  return {
    props: {
      itemData: collectedData,
    },
  };
}
