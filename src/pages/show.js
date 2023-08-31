import Options from "../../components/Options";
import Icon from "../images/svgImages/gram";
import Customize from "../../components/customize";

export default function Show() {
  return (
    <div className=" flex h-screen bg-blue-300 w-full md:w-[30rem] items-end justify-center">
      <div className="h-[50%] w-full">
        <Customize />
      </div>
    </div>
  );
}
