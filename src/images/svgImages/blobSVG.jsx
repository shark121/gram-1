import React from "react";

function Blob() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      version="1.1"
      className="absolute inset-0"
    >
      <path fill="#002233" d="M0 0H540V960H0z"></path>
      <defs>
        <linearGradient x1="0%" x2="100%" y1="100%" y2="0%">
          <stop offset="30%" stopColor="#001220"></stop>
          <stop offset="70%" stopColor="#001220"></stop>
        </linearGradient>
      </defs>
      <defs>
        <linearGradient x1="0%" x2="100%" y1="100%" y2="0%">
          <stop offset="30%" stopColor="#001220"></stop>
          <stop offset="70%" stopColor="#001220"></stop>
        </linearGradient>
      </defs>
      <path
        fill="#Ff0066"
        d="M-189 0c8.6-21.8 17.1-43.6 24.5-68.1 7.5-24.5 13.7-51.6 30.9-65.5 17.1-13.9 45.2-14.6 69.3-21.6 24.1-7 44.2-20.4 64.3-33.8V0z"
        transform="translate(540 960)"
      ></path>
      <path
        fill="#ff0066"
        d="M189 0c-1.4 25.6-2.7 51.2-14.4 72.3-11.6 21.2-33.5 37.8-54.4 47.9-20.8 10.1-40.6 13.6-60.5 23.9C39.8 154.5 19.9 171.7 0 189V0z"
      ></path>
    </svg>
  );
}

export default Blob;