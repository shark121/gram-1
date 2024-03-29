import React from "react";

export default function UserSVG({height,width}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={height ? height :"100%"}
      width={width ? width : "100%"}
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="6" r="4" stroke="gray" strokeWidth="1.5"></circle>
      <path
        stroke="gray"
        strokeLinecap="round"
        strokeWidth="1.5"
        d="M15 20.615c-.91.247-1.926.385-3 .385-3.866 0-7-1.79-7-4s3.134-4 7-4 7 1.79 7 4c0 .345-.077.68-.22 1"
      ></path>
    </svg>
  );
}

