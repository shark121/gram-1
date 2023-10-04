import Image from "next/image";

export default function Element({ name, price, image, flash, newItem, scale }) {
    return (
      <button className=" relative my-2 h-[20rem]  w-[10rem] rounded-md border-gray-500 p-2 ">
        <div className="absolute -z-10 h-[65%] w-[80%] rounded-3xl bg-gray-200"></div>
        {flash ? (
          <div className="absolute right-0 top-0   rounded-sm bg-[#9417e2] px-[0.3rem] py-[0.1rem] font-bold text-white ">
            50% off
          </div>
        ) : null}
        {newItem ? (
          <div className="absolute right-0 top-0   rounded-sm bg-[#0fff50] px-[0.3rem] py-[0.1rem] font-bold text-white animate-pulse">
            new
          </div>
        ) : null}
        <div className="relative flex h-full w-full items-center justify-center">
          <Image fill alt="phone" className= {`object-contain scale-[${scale}] `} src={image} />
        </div>
        <div className="absolute bottom-0 z-10">
          <div className="text-[1.2rem] font-bold text-gray-600">{name}</div>
          <div className="text-[0.8rem] text-[#ff0066] line-through"></div>
          <div className="font-bold text-[#ff0066]">₵{price}</div>
        </div>
      </button>
    );
  }