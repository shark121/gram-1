import Image from "next/image";
import { atom, getDefaultStore, useAtom } from "jotai";
import Link from "next/link";
import { useRouter } from "next/router";

export const typeAtom = atom("");

function MapList({ image, itemName, collection, menuType, price }) {
  let defaultStore = getDefaultStore();

  let router = useRouter();

  function navigateToNext() {
    if (menuType === "homePage") {
      router.push(`./${collection}`);
    } else if (menuType === "ListedItems") {
      router.push(`./addToCart/${itemName}`);

      sessionStorage.setItem("type", itemName);

      console.log(defaultStore.get(typeAtom));
    }
  }

  return (
    <button
      className="m-2 flex h-[5rem] w-[20rem] items-center justify-between rounded-2xl bg-gray-100  px-4 py-1 font-extrabold text-gray-500   "
      onClick={() => navigateToNext()}
    >
      <div className="relative h-[4.5rem] w-[4.5rem] content-center justify-center rounded-xl ">
        <Image
          src={image}
          fill
          className="rounded-xl  object-cover  "
          alt={"picture"}
        />
      </div>

      {itemName}
    </button>
  );
}

function Menu({ menuItems, menuType }) {
  let list = menuItems.map(({ image, name, collection,price }) => {
    return (
      <MapList
        image={image}
        itemName={name}
        key={name}
        collection={collection}
        menuType={menuType}
      />
    );
  });

  return (
    <div className=" flex w-full flex-wrap items-center justify-center gap-1 rounded-xl px-1">
      {list}
    </div>
  );
}

export default Menu;
