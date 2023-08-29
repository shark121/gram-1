import { useState } from "react";

function Color({ color, ring, setRing }) {
  return (
    <button className={`${color} w-2 h-2 rounded-full ring-4 ring-gray-400 p-4`}></button>
  );
}

function Colors({ colors }) {

   const[ring, setRing] = useState()

  let list = colors.map((item) => <Color color={item}  ring={ring} setRing ={setRing}/>);

  return (
    <div className="flex w-full h-[5rem] gap-4 justify-center  m-2 overscroll-contain">
      {list}
    </div>
  );
}

export default Colors;
