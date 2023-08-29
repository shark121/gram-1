import { list } from "firebase/storage";
import { storage, app, database } from "../../firebaseConfig";
import { doc, collection, getDocs } from "firebase/firestore";
import Image from "next/image";
import Menu from "../../components/Menu";
import SearchBar from "../../components/SearchBar";
import { useAtom, atom, getDefaultStore } from "jotai";
import { useEffect } from "react";

function ListedItems({ data }) {

  let collectedData = data.name;

  return (
    <div className="flex h-screen w-screen flex-wrap justify-center gap-4 p-4">
      <SearchBar />
      <Menu menuItems={collectedData} menuType={"ListedItems"}/>
    </div>
  
  );
}


export function getStaticPaths(){

  return{
    fallback:true,
    paths:[
      {
        params:{
          ListedItems:"airpods"
        }
      },
      {
        params:{
          ListedItems:"phones"
        }
      },
      {
        params:{
          ListedItems:"accessories"
        }
      },
      {
        params:{
          ListedItems:"watches"
        }
      },
    ]
  }
  

}

export async function getStaticProps(context) {
  const route = context.params.ListedItems


  let collectionRef = collection(database, route ||"phones");

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
