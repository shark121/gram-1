import { list } from "firebase/storage";
import { storage, app, database } from "../../firebaseConfig";
import { doc, collection, getDocs } from "firebase/firestore";
import Image from "next/image";
import Menu from "../../components/Menu";
import SearchBar from "../../components/SearchBar";
import { useAtom, atom, getDefaultStore } from "jotai";
import { useEffect } from "react";
import Search from "../../components/search2";

function ListedItems({ data }) {
  let collectedData = data.name;

  console.log(collectedData)

  return (
    <div className="flex h-screen w-screen  flex-wrap justify-center gap-4 p-4">
      <Search />
      <div>
        <Menu menuItems={collectedData} menuType={"ListedItems"} />
      </div>
    </div>
  );
}

export function getStaticPaths() {
  return {
    fallback: true,
    paths: [
      {
        params: {
          ListedItems: "airpods",
        },
      },
      {
        params: {
          ListedItems: "phones",
        },
      },
      {
        params: {
          ListedItems: "accessories",
        },
      },
      {
        params: {
          ListedItems: "watches",
        },
      },
    ],
  };
}

export async function getStaticProps(context) {
  const route = context.params.ListedItems;

  let collectionRef = collection(database, route || "phones");

  let data = await getDocs(collectionRef);
  let collectedData;

  data.docs.map((item) => {
    collectedData = item.data();
  });

  return {
    props: {
      data: collectedData,
    },
  };
}

export default ListedItems;
