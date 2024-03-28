import { useEffect, useState } from "react";
import Options from "../../Options";


export default function StorageOptions({storage, setStorage, storageData}) {
  

  useEffect(() => {
    sessionStorage.setItem("storage", storage.name);
  }, [storage]);

  return (
    <div>
      <Options
        chosenItem={storage}
        setChosenItem={setStorage}
        listData={storageData}
      />
    </div>
  );
}
