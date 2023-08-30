import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import iphone from "../images/iphone.jpg";
import Link from "next/link";
import { useRouter } from "next/router";

const tax = 0;

function addIndividualStyle(name) {
  if (name === "type") {
    return "font-bold text-[#Ff0066] text-[1rem]";
  } else {
    return "text-[0.9rem]";
  }
}

  function Cart() {
    const router = useRouter();

    const [phonesDataState, setPhonesDataState] = useState([]);
    const [pricesState, setPricesState] = useState(0);
   
    

    useEffect(() => {
    let price = 0;
    
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
      CART_DATA.push(currentElement);
      price = price + currentElement.price*currentElement.qty;
      setPricesState(price);
    }
    
    setPhonesDataState(CART_DATA);
  }, []);



  function handleOnClick(){
    router.push("/OrderPage")
  }
  
  function DropCardDivision({ name, info }) {
    let shouldExclude = ["price", "id"];

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

    for (let key in data) {
      list.push(<DropCardDivision name={key} info={data[key]} key={key} />);
    }
    return (
      <div className=" m-4 text-gray-400">
        <div className=" ring- flex min-h-[5rem] w-full items-center justify-center p-4 text-left text-[0.9rem] ">
          <div className="relative flex h-[7rem] w-[10rem] justify-between ">
            <Image
              src={iphone}
              fill
              className="my-4 rounded-2xl object-cover"
              alt={"phone image"}
            />
          </div>
          <div className="w-full p-4">{...list}</div>
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
          <div className="justify-between flex">
            <div>subtotal</div>
            <div>{pricesState}</div>
          </div>

          <div  className="justify-between flex">
            <div>tax</div>
            <div>{tax}</div>
          </div>
        </div>
        <button className="  justify-self-end m-4 bg-[#ff0066] p-4 text-white w-[18rem] sm:w-full font-semibold"
        onClick={handleOnClick}
        >place order</button>
      </div>
    </div>
  );
}

export default Cart;
