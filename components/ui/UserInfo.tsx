import { app } from "../../firebaseConfig";
import { getAuth, signInWithPopup,  } from "firebase/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getDocs, collection, getDoc, doc } from "firebase/firestore";
import { database } from "../../firebaseConfig";


export default function UserInfoComponent({ data }) {
  console.log(data)
  const router = useRouter();

    return <div className="h-full w-full"><div>something</div></div>;
}

export async function getStaticProps() {
  return {
    props: {
      // data: orders,
    },
  };
}
