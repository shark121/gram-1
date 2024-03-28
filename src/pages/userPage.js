import { use, useEffect, useState } from "react";
import UserNavigation from "../../components/userPage/userNavigation";
import UserInfoComponent from "../../components/ui/UserInfo";
import { useRouter } from "next/router";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  where,
  query,
} from "firebase/firestore";
import { database, app } from "../../firebaseConfig";
import { signInWithPopup, GoogleAuthProvider, getAuth } from "firebase/auth";
import { comma } from "postcss/lib/list";
import React from "react";

const auth = getAuth();
const provider = new GoogleAuthProvider();
let userID = "";

let destinations = {
  Account: <UserInfoComponent />,
  Orders: <></>,
  Posts: <></>,
  Notifications: <></>,
};

const user = auth.currentUser;

async function getOrders() {
  const ORDER_IDS = [];

  const user = auth.currentUser;

  if (user === undefined || user === null) {
    await signInWithPopup(auth, provider)
      .then(async (result) => {
        const userID = result.user.uid;
        const collectionRef = collection(database, "ORDERS");
        const q = query(collectionRef, where("userUid", "==", userID));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
        });
      })
      .catch(async (error) => {
        console.log(error);
      });
  } else {
    const collectionRef = collection(database, "USERS", userID, "orders");
    const docRef = await getDocs(collectionRef);

    docRef.docs.map((doc) => {
      console.log(doc.data(), "doc");
    });
  }

  return ORDER_IDS;
}


export default function UserComponent() {
  let router = useRouter();
  const [navigationState, setNavigationState] = useState("Account");
  const [componentState, setComponentState] = useState();
  const user = auth.currentUser;

  // console.log(orders, "orders");
  return (
    <div className="flex h-screen w-screen justify-center gap-2 bg-gray-100  p-4">
      <UserNavigation
        navigationState={navigationState}
        setNavigationState={setNavigationState}
      />
      <div className="w-[50rem] bg-white">
        <div className="h-full w-[20rem]">{destinations[navigationState]}</div>
      </div>
    </div>
  );
}
