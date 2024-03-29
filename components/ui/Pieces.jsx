import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {updateTotal, updateQuantity} from "../../src/pages/GlobalRedux/features/cartSlice"


function Pieces({ max, id, price }) {
   const {cartDataState} = useSelector(state=>state.cart)
   const dispatch = useDispatch()

   function shouldDisplay(){
    return   max == 1 ?  "hidden" : ""
   }

  return (
    <div
      className={`flex h-full flex-col items-center  justify-center ${shouldDisplay()} `}
    >
      <div className="flex h-full w-full flex-col items-center justify-center">
        <button
          className="p-4 text-[1.5rem] "
          onClick={()=>dispatch(updateQuantity({id, step:1, price, max}))}
        >
          +
        </button>
        <div className="flex h-[2rem] w-[2rem] items-center justify-center rounded-full bg-[#ff0066] font-bold text-white">
          {cartDataState.find(element=>element.id == id).qty}
        </div>
        <button
          className=" p-4 text-[1.5rem]"
          onClick={()=>dispatch(updateQuantity({id, step:-1, price, max}))}

        >
          -
        </button>
      </div>
    </div>
  );
}

export default Pieces;
