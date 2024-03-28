import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import NavBar from "../../components/ui/NavBar";
import { Comfortaa } from "@next/font/google";
import Providers from "./GlobalRedux/providers";
import { SheetComponent } from "../../components/ui/sheet";

const comfotaa = Comfortaa({
  weight: "400",
  subsets: ["latin"],
});

export default function App({ Component, pageProps }) {
  return (
    <div className={`${comfotaa.className} m-0 p-0`}>
      <Providers>
        {/* <SheetComponent /> */}
        <Component {...pageProps} />
      </Providers>
    </div>
  );
}
