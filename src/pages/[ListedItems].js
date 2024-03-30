import { list } from "firebase/storage";
import { storage, app, database } from "../../firebaseConfig";
import { doc, collection, getDocs, getDoc } from "firebase/firestore";
import Image from "next/image";
import { useEffect } from "react";
import Search from "../../components/ui/search2";
import Menu from "../../components/ui/Menu";

function ListedItems({  newData }) {
  let collectedData = newData;

  console.log(collectedData);

  return (
    <div className="flex h-screen w-screen  flex-wrap justify-center gap-4 p-4">
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
 
  console.log(documentData);
  

  let dataArray = []

  for (const key in documentData) {
    dataArray.push({[key.toString()] : documentData[key]});
  }

  
  return {
    props: {
      newData: dataArray,
    },
  };
}

export default ListedItems;
