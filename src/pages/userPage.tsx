import Link from "next/link";
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

export type OrderObjectType = {
  deliveryOnRoute: boolean;
  orderConfirmed: boolean;
  pickupAvailable: boolean;
  packageReady: boolean;
  paymentReceived: boolean;
  userUid: string;
  createdAt?: string;
  itemsInfo: { [key: string]: number }[];
  Location?: string;
  pending: boolean;
  number?:string
  fullName?: string;
  phoneNumber?: string;
};

const auth = getAuth();
const provider = new GoogleAuthProvider();
let userID = "";

const user = auth.currentUser;

async function getOrders() {
  const ORDERS: { id: string; data: OrderObjectType }[] = [];

  const user = auth.currentUser;

  if (user === undefined || user === null) {
    await signInWithPopup(auth, provider)
      .then(async (result) => {
        const userID = result.user.uid;
        const collectionRef = collection(database, "ORDERS");
        console.log(userID, "USERID");
        const q = query(collectionRef, where("userUid", "==", userID));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
          ORDERS.push({ id: doc.id, data: doc.data() });
          console.log(ORDERS, "ORDER_IDS");
          return ORDERS;
        });
      })
      .catch(async (error) => {
        console.log(error);
        // window.location.reload();
      });
  } else {
    const collectionRef = collection(database, "ORDERS");
    const q = query(collectionRef, where("userUid", "==", user.uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      ORDERS.push({ id: doc.id, data: doc.data() });
      console.log(ORDERS, "ORDER_IDS");
      return ORDERS;
    });
  }

  return ORDERS;
}

function OrderComponent(orders: { id: string; data: OrderObjectType }[]) {
  return (
    <div className="flex flex-col gap-4">
      {orders.map((order) => {
        return (
          <Link href={`/OrderPage?orderID=${order.id}`} className=" p-4 rounded-md ">
            {order.data.createdAt}
          </Link>
        );
      })}
    </div>
  );
}

export default function UserComponent() {
  const [ordersState, setOrdersState] = useState<
    { id: string; data: OrderObjectType }[] | null
  >();

  const userIsNullOrUndefined = auth.currentUser === null || auth.currentUser === undefined;

  const [shouldSignIn, setShouldSignIn] = useState<boolean>(true);
  return (
    <div className="flex h-screen w-screen justify-center gap-2 bg-gray-100  p-8 ">
      <div className="flex h-full w-[20rem] items-start justify-center">
        {shouldSignIn && (
          <button
            onClick={async () => {
              await getOrders().then((orders) => {
                setOrdersState(orders);
                setShouldSignIn(false);
              });
            }}
          >
            sign In
          </button>
        )}

        {ordersState && OrderComponent(ordersState)}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  return {
    props: {
      orders: "orders",
    }, // will be passed to the page component as props
  };
}
