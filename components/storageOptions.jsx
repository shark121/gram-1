import { useEffect, useState } from "react"
import Options from "./Options"


const storageData = [
    { id: 1, name: "256 GB" },
    { id: 2, name: "128 GB" },
    { id: 3, name: "64  GB" },
    { id: 4, name: "32  GB" },
    { id: 5, name: "16  GB" },
    
  ];


export default function StorageOptions(){

    const[storage, setStorage] = useState(storageData[0])

    useEffect(()=>{
        sessionStorage.setItem("storage",(storage.name))


    },[storage])


    return<div>
         <Options chosenItem={storage} setChosenItem={setStorage} listData={storageData}/> 
    </div>
}


