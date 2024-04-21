import { idGenerator } from "../../../components/Globalfunctions/idGenerator";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ColorsAndCodes } from "../../lib/definitions";
import iphone from "../../images/iphoneBgBlack.jpg";
import Image from "next/image";
import { database } from "../../../firebaseConfig";

import Customize from "../../../components/customize";

import { collection, doc, getDoc, getDocs } from "firebase/firestore";

export type ColorType = { id: number; color: string; name: string };

const collectionRef = collection(database, "phones");

const colorData: ColorType[] = Object.keys(ColorsAndCodes).map((el, id) => {
  return { id: id, color: `bg-[${ColorsAndCodes[el]}]`, name: el };
});

function AddToCart({ itemData }) {
  const router = useRouter();

  const firestElement = itemData && itemData[0];

  const [itemDataState, setItemDataState] = useState(itemData);

  let availableStorage = itemDataState && Object.keys(firestElement);

  // console.log(firestElement);
  // return

  let storageArray =
    availableStorage &&
    availableStorage.map((element: string, i: number) => ({
      id: i,
      name: element + " GB",
    }));

  const firstStorage = storageArray && storageArray[0];

  const [storageState, setStorageState] = useState(firstStorage);

  let currentStorage = storageState && storageState.name.slice(0, 3).trim();

  let getAvailableColors: string[] =
    itemDataState && Object.keys(itemDataState[0][currentStorage]);

  let availableColors: ColorType[] = [];

  for (let element of colorData) {
    if (getAvailableColors && getAvailableColors.includes(element.name)) {
      availableColors.push(element);
    }
  }

  const [imageState, setImageState] = useState<string>(
    router.query.image as string
  );
  const [colorState, setColorState] = useState(
    availableColors.length > 1 ? availableColors[0] : null
  );
  const [isDisabled, setIsDisabled] = useState(false);
  const [typeState, setTypeState] = useState<string | null>();
  const [storageArraysState, setStorageArrayState] = useState(storageArray);

  function createObjectsWithData() {
    setStorageArrayState(storageArray);

    let currentStorage = storageState && storageState.name.slice(0, 3).trim();

    let getAvailableColors: string[] =
      itemDataState && Object.keys(itemDataState[0][currentStorage]);

    let availableColors: ColorType[] = [];

    for (let element of colorData) {
      if (getAvailableColors && getAvailableColors.includes(element.name)) {
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

    let imageUrl = router.query.image;
    setImageState(imageUrl as string);
    console.log(imageUrl, "done here");
  }, [router.isReady]);

  useEffect(() => {
    createObjectsWithData();
    console.log(storageState);
  }, [storageState]);

  function handleOnClick() {
    let newId = idGenerator();
    let itemType = sessionStorage.getItem("type");
    let itemColor = sessionStorage.getItem("color");
    let itemStorage = sessionStorage.getItem("storage");
    let trimmedStorage = itemStorage && itemStorage.slice(0, 3).trim();
    let maximum =
      itemDataState[0][trimmedStorage as string][itemColor as string];
    let image = sessionStorage.getItem("img");

    let trayJson = JSON.stringify({
      type: itemType + `(${trimmedStorage})`,
      color: itemColor,
      storage: itemStorage,
      id: newId,
      maximum: maximum,
      img: image,
      qty: 1,
    });

    sessionStorage.setItem(newId, trayJson);

    let getIdArray = sessionStorage.getItem("ID_ARRAY");

    let parsedIdArray = (getIdArray && JSON.parse(getIdArray)) || [];

    parsedIdArray.push(newId);

    sessionStorage.setItem("ID_ARRAY", JSON.stringify(parsedIdArray));

    setIsDisabled(true);

    router.push("/cart");
  }

  return (
    <div className={` flex min-h-screen items-center justify-center `}>
      <div className=" flex min-h-screen w-screen flex-col items-center justify-center sm:w-[30rem] landscape:h-[50vh]">
        <div className="relative box-border flex h-[50vh] w-full items-center justify-center bg-gray-100 px-3 sm:w-[35rem]">
          <Image
            alt={"item Image"}
            height={100}
            width={100}
            src={imageState}
            style={{
              height: "300px",
              width: "auto",
            }}
            className="absolute inset-x-[20%] inset-y-[20%] rounded-b-[2rem] object-contain  sm:inset-x-[35%] sm:top-0"
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
  const getPaths = await getDocs(collectionRef).then((data) => data.docs.map((doc) => doc.id));

  const createPaths = getPaths.map((path) => {
    return {
      params: {
        addToCart: path,
      },
    };
  });


  return {
    fallback: true,
    // paths: [
    //   {
    //     params: {
    //       addToCart: "iPhone 12",
    //     },
    //   },
    // ],
    paths : createPaths
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
