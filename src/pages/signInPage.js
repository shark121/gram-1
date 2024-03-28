import Icon from "@/images/svgImages/gram";
import {
  getAuth,
  signInWithPhoneNumber,
  PhoneAuthProvider,
  RecaptchaVerifier,
  updateProfile,
} from "firebase/auth";
import { app, database } from "../../firebaseConfig";
import { useEffect, useState } from "react";
import SignInComponent from "../../components/verification/signInComponent";
import SignUPComponent from "../../components/verification/SignUpComponent";
import OtpVerify from "../../components/verification/otpVerify";
import { setDoc, doc, collection, addDoc } from "firebase/firestore";
import { data } from "autoprefixer";
import { useRouter } from "next/router";

export default function SignInPage() {
  const router = useRouter();
  const [numberState, setNumberState] = useState("");
  const [signIn, setSignIn] = useState(true);
  const [userDetailsState, setUserDetailsState] = useState({});
  const [responseState, setResponseState] = useState({});
  const [userOtpState, setUserOtpState] = useState("");
  const [showVerifyState, setShowVerifyState] = useState(false);

  const auth = getAuth(app);

  async function confirmResponse(enteredOTP) {
    await responseState.confirm(enteredOTP).then(async (response) => {
      console.log(response);
      let currentUserID = response.user.uid;
      let userMetaData = response.user.metadata;
      // console.log(response.user.providerInfo);

      setShowVerifyState(false);
      await updateProfile(auth.currentUser, {
        displayName: userDetailsState.name,
      });

      let userCollectionRef = collection(
        database,
        "USERS",
        currentUserID,
        "details"
      );

      if (!signIn) {
        console.log(userDetailsState.firstName)
        await setDoc(
          doc(collection(database, "NUMBERS"), userDetailsState.phoneNumber),
          {
            currentUserID,
            firstName : userDetailsState.firstName
          }
        );

        await addDoc(userCollectionRef, {
          name: userDetailsState.name,
          createdAt: userMetaData.creationTime,
          phoneNumber: userDetailsState.phoneNumber,
          location: userDetailsState.location,
        }).then((response) => {
          window.alert("user account update sucessful");
          router.push("/cart");
          return;
        });
      }
      router.push("/cart");

    });
  }

  async function requestOTP(number) {
    function setUpRecaptcha() {
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
        setShowVerifyState(true);
      })
      .catch((err) => {
        console.log(err);
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
                setUserDetailsState={setUserDetailsState}
              />
            ) : (
              <SignUPComponent
                requestOTP={requestOTP}
                setSignIn={setSignIn}
                signInState={signIn}
                setNumberState={setNumberState}
                setUserDetailsState={setUserDetailsState}
              />
            )}
          </div>
          {showVerifyState ? (
            <OtpVerify
              setUserOtpState={setUserOtpState}
              confirmResponse={confirmResponse}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
