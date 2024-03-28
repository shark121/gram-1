// import iphone from "../../images/iphone-12-pro-cropped.png";
import { list } from "firebase/storage";
import iphone from "../../images/watchCropped.png";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Router, useRouter } from "next/router";
import { idGenerator } from "../../../components/Globalfunctions/idGenerator";
import { getDoc, collection, doc } from "firebase/firestore";
import { database } from "../../../firebaseConfig";

let watchItem = {
  price: "1200",
};

function addSelectiveStyle(elementType) {
  if (elementType === "type")
    return "font-bold text-[#ff0066] text-[1.3rem] flex items-center justify-center my-2";

  return "w-full h-[2rem] text-[1.2rem] text-gray-500 font-bold";
}

export default function AddNonCustom({ priceData }) {
  const [typeState, setTypeState] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [imageState, setImageState] = useState("");

  let router = useRouter();

  let collectedPriceData = priceData[0];

  console.log(collectedPriceData);

  useEffect(() => {
    setTypeState(sessionStorage.getItem("type"));
  }, []);

  let price = collectedPriceData[typeState];

  function addToIDArray(ID) {
    let ID_ARRAY = sessionStorage.getItem("ID_ARRAY");

    let arrayData = JSON.parse(ID_ARRAY) || [];

    arrayData.push(ID);

    ID_ARRAY = JSON.stringify(arrayData);

    sessionStorage.setItem("ID_ARRAY", ID_ARRAY);
  }

  useEffect(() => {
    if (!router.isReady) return;

    console.log(router.query);
     const imageCorrection = `${router.query.image}${router.query.token ? `&token=${router.query.token}` : ""}`;
    setImageState(imageCorrection);
    console.log(imageCorrection);   
  }, [router.isReady]);

  function addToSessionStorage(item, ID) {
    let itemString = JSON.stringify(item);

    sessionStorage.setItem(ID, itemString);
  }

  function handleOnClick() {
    let ID = idGenerator();
    let item = {
      type: typeState,
      price: price,
      id: ID,
      img: imageState,
      maximum: 4,
      qty:1
    };

    addToIDArray(ID);
    addToSessionStorage(item, ID);
    router.push("/cart");
    setIsDisabled(true);
  }

  return (
    <div className={` flex min-h-screen items-center justify-center `}>
      <div className="relative flex min-h-screen w-screen flex-col items-center justify-center sm:w-[30rem] landscape:h-[50vh]">
        <div className="relative box-border flex h-[50vh] w-full items-center justify-center bg-gray-100 px-3 sm:w-[35rem]">
          <Image src={imageState} fill className="object-contain" />
        </div>
        <div className=" landscape:[45vh] my-2 flex h-[49vh]  w-full flex-col items-start justify-start px-4 sm:px-0">
          <div className="my-2 flex w-full items-center justify-center text-[1.2rem] font-bold text-[#ff0066]">
            {typeState}
          </div>

          <div className="flex h-[2rem] w-full items-center justify-center text-[1.2rem] font-bold text-gray-500">
            ₵{price}
          </div>
          <button
            className="flex w-full items-center justify-center rounded-sm bg-gray-900 p-[0.7rem] font-bold text-white "
            onClick={handleOnClick}
            disabled={isDisabled}
          >
            buy
          </button>
        </div>
      </div>
    </div>
  );
}

// export async  function getStaticPaths() {

//   let collections = ["airpods","watches"]  


//   return {
//     fallback: true,
//     paths: [
//       {
//         params: {
//           addNonCustom: ["airpods", "AIRPODS PRO"],
//         },
//       },
//       {
//         params: {
//           addNonCustom: ["airpods", "AIRPODS MAX"],
//         },
//       },
//     ],
//   };
// }

export async function getServerSideProps(context) {
  let route = context.params.addNonCustom[0];
  let collectionType = context.params.addNonCustom[1];

  let collectionRef = collection(database, "prices");

  let documentRef = doc(collectionRef, route);

  console.log(route, collectionType)

  let priceData = [];
  await getDoc(documentRef).then((data) => {
    priceData.push(data.data());
  });

  return {
    props: {
      priceData: priceData,
    },
  };
}
