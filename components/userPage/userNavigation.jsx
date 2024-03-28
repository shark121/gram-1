import React from "react";

let destinations = [
  {
    displayName: "Account",
    component: "",
  },
  {
    displayName: "Orders",
    component: "",
  },
 
];

export default function UserNavigation({
  navigationState,
  setNavigationState,
}) {
  function NavigationDivision({ displayName }) {
   
    function bgColor(){
      return navigationState === displayName ? "bg-gray-100" : "bg-white"
    }
   
    function handleOnClick(){
      setNavigationState(displayName)
    }
    return (
      <button
        className={`h-[4rem] w-full border-b-[0.5px]  border-gray-200  p-4 font-bold hover:bg-gray-100 ${bgColor()} `}
        onClick={handleOnClick}
      >
        {displayName}
      </button>
    );
  }

  let list = [];

  list = destinations.map(({ displayName, component }) => {
    return <NavigationDivision displayName={displayName}  key={displayName}/>;
  });

  return <div className=" h-[20rem] w-[17rem] bg-white p-4 ">{...list}</div>;
}
