import { useRef, useState } from "react";

export default function OtpVerify({ setUserOtpState, confirmResponse }) {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const ref5 = useRef(null);
  const ref6 = useRef(null);

  const mobileInputRef = useRef(null);

  const [verificationCodeState, setVerificationCodeState] = useState("");

  function setRef(inputRef) {
    inputRef.current.focus();
  }

  function getVerificationCodeFromMobile() {

    let mobileVerification = mobileInputRef.current.value;
    
    setVerificationCodeState(mobileVerification)

    setUserOtpState(mobileVerification)

    console.log(verificationCodeState)

    mobileInputRef.current.value = ""
  }

  function getVerificationCodeFromDesktop() {
    let desktopVerification =
      ref1.current.value +
      ref2.current.value +
      ref3.current.value +
      ref4.current.value +
      ref5.current.value +
      ref6.current.value;

     setVerificationCodeState(desktopVerification)
     setUserOtpState(desktopVerification)
     
     confirmResponse(desktopVerification)


    console.log(desktopVerification)

    ref1.current.value = ""
    ref2.current.value = ""
    ref3.current.value = ""
    ref4.current.value = ""
    ref5.current.value = ""
    ref6.current.value = ""
  }

  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center ">
      <div className="absolute inset-0 z-20 flex items-center justify-center bg-[#28282B] opacity-80 backdrop-blur-[10px]"></div>

      {/* <div className="z-30 flex h-[15rem] w-[20rem] flex-col items-center justify-center rounded-2xl bg-gray-50 p-4 sm:hidden ">
        <div className="m-4 text-center font-bold text-gray-600">
          Verification code
        </div>
        <input
          ref={mobileInputRef}
          id="email"
          type="text"
          autoComplete="name"
          required
        //   onChange={}
          className="block h-[3rem]  w-full rounded-md border-0 p-1.5 text-center font-bold  text-gray-700 shadow-sm outline-none ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-2 sm:text-sm sm:leading-6"
        />
        <div className="mt-4 flex  h-[4rem] w-full items-center justify-between px-4 ">
          <button className="w-[7rem] rounded-lg p-[0.5rem] font-bold text-gray-500 ring-[1.5px]">
            cancel
          </button>
          <button 
          onClick={getVerificationCodeFromMobile}
          className=" w-[7rem] rounded-lg bg-[#3b83f6] p-[0.6rem] font-bold text-white ">
            verify
          </button>
        </div>
      </div> */}

      <div className=" z-30 hidden h-[20rem] w-[22rem]  flex-col rounded-3xl bg-gray-50 p-8 sm:flex sm:h-[15rem] sm:w-[35rem] sm:gap-4 sm:text-[1.5rem]">
        <div className="h-[7rem] w-full  text-center text-gray-500">
          Verification Code
        </div>
        <div className="flex h-[10rem] w-full items-center justify-center gap-2">
          <div className=" h-[4rem] w-[4rem]  rounded-lg bg-[#3b83f6] p-2 ">
            <input
              ref={ref1}
              className="h-full w-full bg-inherit  p-4 text-gray-100 outline-none"
              type={"text"}
              maxLength={1}
              onChange={() => setRef(ref2)}
            />
          </div>
          <div className="h-[4rem] w-[4rem]  rounded-lg bg-[#3b83f6] p-2  ">
            <input
              ref={ref2}
              className="h-full w-full bg-inherit p-4 text-gray-100 outline-none"
              type={"text"}
              maxLength={1}
              onChange={() => setRef(ref3)}
            />
          </div>
          <div className="h-[4rem] w-[4rem] rounded-lg bg-[#3b83f6] p-2 ">
            <input
              ref={ref3}
              className="h-full w-full bg-inherit p-4 text-gray-100 outline-none"
              type={"text"}
              maxLength={1}
              onChange={() => setRef(ref4)}
            />
          </div>
          <div className="h-[4rem] w-[4rem] rounded-lg bg-[#3b83f6] p-2 ">
            <input
              ref={ref4}
              className="h-full w-full bg-inherit p-4 text-gray-100 outline-none"
              type={"text"}
              maxLength={1}
              onChange={() => setRef(ref5)}
            />
          </div>
          <div className="h-[4rem] w-[4rem] rounded-lg bg-[#3b83f6] p-2 ">
            <input
              ref={ref5}
              className="h-full w-full bg-inherit p-4 text-gray-100 outline-none "
              type={"text"}
              maxLength={1}
              onChange={() => setRef(ref6)}
            />
          </div>
          <div className="h-[4rem] w-[4rem] rounded-lg bg-[#3b83f6] p-2 ">
            <input
              ref={ref6}
              className="h-full w-full bg-inherit p-4 text-gray-100 outline-none"
              type={"text"}
              maxLength={1}
            />
          </div>
        </div>
        <div className="mt-4 flex  h-[2rem] w-full items-center justify-center gap-6 px-8 ">
          <button className="w-[7rem] rounded-lg p-[0.1rem]  text-gray-500 ring-[1.5px]">
            cancel
          </button>
          <button 
          onClick={getVerificationCodeFromDesktop}
          className=" w-[7rem] rounded-lg bg-[#3b83f6] p-[0.1rem]  text-white ">
            verify
          </button>
        </div>
      </div>
    </div>
  );
}
