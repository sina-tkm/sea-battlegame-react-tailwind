import { useState } from "react";
import Board from "./components/BoardOne";
import BoardTwo from "./components/BoardTwo";
import "./index.css";

function App() {
  const [position, setPosition] = useState(false);
  const [players, setPlayers] = useState("player1");
  const [shipPlayerOne, setShipPlayerOne] = useState([]);
  const [shipPlayerTwo, setShipPlayerTwo] = useState([]);
  const [selectIdTwo, setSelectIdTwo] = useState([]);
  const [selectIdOne, setSelectIdOne] = useState([]);

  const handleShip = (ship) => {
    if (shipPlayerOne.length <= 3 && players === "player1") {
      setShipPlayerOne((prev) => [...prev, ship]);
    }
    if (shipPlayerOne.length === 3) {
      alert("switch player");
      setPlayers("player2");
      setPosition(true);
    }
  };

  const hanldeShipTwo = (ship) => {
    if (shipPlayerTwo.length <= 3 && players === "player2") {
      setShipPlayerTwo((prev) => [...prev, ship]);
    }
    if (shipPlayerTwo.length === 3) {
      alert(" switch player");
      setPlayers("player1");
      setPosition(false);
    }
  };
  const handleChange = () => {
    if (shipPlayerOne.length >= 3 || shipPlayerTwo.length >= 3) {
      setTimeout(() => {
        setPosition(!position);
      }, 300);
    }
  };
  const handleChangeTwo = () => {
    if (shipPlayerTwo.length >= 3) {
      setTimeout(() => {
        setPosition(!position);
      }, 300);
    }
  };

  return (
    <div className=' app-class'>
      {!position ? (
        <Board
        selectIdTwo={selectIdTwo}
          selectIdOne={selectIdOne}
          setSelectIdOne={setSelectIdOne}
          players={players}
          handleShip={handleShip}
          shipPlayerOne={shipPlayerOne}
          handleChange={handleChange}
        />
      ) : (
        <BoardTwo
        selectIdOne={selectIdOne}
          selectIdTwo={selectIdTwo}
          setSelectIdTwo={setSelectIdTwo}
          players={players}
          hanldeShipTwo={hanldeShipTwo}
          shipPlayerTwo={shipPlayerTwo}
          handleChangeTwo={handleChangeTwo}
        />
      )}
    </div>
  );
}

export default App;
