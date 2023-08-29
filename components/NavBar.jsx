import Image from "next/image"
import Logo from "../src/images/Logo.png"


function NavBar(props){

  return(
    <div className="w-screen h-[8%]  flex justify-center items-center  p-4 relative ">
      <Image src={Logo} fill className="object-cover"  />
    </div>
  )

}


export default NavBar