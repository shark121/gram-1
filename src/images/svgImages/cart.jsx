import React from "react";
import { useState, useEffect } from "react";


function Cart() {
  const [cartLengthState, setCartLengthState] = useState(0);

  useEffect(() => {
    if(sessionStorage.getItem("ID_ARRAY"))
      setCartLengthState(JSON.parse(sessionStorage.getItem("ID_ARRAY")).length);

  }, []);


  // console.log(number);
  return (
    <div className=" h-full w-full relative">
      <div className=" absolute h-[13px] w-[13px] bg-primaryColor font-bold rounded-full top-0 right-0 text-white text-[10px] flex items-center justify-center">{cartLengthState}</div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        className="icon"
        viewBox="0 0 1024 1024"
        fill="gray"
      >
        <path d="M800.8 952c-31.2 0-56-24.8-56-56s24.8-56 56-56 56 24.8 56 56-25.6 56-56 56zm-448 0c-31.2 0-56-24.8-56-56s24.8-56 56-56 56 24.8 56 56-25.6 56-56 56zM344 792c-42.4 0-79.2-33.6-84-76l-54.4-382.4-31.2-178.4C172 136 155.2 120 136.8 120H96c-13.6 0-24-10.4-24-24s10.4-24 24-24h40.8c42.4 0 80 33.6 85.6 76l31.2 178.4L308 709.6c1.6 18.4 18.4 34.4 36 34.4h520c13.6 0 24 10.4 24 24s-10.4 24-24 24H344zm40-128c-12.8 0-23.2-9.6-24-22.4-.8-6.4 1.6-12.8 5.6-17.6s10.4-8 16-8L816 584c19.2 0 36-15.2 38.4-33.6l50.4-288c1.6-13.6-2.4-28-10.4-36.8-5.6-6.4-12.8-9.6-21.6-9.6H320c-13.6 0-24-10.4-24-24s10.4-24 24-24h554.4c22.4 0 42.4 9.6 57.6 25.6 16.8 19.2 24.8 47.2 21.6 75.2l-50.4 288c-4.8 41.6-42.4 74.4-84 74.4l-432 32c-1.6.8-2.4.8-3.2.8z"></path>
      </svg>
    </div>
  );
}

export default Cart;
