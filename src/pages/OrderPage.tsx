import Logo from "../images/logoSmall.png";
import Image from "next/image";
import DeliveryOnRouteIcon from "../images/svgImages/DeliveryOnRouteIcon";
import PackageReadyIcon from "../images/svgImages/PackageReadyIcon";
import PaymentReceivedIcon from "../images/svgImages/PaymentReceivedIcon";
import OrderConfirmedIcon from "../images/svgImages/orderConfiremedIcon";
import PickupAvailableIcon from "../images/svgImages/pickupAvailableIcon";
import { useEffect, useState } from "react";
import {
  doc,
  collection,
  getDoc,
  onSnapshot,
  deleteDoc,
} from "firebase/firestore";
import { database } from "../../firebaseConfig";
import { useRouter } from "next/router";
import { OrderObjectType } from "./userPage";
import { Button } from "../../shadcn/components/ui/button";
import { Input } from "../../shadcn/components/ui/input";

function OrderPage({ data }) {

  if (data == null) {
    return<div className="h-[100vh] w-[100vw] flex items-center justify-center">Order unavailable</div>
  }

  const router = useRouter();
  const orderID = router.query.orderID;
  const collectionRef = collection(database, "ORDERS");

  let docRef = doc(collectionRef, orderID);

  const responseObject: OrderObjectType = data[0];
  console.log(data);
  const [responseObjectState, setResponseObjectState] = useState("");
  const [orderConfirmed, setOrderConfirmed] = useState(true);
  const [paymentReceived, setPaymentReceived] = useState(false);
  const [packageReady, setPackageReady] = useState(false);
  const [deliveryOnRoute, setDeliveryOnRoute] = useState(false);
  const [pickupAvailable, setPickupAvailable] = useState(false);
  const [locationState, setLocationState] = useState<string>();
  const [receiverNameState, setReceiverNameState] = useState<string | null>("");
  const [receiverPhoneState, setReceiverPhoneState] = useState<string | null>(
    ""
  );
  const [dateState, setDateState] = useState<string | null>("");
  const [itemDataState, setItemDataState] = useState<
    { [key: string]: string | number }[] | null
  >();

  useEffect(() => {
    setOrderConfirmed(responseObject.orderConfirmed);
    setPaymentReceived(responseObject.paymentReceived);
    setPackageReady(responseObject.packageReady);
    setDeliveryOnRoute(responseObject.deliveryOnRoute);
    setPickupAvailable(responseObject.pickupAvailable);
    setLocationState(responseObject.Location);
    setReceiverNameState(responseObject.fullName || null);
    setReceiverPhoneState(responseObject.phoneNumber || null);
    setDateState(responseObject.createdAt || null);
    setItemDataState(responseObject.itemsInfo || null);
  }, []);

  onSnapshot(docRef, (doc) => {
    console.log(doc.exists(), "DOC");

    if (doc.exists()) {
      const changes = doc.data();
      setOrderConfirmed(changes.orderConfirmed);
      setPaymentReceived(changes.paymentReceived);
      setPackageReady(changes.packageReady);
      setDeliveryOnRoute(changes.deliveryOnRoute);
      setPickupAvailable(changes.pickupAvailable);
    }
  });

  let orderData = [
    {
      icon: <OrderConfirmedIcon state={orderConfirmed} />,
      isNotCompletedDescription: "waiting for order to be confirmed",
      isCompletedDescription: "your order has been confirmed",
      state: orderConfirmed,
    },
    {
      icon: <PaymentReceivedIcon state={paymentReceived} />,
      isNotCompletedDescription: "waiting for payment",
      isCompletedDescription: "full paymnet received",
      state: paymentReceived,
    },
    {
      icon: <PackageReadyIcon state={packageReady} />,
      isNotCompletedDescription: "getting package ready for delivery",
      isCompletedDescription: "package is now ready",
      state: packageReady,
    },
    {
      icon: <DeliveryOnRouteIcon state={deliveryOnRoute} />,
      isNotCompletedDescription: "waiting for scheduled delivery on ......",
      isCompletedDescription: " delivery on route",
      state: deliveryOnRoute,
    },
    {
      icon: <PickupAvailableIcon state={pickupAvailable} />,
      isNotCompletedDescription: "waiting for pickup",
      isCompletedDescription: "your pickup has arrived",
      state: pickupAvailable,
    },
  ];

  function OrderMap({
    icon,
    isCompletedDescription,
    isNotCompletedDescription,
    state,
  }: {
    icon: JSX.Element;
    isCompletedDescription: string;
    isNotCompletedDescription: string;
    state: boolean;
  }) {
    return (
      <div className="flex h-[6rem] w-full items-center justify-between  overflow-x-hidden rounded-xl p-4 ">
        <div
          className={`h-[2.6rem] w-[2.6rem] rounded-full ${
            state ? "bg-[#ff0066]" : "bg-gray-200"
          } p-2.5 shadow-md transition-colors ease-in-out`}
        >
          {icon}
        </div>
        <div className=" flex  w-[70%] text-left text-gray-600">
          {state ? isCompletedDescription : isNotCompletedDescription}
        </div>
      </div>
    );
  }

  let list = orderData.map(
    (
      { icon, isCompletedDescription, isNotCompletedDescription, state },
      key
    ) => {
      return (
        <OrderMap
          icon={icon}
          isCompletedDescription={isCompletedDescription}
          isNotCompletedDescription={isNotCompletedDescription}
          state={state}
          key={key}
        />
      );
    }
  );

  return (
    <div className="min-h-screen">
      <div className="flex flex-wrap items-center justify-center p-4 ">
        <div className=" w-[30rem]  rounded-lg p-4">{...list}</div>
        <div className="flex  w-[20rem] flex-col gap-4 text-center text-gray-600">
          {locationState && (
            <div className="">
              <div className="text-start  text-[0.5rem]">location</div>
              <Input value={locationState} />
            </div>
          )}
          {receiverNameState && (
            <div className="">
              <div className="text-start  text-[0.5rem]">receiver name</div>
              <Input value={receiverNameState} />
            </div>
          )}
          {receiverPhoneState && (
            <div className="">
              <div className="text-start  text-[0.5rem]">receiver phone</div>
              <Input value={receiverPhoneState} />
            </div>
          )}
          {dateState && (
            <div className="">
              <div className="text-start  text-[0.5rem]">date</div>
              <Input value={dateState} />
            </div>
          )}

          <div>
            {itemDataState &&
              itemDataState.map((item) => {
                return (
                  <div className="m-4 flex justify-between bg-gray-50 p-4">
                    <div className="flex flex-col items-start">
                      <div>{item.type}</div>
                      <div>GH₵ {item.price}</div>
                    </div>
                    <div className="h-6 w-6 items-center rounded-full bg-[#ff0066] text-center text-white">
                      {item.qty}
                    </div>
                  </div>
                );
              })}
            <Button
              onClick={async () => {
                await deleteDoc(docRef).then(
                  () => {
                    window.alert("Order has been cancelled");
                    window.location.href = "/userPage"
                  }
                );
              }}
            >
              Cancel Order
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderPage;

export async function getServerSideProps(context) {
  let orderID: string = context.query.orderID;

  let docRef = doc(collection(database, "ORDERS"), orderID);

  let responseArray: any = [];

  await getDoc(docRef).then((response) => {
    responseArray.push(response.data());
  })
   
  console.log(responseArray, "RESPONSEARRAY");
  responseArray = responseArray[0] === undefined ? null : responseArray;   

  return {
    props: {
      data: responseArray,
    },
  };
}
