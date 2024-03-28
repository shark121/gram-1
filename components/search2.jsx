import SearchIcon from "@/images/svgImages/searchIcon";

export default function Search() {
  return (
    <div className=" flex h-[4rem] w-[20rem] items-center justify-center rounded-[2rem] px-4  py-2">
      <button className="h-[80%] w-[20%] ">
        <SearchIcon />
      </button>
      <div className="flex h-full w-[80%] items-center justify-center ">
        <input 
        placeholder="type/storage/price"
        className="h-full w-full bg-gray-100 px-[2px] text-[1.1rem] text-gray-600 outline-none" />
      </div>
    </div>
  );
}
