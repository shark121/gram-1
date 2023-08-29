import React from "react";
import {motion} from "framer-motion"

function OrderConfirmedIcon({state}) {

  
  const shouldAnimate = state ? 0 : 1;
  const strokeColor = state ? "white" : "#808080";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      fill="none"
      viewBox="0 0 24 24"
    >
      <motion.path
       initial={{pathLength:0}}
       animate={{pathLength:1}}
       transition={{
      duration : shouldAnimate,
      repeat: Infinity,
      repeatType:"loop",
      repeatDelay: 1
      }}
       
        fill="white"
        d="M19.25 7.577a.75.75 0 001.5 0h-1.5zM7.545 21.75a.75.75 0 000-1.5v1.5zm9.112-20.455l.532-.53-.532.53zm4.093 6.282v-2.51h-1.5v2.51h1.5zm-.51-3.745L17.19.766l-1.064 1.058 3.052 3.066 1.063-1.058zM15.948.25H2.5v1.5h13.448V.25zM.25 2.5v17h1.5v-17H.25zM2.5 21.75h5.045v-1.5H2.5v1.5zM.25 19.5a2.25 2.25 0 002.25 2.25v-1.5a.75.75 0 01-.75-.75H.25zM2.5.25A2.25 2.25 0 00.25 2.5h1.5a.75.75 0 01.75-.75V.25zm14.689.516a1.75 1.75 0 00-1.24-.516v1.5a.25.25 0 01.176.074L17.19.766zm3.561 4.3a1.75 1.75 0 00-.51-1.234L19.177 4.89a.25.25 0 01.073.177h1.5z"
      ></motion.path>
      <motion.path
      initial={{pathLength:0}}
      animate={{pathLength:1}}
      transition={{
        duration: shouldAnimate,
        repeat: Infinity,
        repeatType:"loop",
        repeatDelay: 1
      }}
        stroke={strokeColor}
        strokeLinecap="round"
        strokeWidth="1.5"
        d="M5 6h10.575M5 11h5.237M5 16h2.245"
      ></motion.path>
      <circle
        cx="17.5"
        cy="17.5"
        r="5.5"
        stroke={strokeColor}
        strokeWidth="1.5"
      ></circle>
      <motion.path
        initial={{pathLength:0}}
        animate={{pathLength:1}}
        transition={{
          duration: shouldAnimate,
          repeat: Infinity,
          repeatType:"loop",
          repeatDelay: 1
        }}
        stroke={strokeColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M15.5 18l1.083 1.083a.5.5 0 00.76-.063L19.5 16"
      ></motion.path>
    </svg>
  );
}

export default OrderConfirmedIcon;