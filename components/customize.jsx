import ColorSlider from "./ColorSlider";
import SliderComponent from "./Slider";

let myList = [
  { id: 1, display: "32 GB" },
  { id: 2, display: "32 GB" },
  { id: 3, display: "32 GB" },
  { id: 4, display: "32 GB" },
  { id: 5, display: "32 GB" },
  { id: 6, display: "32 GB" },
  { id: 7, display: "32 GB" },
  { id: 8, display: "32 GB" },
  { id: 9, display: "32 GB" },
  { id: 10, display: "32 GB" },
  { id: 11, display: "32 GB" },
  { id: 12, display: "32 GB" },
];

const colorData = [
  { id: 2, color: "bg-[rgb(52,59,67)]", name: "black" },
  { id: 3, color: "bg-[rgb(108,118,137)]", name: "ash" },
  { id: 4, color: "bg-[rgb(183,110,121)]", name: "RoseGold" },
  { id: 5, color: "bg-[rgb(251,18,48)]", name: "red" },
  { id: 6, color: "bg-[rgb(80,200,120)]", name: "green" },
  { id: 7, color: "bg-[rgb(255,255,255)]", name: "Starlight" },
  { id: 8, color: "bg-[rgb(229,221,255)]", name: "blue" },
];

export default function Customize({
  typeState,
  storageData,
  colorData,
  storageState,
  colorState,
  setColorState,
  setStorageState,
  handleOnClick,
  isDisabled
}) {
  return (
    <div className=" flex h-full w-full sm:w-[35rem] flex-col justify-between gap-2 rounded-t-3xl bg-gray-50 ">
      <div className="flex h-[30%] w-full items-center justify-center text-[1.5rem] font-bold text-[#ff0066]">
        {typeState}
      </div>
      <div className="flex h-[30%] w-full items-center justify-center">
        <div className="flex h-[30%] w-[20%]  items-center justify-center text-[0.9rem] font-bold text-gray-500">
          Storage:
        </div>
        <div className="h-full w-[80%] flex items-center justify-center ">
          <div className=" flex h-[30%]  w-full items-center justify-center ">
            <SliderComponent
              data={storageData}
              storageState={storageState}
              setStorageState={setStorageState}
            />
          </div>
        </div>
      </div>
      <div className="flex h-[30%] w-full ">
        <div className="flex h-full w-[20%]  items-center justify-center text-[0.9rem] font-bold text-gray-500">
          Colors:
        </div>
        <div className="w-[80%]">
          <ColorSlider
            colorData={colorData}
            colorState={colorState}
            setColorState={setColorState}
          />
        </div>
      </div>
    <div className="mb-2 flex h-[25%] landscape:h-[3rem] landscape:my-2 w-full items-center justify-center gap-6 rounded-t-3xl bg-white p-2">
        <div className="flex h-full w-[40%] items-center justify-center rounded-3xl py-4  text-[1.5rem] font-bold text-gray-500">
        ₵ {"1200"}
        </div>
        <button
        onClick={handleOnClick}
        disabled={isDisabled}
        className="flex h-full w-[40%] items-center justify-center rounded-2xl bg-[#ff0066] text-[1.2rem] font-bold text-white">
          Add To Cart
        </button>
        <div className=""></div>
      </div>
    </div>
  );
}
