import Link from "next/link";
import { useEffect, useState } from "react";
import Icon from "../images/svgImages/gram";
import CategoriesSlider from "../../components/categoriesSlider";
import Element from "../../components/ui/Element";
import airpods from "../images/airpodsNoBg.png";
import iphone from "../images/iphone-12-pro-cropped.png";
// import UserSVG from "@/images/svgImages/userSVG";
import { Comfortaa } from "next/font/google";
import { getAuth } from "firebase/auth";
import { app } from "../../firebaseConfig";
import { SheetComponent } from "../../components/ui/sheet";
import CarouselComponent from "../../components/ui/carouselComponent";
import { motion as m, useAnimate, stagger } from "framer-motion";
import NavBar from "../../components/ui/NavBar";
import { getDocs, collection } from "firebase/firestore";
import { database as db } from "../../firebaseConfig";
import { init } from "next/dist/compiled/@vercel/og/satori";
import { shuffleArray } from "../lib/utils";

const comfortaa = Comfortaa({
  weight: "400",
  subsets: ["latin"],
});

function HomePage({ summariesObject }) {
  const [destinationState, setDestinationState] = useState("all");
  const [shouldRender, setShouldRender] = useState(false);
  const [phonesSummariesState, setPhonesSummariesState] = useState([]);
  const [airpodsSummariesState, setAirpodsSummariesState] = useState([]);
  const [watchesSummariesState, setWatchesSummariesState] = useState([]);
  const [displayList, setDisplayList] = useState([]);
  const allSummaries = [];
  const modifiedSummaries = {};

  useEffect(() => {
    setShouldRender(true);
  }, []);

  Object.values(summariesObject).forEach((doc: string[]) => {
    const itemsValues = Object.values(doc);
    // console.log(itemsValues)
    itemsValues.forEach((item) => {
      if (Array.isArray(item)) {
        allSummaries.push(item[0]);
      } else {
        allSummaries.push(item);
      }
    });
  });

  const phonesSummaries = [];

  Object.values(summariesObject["phones"]).forEach((doc: string[]) =>
    phonesSummaries.push(...doc)
  );
  const airpodsSummaries = Object.values(summariesObject["airpods"]);
  const watchesSummaries = Object.values(summariesObject["watches"]);

  // console.log(modifiedSummaries);
  // setAirpodsSummariesState(phonesSummaries);
  console.log(airpodsSummaries);

  modifiedSummaries["all"] = allSummaries;
  modifiedSummaries["phones"] = phonesSummaries;
  modifiedSummaries["airpods"] = airpodsSummaries;
  modifiedSummaries["watches"] = watchesSummaries;
  
  useEffect(() => {
    shuffleArray(list);
    setDisplayList(list);
  }, [destinationState]);

  let list: JSX.Element[] = modifiedSummaries[destinationState].map(
    (element: { [key: string]: string | number }, i: number) => {
      return (
        <m.div
          className="listItem"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{
            y: 0,
            opacity: 1,
            transition: {
              delay: 0.05 + 0.1 * i,
              duration: 0.1,
              ease: "easeInOut",
            },
          }}
        >
          <Element
            price={element.price}
            type={element.type}
            image={element.image}
            number={element.number}
            storage={element.storage}
            color={element.color}
            key={i}
          />
        </m.div>
      );
    }
  );

  shuffleArray(list);

  return (
    <main className={`flex items-center justify-center `} >
      <m.div className="flex w-full flex-col items-center justify-center " >
        <div className="sticky top-0 z-50 flex h-[10rem] w-full flex-col items-center justify-between bg-white sm:h-[7rem]">
          <div className="my-6 flex h-[2.5rem] w-full items-center justify-between px-4 py-2">
            <SheetComponent />
            <Icon height={"8rem"} width={"9rem"} />
          </div>
          <div className="-mt-2 h-[6rem] w-full sm:-mt-4 sm:w-[25rem]">
            {/* <CategoriesSlider /> */}
            <NavBar
              destinationState={destinationState}
              setDestinationState={setDestinationState}
            />
          </div>
        </div>
        <m.div className="parentClass flex w-full flex-wrap items-center justify-center">
          {displayList}
        </m.div>
      </m.div>
    </main>
  );
}

export default HomePage;

export async function getServerSideProps() {
  const summaries = await getDocs(collection(db, "summaries"));
  const summariesObject = {};

  summaries.forEach((doc) => (summariesObject[doc.id] = doc.data()));

  return {
    props: {
      summariesObject: summariesObject,
      revalidate: 30,
    },
  };
}
