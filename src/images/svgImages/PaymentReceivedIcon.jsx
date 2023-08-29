import React from "react";
import { motion } from "framer-motion";

function PaymentReceivedIcon({ state }) {
  const shouldAnimate = state ? 0 : 1;
  const strokeColor = state ? "white" : "#808080";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      viewBox="-9 0 66 66"
    >
      <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
        <g stroke={strokeColor} strokeWidth="2" transform="translate(1 3)">
          <g>
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: shouldAnimate,
                repeat: Infinity,
                repeatType: "loop",
                repeatDelay: 1,
              }}
              d="M14.7 2.4s9.7-6.8 11.4 3.5M25.4 3S27.2-.4 36 0c0 2.8-2.6 9.9-6.5 11.2C39 16.8 46 33.4 46 43.4 46 55.5 35.7 62 23 62S0 55.5 0 43.4c0-9.9 6.9-26.6 16.5-32.2C12.6 9.9 10 2.8 10 0c0 0 4.4 3.9 10 3.9M15.7 11h15.4M31.1 12.3s11.2-.3 11.2 6M31.2 10.4s8.8.5 13.9-2.8"
            ></motion.path>
          </g>
          <path d="M28.1 33.1c0-2.8-2.3-5.1-5.1-5.1s-6.2 1.8-4.7 7.1c0 0 2.5 8.6-2.3 12.9 0 0 8-4.6 17-.1M15.1 40H27"></path>
        </g>
      </g>
    </svg>
  );
}

export default PaymentReceivedIcon;
