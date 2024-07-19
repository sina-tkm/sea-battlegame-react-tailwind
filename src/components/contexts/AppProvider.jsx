import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { arrayOfObjects, arrayOfObjectsPlus } from "../../constant.js/constant";

const AppContext = createContext();

const SHIPS = [
  { size: 2, name: "support" },
  { size: 3, name: "Destroyer" },
  { size: 4, name: "Battleship" },
  { size: 5, name: "Carrier" },
];

const INITIAL = {
  playerBoardOne: [],
  playerBoardTwo: [],
  shipPlayerOne: [...SHIPS],
  shipPlayerTwo: [...SHIPS],
};

function reducerFunction(state, action) {
  switch (action.type) {
    case "add":
      return {
        ...state,
        playerBoardOne: action.payload.payloadone,
        playerBoardTwo: action.payload.payloadTwo,
      };
    case "slice":
      return {
        ...state,
        shipPlayerOne: state.shipPlayerOne.slice(1),
      };
    case "newone":
      return {
        ...state,
        playerBoardOne: action.payload,
      };
    case "slicetwo":
      return {
        ...state,
        shipPlayerTwo: state.shipPlayerTwo.slice(1),
      };
    case "newtwo":
      return {
        ...state,
        playerBoardTwo: action.payload,
      };
    case "handleshot_two":
      return {
        ...state,
        playerBoardTwo: state.playerBoardTwo.map((c) => {
          if (c.id === action.payload.id) {
            if (c.ship !== null) {
              return { ...c, hit: true, clicked: true };
            } else {
              return { ...c, miss: true, clicked: true };
            }
          }
          return c;
        }),
      };
    case "handleshot_One":
      return {
        ...state,
        playerBoardOne: state.playerBoardOne.map((c) => {
          if (c.id === action.payload.id) {
            if (c.ship !== null) {
              return { ...c, hit: true, clicked: true };
            } else {
              return { ...c, miss: true, clicked: true };
            }
          }
          return c;
        }),
      };
    default:
      return state;
  }
}

function AppProvider({ children }) {
  const [orientation, setOrientation] = useState("horizontal");
  const [state, dispatch] = useReducer(reducerFunction, INITIAL);
  const { playerBoardOne, playerBoardTwo, shipPlayerOne, shipPlayerTwo } =
    state;

  useEffect(() => {
    dispatch({
      type: "add",
      payload: {
        payloadone: initializeBoard([...arrayOfObjects]),
        payloadTwo: initializeBoard([...arrayOfObjectsPlus]),
      },
    });
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
      const canPlaceParams = {
        board: newBoardOne,
        shipSize: shipOne.size,
        startId: cellOne.id,
        orientation,
      };
      if (canPlaceShip(canPlaceParams)) {
        placeShip(
          newBoardOne,
          shipOne.size,
          cellOne.id,
          orientation,
          shipOne.name
        );
        dispatch({ type: "slice" });
        dispatch({ type: "newone", payload: newBoardOne });
      }
    }
  };

  const handleCellClickTwo = (index) => {
    const newBoardTwo = [...playerBoardTwo];
    const cellTwo = newBoardTwo[index];

    if (shipPlayerTwo.length > 0) {
      const shipTwo = shipPlayerTwo[0];

      const canPlaceParams = {
        board: newBoardTwo,
        shipSize: shipTwo.size,
        startId: cellTwo.id,
        orientation,
      };

      if (canPlaceShip(canPlaceParams)) {
        placeShip(
          newBoardTwo,
          shipTwo.size,
          cellTwo.id,
          orientation,
          shipTwo.name
        );
        dispatch({ type: "slicetwo" });
        dispatch({ type: "newtwo", payload: newBoardTwo });
      }
    }
  };

  const canPlaceShip = ({ board, shipSize, startId, orientation }) => {
    if (!Array.isArray(board)) {
      console.error("Expected board to be an array");
      return false;
    }

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

  const handleShot = (cell) => {
    dispatch({ type: "handleshot_two", payload: cell });
  };

  const handleShotOne = (cell) => {
    dispatch({ type: "handleshot_One", payload: cell });
  };

  return (
    <AppContext.Provider
      value={{
        toggleOrientation,
        handleShot,
        handleShotOne,
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

export function useGameProvider() {
  return useContext(AppContext);
}
