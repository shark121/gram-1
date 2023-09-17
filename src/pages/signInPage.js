import Icon from "@/images/svgImages/gram";
import {
  getAuth,
  signInWithPhoneNumber,
  RecaptchaVerifier,
} from "firebase/auth";
import { app } from "../../firebaseConfig";
import { useEffect, useState } from "react";
import SignInComponent from "../../components/signInComponent";
import SignUPComponent from "../../components/SignUpComponent";
import OtpVerify from "../../components/otpVerify";

export default function SignInPage() {
  const [numberState, setNumberState] = useState("+233507462509");
  const [signIn, setSignIn] = useState(true);
  const [responseState, setResponseState] = useState({});
  const [userOtpState, setUserOtpState] = useState("");
  const [showVerifyState, setShowVerifyState] = useState(false);

  const phoneNumber = "+233507462509";
  const auth = getAuth(app);

  async function confirmResponse(enteredOTP) {
  let verify = await responseState.confirm(enteredOTP);
  // showVerifyState(true)

  return verify
}



  async function requestOTP() {
    function setUpRecaptcha(number) {
      const recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {},
        auth
      );
      recaptchaVerifier.render();
      return signInWithPhoneNumber(auth, number, recaptchaVerifier);
    }

    setUpRecaptcha(numberState)
      .then((response) => {
        console.log(response);
        setResponseState(response);
        setShowVerifyState(true)
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  return (
    <div className="h-screen w-screen overflow-x-hidden">
      <div className="ite flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="flex h-[10rem] w-full items-center justify-center ">
            <Icon />
          </div>
          <div>
            {signIn ? (
              <SignInComponent
                requestOTP={requestOTP}
                setSignIn={setSignIn}
                signInState={signIn}
                setNumberState={setNumberState}
              />
            ) : (
              <SignUPComponent
                requestOTP={requestOTP}
                setSignIn={setSignIn}
                signInState={signIn}
                setNumberState={setNumberState}
              />
            )}
          </div>
          {showVerifyState ? (
            <OtpVerify setUserOtpState={setUserOtpState} confirmResponse={confirmResponse} />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
