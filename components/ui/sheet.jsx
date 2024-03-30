import { Button } from "../../shadcn/components/ui/button";
import { Input } from "../../shadcn/components/ui/input";
import Link from "next/link";
import { Label } from "../../shadcn/components/ui/label";
import { CgMenuLeft } from "react-icons/cg";
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

export function SheetComponent() {
  return (
    <Sheet>
      <SheetTrigger asChild>
          <CgMenuLeft className="h-[2rem] w-[2rem] cursor-pointer " />
      </SheetTrigger>
      <SheetContent side={"left"}>
        {/* <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader> */}
        <div className="flex flex-col gap-4">
          <SheetClose asChild>
            <Link href="/">Home</Link>
          </SheetClose>
          <SheetClose asChild>
            <Link href="/userPage">User</Link>
          </SheetClose>
          <SheetClose asChild>
            <Link href="/cart">Cart</Link>
          </SheetClose>
        </div>
        {/* <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter> */}
      </SheetContent>
    </Sheet>
  );
}
