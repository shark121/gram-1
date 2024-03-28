import { Sacramento,  } from "@next/font/google";
import { useEffect, useState } from "react";

const sacramento = Sacramento({
  weight: ["400"],
  style: "normal",
  subsets: ["latin"],
});

function ColorMap({ color, id, name, setCurrentColor, setCurrentName }) {


 function handleOnClick(){
      setCurrentColor(color)
      setCurrentName(name)
 }

 

  return (
    <button
      className={`flex h-[8rem] w-[10rem] items-center justify-center rounded-2xl bg-white pr-2 text-gray-500 shadow-lg ${sacramento.className}`}
      onClick={handleOnClick}
    
    >
      <div className="m-2 flex h-full w-[70%] flex-col justify-between p-2">
        <div className="first-text"></div>
        <div className="second-text text-[1.7rem]">{name}</div>
      </div>
      <div
        className={`h-[80%] w-[20%] ${color} flex items-center justify-center gap-4 rounded-sm p-4 shadow-lg`}
      ></div>
    </button>
  );
}

function CollectColorData({
  colorData,
  currentColor,
  setCurrentColor,
  setCurrentName
}) {
  let list = colorData.map(({ color, id, name }) => {
    return (
      <ColorMap
        color={color}
        id={id}
        name={name}
        key={id}
        currentColor={currentColor}
        setCurrentColor={setCurrentColor}
        setCurrentName = {setCurrentName}
      />
    );
  });

  return (
    <div className="flex h-full w-full flex-wrap items-center justify-center gap-4 rounded-2xl bg-white p-4">
      {...list}
    </div>
  );
}

export default CollectColorData;
