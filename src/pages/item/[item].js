import StorageSlider, { storageAtom } from "../../../components/ui/storage/StorageSlider";
import ColorPage from "../../../components/ui/color/ColorPage";
import Pieces, { quantityAtom } from "../../../components/ui/Pieces";
import NextArrow from "@/images/svgImages/nextArrow";
import BackArrow from "@/images/svgImages/backArrow";
import { useState } from "react";
import { atom, useAtom, getDefaultStore } from "jotai";
import { useRouter } from "next/router";
import ColorPicker from "../../../components/ui/color/colorPicker";

function ItemPage() {
  const router = useRouter();

  let pageElements = [<StorageSlider />, <ColorPicker />, <Pieces />];

  const [pageState, setPageState] = useState(0);

  function navigate(step) {
    let size = pageElements.length - 1;

    if (pageState == 0 && step < 0) return;

    if (pageState == size && step > 0) {
      router.push("/addToCart");
    }

    setPageState((pageState) => pageState + step);
  }


  return (
    <div className="relative">
      <button
        className="absolute right-[1rem] top-[2rem] h-[3rem]  w-[3rem] rounded-full bg-transparent p-4 "
        onClick={() => navigate(1)}
      >
        {<NextArrow />}
      </button>
      <button
        className="absolute left-[1rem] top-[2rem]   h-[3rem] w-[3rem] rounded-full p-4 "
        onClick={() => navigate(-1)}
      >
        <BackArrow />
      </button>
      {pageElements[pageState]}
    </div>
  );
}

export function getStaticPaths() {
  return {
    fallback: false,
    paths: [
      {
        params: {
          item: "i-X",
        },
      },
    ],
  };
}

export function getStaticProps() {
  return {
    props: {
      data: "data",
    },
  };
}

export default ItemPage;
