import { list } from "firebase/storage";
import { storage, app, database } from "../../firebaseConfig";
import { doc, collection, getDocs, getDoc } from "firebase/firestore";
import Image from "next/image";
import Menu from "../../components/Menu";
import { useEffect } from "react";
import Search from "../../components/search2";

function ListedItems({  newData }) {
  let collectedData = newData;

  console.log(collectedData);

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

  let getDocumentData = await getDoc(doc(database, "Collection", route));

  let documentData = getDocumentData.data();

  let getObjects = documentData.objects;

  let dataArray = [...getObjects];

  return {
    props: {
      newData: dataArray,
    },
  };
}

export default ListedItems;
