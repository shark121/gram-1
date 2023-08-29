import Image from "next/image";
import {atom, getDefaultStore, useAtom} from "jotai"
import Link from "next/link";
import { useRouter } from "next/router";

export const typeAtom= atom("")

function MapList({ image, itemName, collection, menuType }) {
  
  let defaultStore  = getDefaultStore()

  let router = useRouter()


function navigateToNext(){


   if(menuType === "homePage") {
     router.push(`./${collection}`)
  }
   else if(menuType === "ListedItems"){ 
    
    router.push(`./item/${collection}`)

    
    sessionStorage.setItem("type",itemName)
    
    console.log(defaultStore.get(typeAtom))
  
  }


  }
  

  return (
  //   <button
  //     className="my-1 py-1 flex h-[6.5rem] w-[20rem] items-center justify-between px-4  rounded-2xl bg-gray-100 font-extrabold text-gray-500"
  //     onClick={()=>navigateToNext()}
  //     >
  //     <div className="relative h-full w-[40%] content-center justify-center rounded-xl">
  //       <Image src={image} fill className="rounded-xl object-cover" alt={"picture"} />
  //     </div>

  //     {itemName}
  //   </button>
  // );
  <button
  className="my-4 py-1 flex h-[6.5rem] w-[20rem] items-center justify-between px-4  rounded-2xl bg-gray-100 font-extrabold text-gray-500"
  onClick={()=>navigateToNext()}
  >
  <div className="relative h-[6rem] w-[40%] content-center justify-center rounded-xl">
    <Image src={image} fill className="rounded-xl  object-cover -my-4 " alt={"picture"} />
  </div>

  {itemName}
</button>
);
}

function Menu({ menuItems, menuType }) {
  let list = menuItems.map(({ image, name, collection }) => {
    return <MapList image={image} itemName={name} key={name} collection={collection} menuType={menuType} />;
  });

  return (
    <div className=" flex flex-wrap gap-1 rounded-xl px-1 items-center justify-center w-full">{list}</div>
  );
}

export default Menu;
