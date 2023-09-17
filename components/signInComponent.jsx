


export default function SignInComponent({requestOTP, setSignIn, signInState}){

    return(
        <div>
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Sign in to your account
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
              type="email"
              autoComplete="email"
              required
              className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm outline-none ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#ff0066] sm:text-sm sm:leading-6"
            />
          </div>
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
              autoComplete="current-password"
              required
              className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm outline-none ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#ff0066] sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-[#ff0066] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff0066]"
            onClick={requestOTP}
            id="signInButton"
          >
            Sign in
          </button>
          <div
            className=" mt-4 flex items-center justify-center"
            id="recaptcha-container"
          ></div>
        </div>
      </form>
      <p className="mt-4 text-center text-sm text-gray-500">
        No Account?{" "}
        <button
          href="#"
          className="font-semibold leading-6 text-[#ff0066] hover:text-[#ff0066]/50"
          onClick={()=>{setSignIn(!signInState)}}
        >
          Sign Up
        </button>
     </p>
    </div>
    </div>
    )
}