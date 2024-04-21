import Image from "next/image";
import { idGenerator } from "../Globalfunctions/idGenerator";
import { useRouter } from "next/router";
import { BsFillHandbagFill } from "react-icons/bs"
import {motion as m} from "framer-motion"

export default function Element({
  type,
  price,
  image,
  number,
  storage,
  color,

}) {
  let router = useRouter();
  

  
  function addToSessionStorage(itemObject, ID) {
    let ObjectString = JSON.stringify(itemObject);

    sessionStorage.setItem(ID, ObjectString);
  }

  function HandleOnClick() {


    let ID = idGenerator()

    let itemObject = {
      type: type,
      id: ID,
      img:image,
      maximum : number,
      storage,
      color,
      qty:1,
      price,
    };

    // addToID_ARRAY(ID);

    addToSessionStorage(itemObject, ID);

    router.push(`/addOther/addOther/?ID=${ID}`);
  }

  return (
    <button
      className=" relative my-4 sm:h-[20rem] h-[15rem] w-[10rem] sm:w-[10rem] rounded-md border-gray-500 p-2 "
      onClick={HandleOnClick}
    
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
            height: "100px",
            width: "auto"
          }}
        />
      </div>
      <div className="absolute left-0 bottom-0 z-10 w-[100px] h-[50px] text-ellipsis text-[0.8rem] sm:text-[0.9rem]">
      <div className="font-medium text-gray-600 w-full overflow-clip">{type}</div>
        <div className="font-bold text-[#ff0066]">₵{price}</div>
      </div>
    </button>
  );
}
