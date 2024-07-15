import { Outlet } from "react-router-dom"

function PlaceLayout({toggleOrientation,orientation}) {
  return (
    <div>
        <Outlet/>
        <div className='controls'>
        <button onClick={toggleOrientation}>
          Toggle Orientation ({orientation})
        </button>
      </div>
    </div>
  )
}

export default PlaceLayout