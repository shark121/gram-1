import { useEffect, useState } from "react";
import Options from "./Options";

const colorData = [
  { id: 1, color: "bg-[rgb(251,107,9)]", name: "Orange" },
  { id: 2, color: "bg-[rgb(52,59,67)]", name: "Midnight" },
  { id: 3, color: "bg-[rgb(108,118,137)]", name: "Ash" },
  { id: 4, color: "bg-[rgb(183,110,121)]", name: "RoseGold" },
  { id: 5, color: "bg-[rgb(251,18,48)]", name: "Scarlet" },
  { id: 6, color: "bg-[rgb(80,200,120)]", name: "Emerald" },
  { id: 7, color: "bg-[rgb(255,255,255)]", name: "Starlight" },
  { id: 8, color: "bg-[rgb(229,221,234)]", name: "Purple" },
];

export default function ColorOptions() {
  const [color, setColor] = useState(colorData[0]);

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
