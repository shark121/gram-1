import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import iphone from "../images/iphone.jpg";
import Link from "next/link";
import { useRouter } from "next/router";
import { database, app } from "../../firebaseConfig";
import { getDoc, collection, doc, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import Pieces from "../../components/Pieces";
import DeleteIcon from "@/images/svgImages/deleteIcon";

const tax = 0;

function addIndividualStyle(name) {
  if (name === "type") {
    return "font-bold text-[#Ff0066] text-[1rem]";
  } else {
    return "text-[0.9rem]";
  }
}

function Cart({ pricesObject }) {
  let priceData = pricesObject;

  const router = useRouter();

  const [phonesDataState, setPhonesDataState] = useState([]);
  const [pricesState, setPricesState] = useState(0);
  const auth = getAuth();

  useEffect(() => {
    let priceTotal = 0;

    let CART_DATA = [];

    let ID_LIST = [];

    let collectedIds = JSON.parse(sessionStorage.getItem("ID_ARRAY"));

    for (let key in collectedIds) {
      ID_LIST.push(collectedIds[key]);
    }

    for (let key in collectedIds) {
      let currentElement = JSON.parse(
        sessionStorage.getItem(collectedIds[key])
      );

      let getType = currentElement.type;
      let getPrice = priceData[getType];

      currentElement.price = getPrice;

      CART_DATA.push(currentElement);

      // console.log(CART_DATA);
      priceTotal = priceTotal + currentElement.price * currentElement.qty;
      setPricesState(priceTotal);
    }

    setPhonesDataState(CART_DATA);
  }, []);

  function handleOnClick() {
    router.push("/OrderPage");
  }



  function updateSessionStorage(id){
    
    sessionStorage.removeItem(id)
  
    let idArray = JSON.parse(sessionStorage.getItem("ID_ARRAY"))
   
    idArray = idArray.filter((idElement)=>{
       idElement != id
    })  

    let idArrayParsedToString = JSON.stringify(idArray)

    sessionStorage.setItem("ID_ARRAY",idArrayParsedToString)

    console.log(idArray)
  }

  function handleDelete(id) {

    let currentPhonesDataState = phonesDataState
    
    updateSessionStorage(id)

    console.log(currentPhonesDataState)
       
    currentPhonesDataState = currentPhonesDataState.filter((element)=>element.id != id)
     
    setPhonesDataState(currentPhonesDataState)
     console.log(currentPhonesDataState)


  }

  function DropCardDivision({ name, info }) {
    let shouldExclude = ["price", "id", "maximum"];

    // console.log(name,info)
    return shouldExclude.includes(name) ? (
      " "
    ) : (
      <div className="h-[1rem] w-full text-lg ">
        <div
          className={`m-2 text-left text-[0.9rem]  ${addIndividualStyle(
            name
          )} `}
        >
          {info}
        </div>
      </div>
    );
  }

  function DropCard({ data }) {
    let list = [];
    let maximum = data.maximum;
    let id =  data.id

    for (let key in data) {
      list.push(<DropCardDivision name={key} info={data[key]} key={key} />);
    }
    return (
      <div className=" m-4 text-gray-400">
        <div className="flex min-h-[5rem] w-full items-center justify-center p-4 text-left text-[0.9rem] ">
          <div className="relative flex h-[7rem] w-[10rem] justify-between ">
            <Image
              src={iphone}
              fill
              className=" rounded-2xl object-cover"
              alt={"phone image"}
            />
          </div>
          <div className="flex h-full w-full  items-center justify-center">
            <div className="h-full w-[70%] p-4">
              {...list}
              <button className="ml-1 h-[1.8rem] w-[1.8rem]"
              onClick={()=>handleDelete(id)}
              >
                <DeleteIcon  />
              </button>
            </div>
            <div className="flex h-[100%]  w-[30%] flex-col items-center justify-center ">
              <Pieces max={maximum} />{" "}
            </div>
          </div>
        </div>
        <div className="text-right font-extrabold text-[#Ff0066]">
          ₵{data.price}
        </div>
      </div>
    );
  }

  let list = phonesDataState.map((element, key) => {
    return <DropCard data={element} key={key} />;
  });

  return (
    <div className="min-w-screen flex min-h-screen items-center justify-center bg-[#] py-4">
      <div className="relative flex min-h-screen w-screen flex-col items-center md:w-[30rem] md:rounded-2xl">
        <div className="my-4 flex h-[7rem] w-full flex-col items-center justify-center px-4">
          <div className="h-[4rem] w-full text-[2.1rem] text-gray-500">
            {"Cart."}
          </div>
          <button
            className="flex h-[2rem] w-full items-center gap-10 text-[1.5rem] text-gray-400"
            onClick={() => router.push("/")}
          >
            <div className="pointer flex h-[3rem] w-[3rem] items-center justify-center rounded-full bg-gray-200 text-[2rem] text-gray-400">
              +
            </div>
          </button>
        </div>
        <div className=" items-left flex min-h-[50vh] w-full flex-col justify-center rounded-xl bg-white">
          {...list}
        </div>
        <div className="items-left flex h-[6rem] w-[18rem] flex-col justify-center rounded-lg bg-gray-200 p-4 font-bold text-gray-500 sm:w-full">
          <div className="flex justify-between">
            <div>subtotal</div>
            <div>{pricesState}</div>
          </div>

          <div className="flex justify-between">
            <div>tax</div>
            <div>{tax}</div>
          </div>
        </div>
        <button
          className="  m-4 w-[18rem] justify-self-end bg-[#ff0066] p-4 font-semibold text-white sm:w-full"
          onClick={handleOnClick}
        >
          place order
        </button>
      </div>
    </div>
  );
}

export default Cart;

export async function getStaticProps() {
  const collectionRef = collection(database, "prices");

  let dataArray = [];

  await getDocs(collectionRef).then((data) => {
    data.docs.forEach((element) => dataArray.push(element.data()));
  });

  let pricesObject = {};

  for (let object of dataArray) {
    Object.assign(pricesObject, object);
  }

  console.log(pricesObject);

  return {
    props: {
      pricesObject: pricesObject,
    },
  };
}
