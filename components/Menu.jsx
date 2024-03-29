import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";



function MapList({ image, itemName, price }) {
  
  let customizable = ["laptops","phones"]

  

  let router = useRouter();

  function navigateToNext() {
    let itemCollection = sessionStorage.getItem("collection")

    const imageString = String(image)

    sessionStorage.setItem("img",imageString)
 
    if(customizable.includes(itemCollection)){ 
      router.push(`./addToCart/${itemName}?image=${imageString}`)
    }else{
      router.push(`./addNonCustom/${itemCollection}/${itemName}?image=${imageString}`)
  
    }
     
  

    sessionStorage.setItem("type", itemName);
  }

  return (
    <button
      className="m-2 flex h-[5rem] w-[20rem] items-center justify-between rounded-2xl bg-gray-100  px-4 py-1 font-extrabold text-gray-500   "
      onClick={() => navigateToNext()}
    >
      <div className="relative h-[4.5rem] w-[4.5rem] content-center justify-center rounded-xl ">
        <Image
          src={image}
          height={60}
          width={65}
          className="rounded-xl  object-cover  "
          alt={"picture"}
        />
      </div>

      {itemName}
    </button>
  );
}

function Menu({menuItems, menuType}) {

  let list = menuItems.map((item) => {

    const image = Object.values(item)[0];
    const nameID = Object.keys(item)[0];

    console.log(image, nameID);
    return (
      <MapList
        image={image}
        itemName={nameID}
        key={nameID}
        menuType={menuType}
      />
    );
  });

  return (
    <div className=" flex w-full flex-wrap items-center justify-center gap-1 rounded-xl px-1 transition-all duration-150">
      {...list}
    </div>
  );
}

export default Menu;
