import { createContext, useContext, useEffect, useState } from "react";
import { arrayOfObjects, arrayOfObjectsPlus } from "../../jsFoldre/constant";

const AppContext = createContext();

const SHIPS = [
  { size: 2, name: "support" },
  { size: 3, name: "Destroyer" },
  { size: 4, name: "Battleship" },
  { size: 5, name: "Carrier" },
];
function AppProvider({ children }) {
  const [playerBoardOne, setPlayerBoardOne] = useState([]);
  const [playerBoardTwo, setPlayerBoardTwo] = useState([]);
  const [shipPlayerOne, setShipPlayerOne] = useState([...SHIPS]);
  const [shipPlayerTwo, setShipPlayerTwo] = useState([...SHIPS]);
  const [orientation, setOrientation] = useState("horizontal");

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
    <AppContext.Provider
      value={{
        toggleOrientation,
        setPlayerBoardTwo,
        setPlayerBoardOne,
        handleCellClick,
        handleCellClickTwo,
        playerBoardOne,
        playerBoardTwo,
        shipPlayerOne,
        shipPlayerTwo,
        orientation,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;


export function useGameProvider(){
return useContext(AppContext)
}