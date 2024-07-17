import { useEffect, useState } from "react";
import Board from "./components/BoardOne";
import BoardTwo from "./components/BoardTwo";
import "./index.css";
import { arrayOfObjects, arrayOfObjectsPlus } from "./jsFoldre/constant";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import PlaceLayout from "./components/PlaceLayout";
import Winner from "./components/Winner";
import FightLayout from "./components/FightLayout";
import FightBoardTwo from "./components/FightBoardTwo";
import FightBoardOne from "./components/FightBoardOne";
import shipBoard from '../public/shipBoard.jpg';

const SHIPS = [
  { size: 2, name: "support" },
  { size: 3, name: "Destroyer" },
  { size: 4, name: "Battleship" },
  { size: 5, name: "Carrier" },
];

function App() {
  const [playerBoardOne, setPlayerBoardOne] = useState([]);
  const [playerBoardTwo, setPlayerBoardTwo] = useState([]);
  const [shipPlayerOne, setShipPlayerOne] = useState([...SHIPS]);
  const [shipPlayerTwo, setShipPlayerTwo] = useState([...SHIPS]);
  const [orientation, setOrientation] = useState("horizontal"); // State to track orientation

  useEffect(() => {
    setPlayerBoardOne(initializeBoard([...arrayOfObjects]));
    setPlayerBoardTwo(initializeBoard([...arrayOfObjectsPlus]));
  }, []);

  const initializeBoard = (board) => {
    return board.map((cell) => ({
      ...cell,
      ship: null,
      clicked: false,
      miss: false,
      hit: false,
    }));
  };

  const handleCellClick = (index) => {
    const newBoardOne = [...playerBoardOne];
    const cellOne = newBoardOne[index];

    if (shipPlayerOne.length > 0) {
      const shipOne = shipPlayerOne[0];
      if (canPlaceShip(newBoardOne, shipOne.size, cellOne.id, orientation)) {
        placeShip(
          newBoardOne,
          shipOne.size,
          cellOne.id,
          orientation,
          shipOne.name
        );
        setShipPlayerOne(shipPlayerOne.slice(1));
        setPlayerBoardOne(newBoardOne);
      }
    }
  };

  const handleCellClickTwo = (index) => {
    const newBoardTwo = [...playerBoardTwo];
    const cellTwo = newBoardTwo[index];

    if (shipPlayerTwo.length > 0) {
      const shipTwo = shipPlayerTwo[0];

      if (canPlaceShip(newBoardTwo, shipTwo.size, cellTwo.id, orientation)) {
        placeShip(
          newBoardTwo,
          shipTwo.size,
          cellTwo.id,
          orientation,
          shipTwo.name
        );
        setShipPlayerTwo(shipPlayerTwo.slice(1));
        setPlayerBoardTwo(newBoardTwo);
      }
    }
  };

  const canPlaceShip = (board, shipSize, startId, orientation) => {
    const startIdx = board.findIndex((cell) => cell.id === startId);
    const rowSize = Math.sqrt(board.length);

    if (orientation === "horizontal") {
      if ((startIdx % rowSize) + shipSize > rowSize) {
        return false;
      }

      for (let i = 0; i < shipSize; i++) {
        const cell = board[startIdx + i];
        if (cell.ship !== null) {
          return false;
        }
      }
    } else if (orientation === "vertical") {
      if (startIdx + shipSize * rowSize > board.length) {
        return false;
      }

      for (let i = 0; i < shipSize; i++) {
        const cell = board[startIdx + i * rowSize];
        if (cell.ship !== null) {
          return false;
        }
      }
    }

    return true;
  };

  const placeShip = (board, shipSize, startId, orientation, shipName) => {
    const startIdx = board.findIndex((cell) => cell.id === startId);
    const rowSize = Math.sqrt(board.length);
    if (orientation === "horizontal") {
      for (let i = 0; i < shipSize; i++) {
        board[startIdx + i].ship = shipName;
      }
    } else if (orientation === "vertical") {
      for (let i = 0; i < shipSize; i++) {
        board[startIdx + i * rowSize].ship = shipName;
      }
    }
  };

  const toggleOrientation = () => {
    setOrientation(orientation === "horizontal" ? "vertical" : "horizontal");
  };

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
          <Route
            path='place'
            element={
              <PlaceLayout
                toggleOrientation={toggleOrientation}
                orientation={orientation}
              />
            }
          >
            <Route
              index
              element={
                <Board
                  onClick={(index) => handleCellClick(index)}
                  playerBoardOne={playerBoardOne}
                  shipPlayerOne={shipPlayerOne}
                  shipPlayerTwo={shipPlayerTwo}
                />
              }
            />
            <Route
              path='one'
              element={
                <BoardTwo
                  onClick={(index) => handleCellClickTwo(index)}
                  playerBoardTwo={playerBoardTwo}
                  shipPlayerTwo={shipPlayerTwo}
                />
              }
            />
          </Route>
          <Route path='fight' element={<FightLayout />}>
            <Route
              index
              element={
                <FightBoardTwo
                  onClick={(index) => handleCellClickTwo(index)}
                  setPlayerBoardTwo={setPlayerBoardTwo}
                  playerBoardTwo={playerBoardTwo}
                  shipPlayerTwo={shipPlayerTwo}
                />
              }
            />
            <Route
              path='one'
              element={
                <FightBoardOne
                  onClick={(index) => handleCellClick(index)}
                  setPlayerBoardOne={setPlayerBoardOne}
                  playerBoardOne={playerBoardOne}
                  shipPlayerOne={shipPlayerOne}
                  shipPlayerTwo={shipPlayerTwo}
                />
              }
            />
          </Route>
          <Route path='winner' element={<Winner />} />
        </Routes>
      </div>
      <img src={shipBoard} alt='ship' className='ship-picture' />
    </div>
  );
}

export default App;
