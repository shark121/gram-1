import CollectColorData from "./ColorMap";
import { useEffect, useState } from "react";
import { Sacramento } from "@next/font/google";
import {atom, useAtom, getDefaultStore} from "jotai"
import { storageAtom } from "./StorageSlider";


const sacramento = Sacramento({
  weight: "400",
   subsets : ["latin"]
})



const colorData = [
  { id: 1, color: "bg-[rgb(251,107,9,1)]", name: "Orange" },
  { id: 2, color: "bg-[rgb(52,59,67)]", name: "Midnight" },
  { id: 3, color: "bg-[rgb(108,118,137)]", name: "Ash" },
  { id: 4, color: "bg-[rgb(183,110,121)]", name: "RoseGold" },
  { id: 5, color: "bg-[rgb(251,18,48)]", name: "Scarlet" },
  { id: 6, color: "bg-[rgb(80,200,120)]", name: "Emerald" },
  { id: 7, color: "bg-[rgb(255,255,255)]", name: "Starlight" },
  { id: 8, color: "bg-[rgb(229,221,234)]", name: "Purple" },
];

export let colorAtom  = atom(colorData[0].name)



function ColorPage() {
  let defaultStore = getDefaultStore()
  let firstElement = colorData[0].color;
  let firstname = colorData[0].name;

  const [currentColor, setCurrentColor] = useState(firstElement);
  const [currentName, setCurrentName] = useState(firstname)

  const [colorAtomState, setColorAtomState] = useAtom(colorAtom)
  
  function setTrayColor(){
     useEffect(()=>{
     setColorAtomState(currentName)

     defaultStore.set(colorAtom, currentName)
 
     console.log(defaultStore.get(colorAtom), defaultStore.get(storageAtom))

     sessionStorage.setItem("color",(currentName))
     }, [currentName])
  }
  
  setTrayColor()

  return (
    <div className="flex min-h-screen min-w-screen flex-col justify-center gap-4 items-center bg-white">
      <div className="flex h-[25rem] w-[100vw] items-center justify-center rounded-full flex-col gap-4">
        <div
          className={`circle relative flex h-[10rem]  w-[10rem] items-center justify-center rounded-full`}
        >
          <div
            className={`circle-2 h-[100%] w-[100%]  rounded-full   ${currentColor} opacity-50 transition-colors ease-out duration-700  `}
          ></div>
          <div
            className={`absolute inset-2  rounded-full ${currentColor} transition-colors ease-out duration-700 `}
          ></div>
        </div>
        <div className={`h-[4rem] w-[15rem] bottom-2 font-extrabold ${sacramento.className}  flex justify-center items-center text-[2.5rem] text-gray-700`}>
         {currentName}
        </div>
      </div>
      <div className="flex h-[60vh] w-[100vw] items-center justify-center overflow-scroll rounded-t-2xl bg-white shadow-lg md:w-[40rem] scrollbar-hide">
        <CollectColorData
          colorData={colorData}
          currentColor={currentColor}
          setCurrentColor={setCurrentColor}
          setCurrentName = {setCurrentName}
        
        />
      </div>
    </div>
  );
}

export default ColorPage;
