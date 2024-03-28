import Logo from "../images/logoSmall.png";
import Image from "next/image";
// import DeliveryOnRouteIcon from "";
import DeliveryOnRouteIcon from "../images/svgImages/DeliveryOnRouteIcon";
import PackageReadyIcon from "../images/svgImages/PackageReadyIcon";
import PaymentReceivedIcon from "../images/svgImages/PaymentReceivedIcon";
import OrderConfirmedIcon from "../images/svgImages/orderConfiremedIcon";
import PickupAvailableIcon from "../images/svgImages/pickupAvailableIcon";
import { useEffect, useState } from "react";
import { doc, collection, getDoc, onSnapshot } from "firebase/firestore";
import { database } from "../../firebaseConfig";
import { useRouter } from "next/router";

function OrderPage({ data }) {
  const router = useRouter();
  const orderID = router.query.orderID

  let docRef = doc(collection(database, "ORDERS"),orderID );
 
  
  const responseObject = data[0];
  console.log(data);
  const [responseObjectState, setResponseObjectState] = useState("");
  const [orderConfirmed, setOrderConfirmed] = useState(true);
  const [paymentReceived, setPaymentReceived] = useState(false);
  const [packageReady, setPackageReady] = useState(false);
  const [deliveryOnRoute, setDeliveryOnRoute] = useState(false);
  const [pickupAvailable, setPickupAvailable] = useState(false);
  
  useEffect(() => {
    setOrderConfirmed(responseObject.orderConfirmed);
    setPaymentReceived(responseObject.paymentReceived);
    setPackageReady(responseObject.packageReady);
    setDeliveryOnRoute(responseObject.deliveryOnRoute);
    setPickupAvailable(responseObject.pickupAvailable);
  }, []);
  
  onSnapshot(docRef,(doc)=>{
    let changes =   doc.data()
    setOrderConfirmed(changes.orderConfirmed);
    setPaymentReceived(changes.paymentReceived);
    setPackageReady(changes.packageReady);
    setDeliveryOnRoute(changes.deliveryOnRoute);
    setPickupAvailable(changes.pickupAvailable);
  }) 


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
  }) {
    return (
      <div className="flex h-[6rem] w-full items-center justify-between  rounded-xl p-4 overflow-x-hidden ">
        <div
          className={`h-[3.6rem] w-[3.6rem] rounded-full ${
            state ? "bg-[#ff0066]" : "bg-gray-200"
          } p-4 shadow-md transition-colors ease-in-out`}
        >
          {icon}
        </div>
        <div className=" flex h-full w-[70%] text-left text-gray-600">
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
    <div className=" h-screen w-screen bg-gray-50">
      <div className="flex h-screen w-screen flex-col  items-center">
        <div className="h-[8rem] py-4 text-center text-[1.5rem] font-bold text-gray-600">
         <div className="">ID:{" order_id_" + orderID}</div>  
          {/* <Image src={Logo} alt={"logo"} fill className="object-cover" /> */}
        </div>
        <div className="w-[100%] rounded-lg  p-4 md:w-[70%]">{...list}</div>
      </div>
    </div>
  );
}

export default OrderPage;

export async function getServerSideProps(context) {
  let orderID = context.query.orderID;

  let docRef = doc(collection(database, "ORDERS"), orderID);

  let responseArray = [];
  await getDoc(docRef).then((response) => {
    responseArray.push(response.data());
  });

  return {
    props: {
      data: responseArray,
    },
  };
}
