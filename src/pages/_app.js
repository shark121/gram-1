import "@/styles/style.css";
import "tailwindcss/tailwind.css";
import NavBar from "../../components/NavBar";
import { Comfortaa } from "@next/font/google";


const comfotaa = Comfortaa({
  weight:"400",
  subsets: ["latin"]
})

export default function App({ Component, pageProps }) {
  return (
    <div className={`${comfotaa.className} min-h-screen min-w-screen`}>
      <Component {...pageProps} />
    </div>
  );
}
