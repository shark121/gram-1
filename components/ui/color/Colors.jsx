import { useState } from "react";

function Color({ color, name, id }) {
  return (
    <button
      className={` flex h-[2.5rem] w-[2.5rem] items-center justify-center rounded-full relative `}
      onClick={()=>console.log(name)}
    >
      <div className={`${color} h-[80%] w-[80%] rounded-full `}></div>
      <div className={`${color}  rounded-full absolute top-0 bottom-0 left-0 right-0 -z-10 opacity-40`}></div>
    </button>
  );
}

function Colors({ colors }) {
  const [ring, setRing] = useState();

  let list = colors.map(({ color, id, name }) => (
    <Color color={color} name={name} id={id} key={id} />
  ));

  return (
    <div className="m-2 flex h-[5rem] min-w-[130vw] justify-center  gap-4 overscroll-y-contain bg-red-300">
      {list}
    </div>
  );
}

export default Colors;
