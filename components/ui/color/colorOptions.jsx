import { useEffect, useState } from "react";
import Options from "../../Options";



export default function ColorOptions({color, colorData, setColor }){ 

  useEffect(() => {
    sessionStorage.setItem("color", color.name);
  }, [color]);

  return (
    <div className="flex items-center justify-between w-full">
        <div className={` ${color.color} w-[4.6rem] h-[2.5rem] rounded-lg `}>
        </div>
      <Options
        chosenItem={color}
        setChosenItem={setColor}
        listData={colorData}
      />
    </div>
  );
}
