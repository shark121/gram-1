import { useEffect, useState } from "react";
import { atom, useAtom, getDefaultStore } from "jotai";

export const quantityAtom = atom(1);

const defaultStore = getDefaultStore()

function Pieces({max}) {


  const [defaultValue, setDefaultValue] = useState(1);

  function changeDefaltValue(step) {
    if (defaultValue == 1 && step < 0) return;

    if (defaultValue == max && step > 0) return;

    setDefaultValue((defaultValue) => Number(defaultValue) + step || 1);
  }

 

  useEffect(() => {
    defaultStore.set(quantityAtom, defaultValue);

    sessionStorage.setItem("number",JSON.parse(defaultValue))

    console.log(defaultValue)
  }, [defaultValue]);

  return (
    <div className="flex h-full flex-col items-center  justify-center ">
      <div className="flex h-full w-full flex-col items-center justify-center">
        <button
          className=" p-4 text-[1.5rem] "
          onClick={() => changeDefaltValue(1)}
        >
          +
        </button>
        <div className="h-[2rem] w-[2rem] bg-[#ff0066] text-white rounded-full font-bold flex items-center justify-center">
         {defaultValue}  
        </div>
        <button
          className=" p-4 text-[1.5rem] "
          onClick={() => changeDefaltValue(-1)}
        >
          -
        </button>

      </div>
    </div>
  );
}

export default Pieces;
