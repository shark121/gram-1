import { Button } from "../../shadcn/components/ui/button";
import { Input } from "../../shadcn/components/ui/input";
import Link from "next/link";
import { Label } from "../../shadcn/components/ui/label";
import { CgMenuLeft } from "react-icons/cg";
import { AiOutlineBars } from "react-icons/ai";
import { motion as m } from "framer-motion";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../shadcn/components/ui/sheet";

const SheetData = [
  {
    name: "home",
    link: "/",
  },
  {
    name: "user",
    link: "/userPage",
  },
  {
    name: "watches",
    link: "/watches",
  },
{
  name: "phones",
  link: "/phones",

},
{
  name: "airpods",
  link: "/airpods",
},
  {
    name: "cart",
    link: "/cart",
  },
];

export function SheetComponent() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <AiOutlineBars className="h-[2.5rem] w-[2rem] cursor-pointer " />
      </SheetTrigger>
      <SheetContent side={"left"}>
        <div className="flex flex-col gap-4 text-[2rem] font-thin">
          {SheetData.map((data, index) => (
            <m.div
              key={index}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, staggerDirection: 1 }}
              onClick={()=> sessionStorage.setItem("collection", data.name)}
            >
              <SheetClose asChild>
                <Link href={data.link}>{data.name}</Link>
              </SheetClose>
            </m.div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
