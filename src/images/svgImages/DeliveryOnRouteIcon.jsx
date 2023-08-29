import React from "react";
import { animate, motion } from "framer-motion";

function DeliveryOnRouteIcon({ state }) {

  const shouldAnimate = state ? 0 : 1;
  const strokeColor = state ? "white" : "#808080";

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      fill="none"
      // stroke="#808080"
      // stroke="#29c5f6"
      stroke= {strokeColor}
      strokeWidth="3"
      viewBox="0 0 64 64"
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
        d="M19.55 43.93H38.1a2 2 0 002-2V16.28a2 2 0 00-2-2H8.68a2 2 0 00-2 2v25.63a2 2 0 002 2h2.6M44.33 43.93h-4.14v-20.7H50a1 1 0 01.76.35l6.3 7.55a1 1 0 01.23.64v12.16H53"
      ></motion.path>
      <ellipse cx="15.53" cy="45.23" rx="4.44" ry="4.5"></ellipse>
      <ellipse cx="48.58" cy="45.23" rx="4.44" ry="4.5"></ellipse>
    </motion.svg>
  );
}

export default DeliveryOnRouteIcon;
