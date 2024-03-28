import ColorSlider from "./ui/color/ColorSlider";
import SliderComponent from "./ui/storage/Slider";


export default function Customize({
  typeState,
  storageData,
  colorData,
  storageState,
  colorState,
  setColorState,
  setStorageState,
  handleOnClick,
  isDisabled,
}) {
  return (
    <div className=" flex  w-full flex-col gap-6 justify-start rounded-b-[2rem]  bg-white sm:w-[35rem]">
      <div className="flex h-[20%] w-full items-center justify-center text-[1.5rem] font-bold text-[#ff0066]">
        {typeState}
      </div>
      <div className="flex h-[30%] w-full items-center justify-center">
        <div className="flex h-[30%] w-[20%]  items-center justify-center text-[0.9rem] font-bold text-gray-500">
          Storage:
        </div>
        <div className="flex h-full w-[80%] items-center justify-center ">
          <div className=" flex h-[40%]  w-full items-center justify-center ">
            <SliderComponent
              data={storageData}
              storageState={storageState}
              setStorageState={setStorageState}
            />
          </div>
        </div>
      </div>
      <div className="w-full flex">
        <div className="flex w-[20%]  items-center justify-center text-[0.9rem] font-bold text-gray-500 ">
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
      <div className=" flex h-[3rem] w-full items-center justify-center bg-black rounded-md ">
        <button
          onClick={handleOnClick}
          disabled={isDisabled}
          className="flex w-full  justify-center  text-[1.2rem] font-bold text-white"
        >
          Buy
        </button>
        <div className=""></div>
      </div>
    </div>
  );
}
