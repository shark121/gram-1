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
    <div className="flex h-screen w-screen flex-col items-center  justify-center">
      <div className="my-6 text-[6rem]">Qty</div>
      <div className="flex h-[7rem] w-[22rem] items-center justify-center">
        <button
          className="m-4 p-4 text-[3.5rem] "
          onClick={() => changeDefaltValue(1)}
        >
          +
        </button>
        <input
          className={`h-[5rem] ${
            defaultValue > 9 ? "w-[7rem]" : "w-[4rem]"
          } justify-center text-[5rem] text-gray-500 outline-none`}
          value={defaultValue}
          onChange={(e) => setDefaultValue(e.target.value)}
          type="text"
        />
        <button
          className="m-4 p-4 text-[3.5rem]"
          onClick={() => changeDefaltValue(-1)}
        >
          -
        </button>

      </div>
    </div>
  );
}

export default Pieces;
