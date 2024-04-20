import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import NavBar from "../../components/ui/NavBar";
import { Comfortaa, Roboto  } from "@next/font/google";
import Providers from "./GlobalRedux/providers";
import { SheetComponent } from "../../components/ui/sheet";

const comfotaa = Comfortaa({
  weight: ["300", "400", "700", "500", "600"],
  subsets: ["latin"],
});

const RobotoFont = Roboto({
  weight: ["100", "400", "700", "900"],
  subsets: ["latin"],
}); 

export default function App({ Component, pageProps }) {
  return (
    <div className={`${comfotaa.className} m-0 p-0`}>
      <Providers>
        <div className="absolute left-4 top-4 z-20 ">
          <SheetComponent />
        </div>
        <Component {...pageProps} />
      </Providers>
    </div>
  );
}
