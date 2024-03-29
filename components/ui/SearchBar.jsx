import {motion} from "framer-motion"



function SearchBar() {
  return (
    <motion.div className="flex justify-center gap-1 py-4  font-bold h-[6rem] w-[100%] mx-0">
      <input
        className="bg-gray-300  p-6 rounded-lg outline-none "
        placeholder="Search"
      />
      <button className="h-full  bg-[#ff0066] rounded-lg text-white box-border p-4 w-[7rem]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-[100%] h-[100%]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </button>
    </motion.div>
  );
}

export default SearchBar;
