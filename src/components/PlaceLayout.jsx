import { Outlet } from "react-router-dom"

function PlaceLayout({toggleOrientation,orientation}) {
  return (
    <div>
        <Outlet/>
        <div className='controls hint-game border-4 rounded-md flex justify-center w-full mt-2'>
        <button onClick={toggleOrientation}>
          Toggle Orientation ({orientation})
        </button>
      </div>
    </div>
  )
}

export default PlaceLayout