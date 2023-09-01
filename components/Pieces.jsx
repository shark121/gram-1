import { useEffect, useState } from "react";
import { atom, useAtom, getDefaultStore } from "jotai";
import ColorSlider from "./ColorSlider";
import Link from "next/link";
import { colorAtom } from "./ColorPage";
import { typeAtom } from "./Menu";
import { storageAtom } from "./StorageSlider";
import { idGenerator } from "./idGenerator";

export const quantityAtom = atom(1);

const defaultStore = getDefaultStore()

function Pieces() {
  let max = 99;

  const [defaultValue, setDefaultValue] = useState(1);

  const [quantityAtomState, setQuantityAtomState] = useAtom(quantityAtom);

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
    <div className="flex h-[2rem] w-[12rem] flex-col items-center  justify-center ">
      <div className="flex h-full w-full items-center justify-center">
        <button
          className=" p-4 text-[1.5rem] "
          onClick={() => changeDefaltValue(1)}
        >
          +
        </button>
        <input
          className={`h-[2rem] ${
            defaultValue > 9 ? "w-[1rem]" : "w-[2rem]"
          } justify-center text-[1.5rem] text-gray-500 bg-gray-100 outline-none`}
          value={defaultValue}
          onChange={(e) => setDefaultValue(e.target.value)}
          type="text"
          readOnly
        />
        <button
          className="  text-[1.5rem] rounded-full "
          onClick={() => changeDefaltValue(-1)}
        >
          -
        </button>

      </div>
    </div>
  );
}

export default Pieces;
