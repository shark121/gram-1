import Options from "../../components/Options";
import Icon from "../images/svgImages/gram";
import Customize from "../../components/customize";
import Colors from "../../components/Colors";
import StorageOptions from "../../components/storageOptions";



export default function Show() {
  return (
    <div className=" flex h-screen  w-full md:w-[30rem] items-end justify-center">
      <div className="h-[50%] w-full">
        {/* <Colors colors={colorData}/> */}
        <StorageOptions/>
      </div>
    </div>
  );
}
