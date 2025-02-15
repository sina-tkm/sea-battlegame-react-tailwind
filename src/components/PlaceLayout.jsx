import { Outlet } from "react-router-dom";
import { ArrowUpIcon } from "@heroicons/react/16/solid";
import { ArrowRightIcon } from "@heroicons/react/16/solid";
import { useGameProvider } from "./contexts/AppProvider";

function PlaceLayout() {
  const { toggleOrientation, orientation } = useGameProvider();
 
  return (
    <div>
      <Outlet />
      <div
        onClick={toggleOrientation}
        className='controls hint-game border-4 rounded-md flex justify-center w-full mt-2'
      >
        <button className='flex '>
          Toggle Orientation ({orientation}){" "}
          {orientation === "horizontal" ? (
            <ArrowRightIcon className='w-[20px] h-[20px]' />
          ) : (
            <ArrowUpIcon className='w-[20px] h-[20px]' />
          )}
        </button>
      </div>
    </div>
  );
}

export default PlaceLayout;
