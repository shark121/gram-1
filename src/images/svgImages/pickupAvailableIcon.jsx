import React from "react";
import { motion } from "framer-motion";

function PickupAvailableIcon({ state }) {
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
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          duration: shouldAnimate,
          repeat: Infinity,
          repeatType: "loop",
          repeatDelay: 1,
        }}
        stroke={strokeColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M19 10.08v10H5v-10m14 0H5m14 0h1v-3H4v3h1m7-3c.833-1.833 3-5.5 5-3.5s-2.5 3.334-5 3.5zm0 0c-.833-1.833-3-5.5-5-3.5s2.5 3.334 5 3.5z"
      ></motion.path>
    </svg>
  );
}

export default PickupAvailableIcon;
