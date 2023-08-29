import React from "react";
import {motion} from "framer-motion"

function Line() {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width="800"
      height="800"
      fill="none"
      viewBox="0 0 24 24"
    >
      <g>
        <motion.path
        initial={{pathLength:0, rotate:180}}
        animate={{pathLength:1, rotate:0}}
        transition={{
          delay:1,
          duration:1
        }}
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 21V3"
        ></motion.path>
      </g>
    </motion.svg>
  );
}

export default Line;