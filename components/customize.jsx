export default function Customize() {
  return (
    <div className="flex h-full w-full flex-col gap-4 rounded-t-2xl bg-gray-100">
      <div className=" h-[20%] w-full rounded-t-2xl bg-red-400 text-[2rem] font-bold">
        I PHONE X
      </div>
      <div className="h-[20%] bg-yellow-200 ">sizes</div>
      <div className="h-[20%] bg-blue-100">color</div>
      <div className="flex h-[20%] justify-between bg-green-200">
        <div className="">price</div>
        <button className="">add to cart</button>
      </div>
    </div>
  );
}
