import { useState } from "react";

export default function SignUPComponent(requestOTP, setSignIn, setNumberState) {
  const [FirstNameState, setNameState] = useState();
  const [LastNameState, setLastNameState] = useState("");
  let [locationState, setLocationState] = useState("");

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showLocation);
    } else {
      x.innerHTML = "Geolocation is not supported by this browser.";
    }

    function showLocation(position) {
      let location =  "Lat:"+ position.coords.latitude + "\n  Lng: " + position.coords.longitude
      console.log(position);

      setLocationState(location)
    }
  }

  function handleSubmit() {
    requestOTP();
  }

  return (
    <div>
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Create Account
      </h2>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm  ">
        <form className="space-y-6" action="#" method="POST">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              First Name
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="text"
                autoComplete="name"
                required
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm outline-none ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#ff0066] sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Last Name
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="text"
                autoComplete="name"
                required
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm outline-none ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#ff0066] sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className=" flex justify-between text-sm font-medium leading-6 text-gray-900"
            >
              <p>Location(City)</p>{" "}
              <button
                className="font-semibold leading-6 text-[#ff0066] hover:text-[#ff0066]/50"
                onClick={getLocation}
              >
                Use Maps
              </button>
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="text"
                autoComplete="address"
                defaultValue={locationState}
                required
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm outline-none ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#ff0066] sm:text-sm sm:leading-6"
              />
            </div>
            <div className="h-full w-[2rem] rounded-lg bg-red-400"></div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Phone Number
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="string"
                autoComplete="phone number"
                required
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm outline-none ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#ff0066] sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-[#ff0066] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff0066]"
              onClick={handleSubmit}
              id="signInButton"
            >
              Create Account
            </button>
            <div
              className=" mt-4 flex items-center justify-center"
              id="recaptcha-container"
            ></div>
          </div>
        </form>
        <p className="mb-4 mt-2 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <button
            href="#"
            className="font-semibold leading-6 text-[#ff0066] hover:text-[#ff0066]/50"
            onClick={() => {
              setSignIn(!signInState);
            }}
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
}
