import Logo from "../images/logoSmall.png";
import Image from "next/image";
import Line from "@/images/svgImages/line";
import DeliveryOnRouteIcon from "@/images/svgImages/DeliveryOnRouteIcon";
import PackageReadyIcon from "@/images/svgImages/PackageReadyIcon";
import PaymentReceivedIcon from "@/images/svgImages/PaymentReceivedIcon";
import OrderConfirmedIcon from "@/images/svgImages/orderConfiremedIcon";
import PickupAvailableIcon from "@/images/svgImages/pickupAvailableIcon";
import { useState } from "react";

function OrderPage() {
  const [orderConfiremed, setOrderConfirmed] = useState(true);
  const [paymentReceived, setPaymentReceived] = useState(false);
  const [packageReady, setPackageReady] = useState(false);
  const [deliveryOnRoute, setDeliveryOnRoute] = useState(false);
  const [pickupAvailable, setPickupAvailable] = useState(false);

  let orderData = [
    {
      icon: <OrderConfirmedIcon state={orderConfiremed} />,
      isNotCompletedDescription: "waiting for order to be confirmed",
      isCompletedDescription: "your order has been confirmed",
      state: orderConfiremed,
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
      <div className="flex h-[6rem] w-full items-center justify-between  rounded-xl p-4 ">
        <div
          className={`h-[3.6rem] w-[3.6rem] rounded-full ${
            state ? "bg-[#ff0066]" : "bg-gray-200"
          } p-4 shadow-md transition-colors ease-in-out`}
        >
          {icon}
        </div>
        <div className=" flex h-full w-[70%] text-gray-600 text-left">
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
        <div className="h-[8rem] w-[15rem] text-[2rem] font-bold text-gray-600 text-center py-4">
          iPhone X
          {/* <Image src={Logo} alt={"logo"} fill className="object-cover" /> */}
        </div>
        <div className="w-[100%] rounded-lg  p-4 md:w-[70%]">
          {...list}
        </div>
      </div>
    </div>
  );
}

export default OrderPage;
