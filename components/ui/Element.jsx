import Image from "next/image";
import { idGenerator } from "../Globalfunctions/idGenerator";
import { useRouter } from "next/router";

export default function Element({
  name,
  price,
  image,
  initial,
  newItem,
  scale,
  
}) {
  let router = useRouter();
  



  function addToSessionStorage(itemObject, ID) {
    let ObjectString = JSON.stringify(itemObject);

    sessionStorage.setItem(ID, ObjectString);
  }

  function HandleOnClick() {


    let ID = idGenerator()

    let itemObject = {
      type: name,
      id: ID,
      price:price,
      img:image,
      maximum : 1,
      qty:1
    };

    // addToID_ARRAY(ID);

    addToSessionStorage(itemObject, ID);

    router.push(`/addOther/addOther/?ID=${ID}`);
  }

  return (
    <button
      className=" relative my-4 sm:h-[20rem] h-[15rem] w-[15rem] sm:w-[10rem] rounded-md border-gray-500 p-2 "
      onClick={HandleOnClick}
    
    >
      <div className="relative flex h-full w-full items-center justify-center">
        <Image
          fill
          alt="phone"
          className={`object-contain scale-[${scale}] `}
          src={image}
        />
      </div>
      <div className="absolute left-0 bottom-0 z-10">
      <div className="font-medium text-gray-600">{name}</div>
        <div className="font-bold text-[#ff0066]">₵{price}</div>
      </div>
    </button>
  );
}
