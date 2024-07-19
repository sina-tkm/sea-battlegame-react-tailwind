import Board from "./components/BoardOne";
import BoardTwo from "./components/BoardTwo";
import "./index.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import PlaceLayout from "./components/PlaceLayout";
import Winner from "./components/Winner";
import FightLayout from "./components/FightLayout";
import FightBoardTwo from "./components/FightBoardTwo";
import FightBoardOne from "./components/FightBoardOne";

function App() {
  return (
    <div className=' flex flex-col w-full gap-y-2 items-center justify-center  px-[30px] pt-4'>
      <div className='flex items-center justify-center w-full'>
        <h1 className='font-semibold text-[24px] lg:text-[38px] text-white  w-fit font-newFont border-2 shadow-box p-[12px] rounded-lg border-white'>
          Sea Battle
        </h1>
      </div>
      <div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='place' element={<PlaceLayout />}>
            <Route index element={<Board />} />
            <Route path='one' element={<BoardTwo />} />
          </Route>
          <Route path='fight' element={<FightLayout />}>
            <Route index element={<FightBoardTwo />} />
            <Route path='one' element={<FightBoardOne />} />
          </Route>
          <Route path='winner' element={<Winner />} />
        </Routes>
      </div>
      
    </div>
  );
}

export default App;
