import React from "react";
import { motion } from "framer-motion";

function PackageReadyIcon({ state }) {
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
        strokeWidth="2"
        d="M4 15.83V8c0-.309.167-.594.436-.745l.015-.009 7.167-4.031.055-.03a.668.668 0 01.654 0L19.61 7.28c.241.135.39.39.39.666v7.883c0 .282-.15.543-.393.687l-7.228 4.26a.747.747 0 01-.758 0l-7.228-4.26A.798.798 0 014 15.829zM12 21v-9M12 12L4 7.5M20 7.5L12 12"
      ></motion.path>
    </svg>
  );
}

export default PackageReadyIcon;
