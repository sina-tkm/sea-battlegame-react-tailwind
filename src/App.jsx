import { useState } from "react";
import Board from "./components/BoardOne";
import BoardTwo from "./components/BoardTwo";
import "./index.css";

function App() {
  const [position, setPosition] = useState(false);
  const [players, setPlayers] = useState("player1");  
  // const [clickOne,setClickOne] =useState(false)
  // const [clickTwo,setClickTwo] =useState(false)

  const [shipPlayerOne, setShipPlayerOne] = useState([]);
  const [shipPlayerTwo, setShipPlayerTwo] = useState([]);
  const [selectIdTwo, setSelectIdTwo] = useState([]);
  const [selectIdOne, setSelectIdOne] = useState([]);

  const winneOner = shipPlayerTwo.every((ship) => selectIdOne.includes(ship));
  const winnerTow = shipPlayerOne.every((ship) => selectIdTwo.includes(ship));
  const handleShip = (ship) => {
    if (shipPlayerOne.length <= 3 && players === "player1") {
      setShipPlayerOne((prev) => {
        if (prev.includes(ship)) {
          alert("duplicate item");
          return prev;
        } else{
          return [...prev, ship];
        }
      
      });
      
    }
    if (shipPlayerOne.length === 3) {
    
      setPlayers("player2");
      setPosition(true);
      alert("switch player");
     
    }

  };

  const hanldeShipTwo = (ship) => {
    if (shipPlayerTwo.length <= 3 && players === "player2") {
      setShipPlayerTwo((prev) => {
        if (prev.includes(ship)) {
          alert("duplicate item");
          return prev;
        } else {
          return [...prev, ship];
        }
      });
    }
    if (shipPlayerTwo.length === 3) {
    
      setPlayers("player1");
      setPosition(false);
      alert("lets fight");

     
    }
  };
 
  const handleChange = () => {
    if (shipPlayerOne.length >= 3 || shipPlayerTwo.length >= 3) {
      setTimeout(() => {
        setPosition(!position);
      }, 1800);
    }
  };
  const handleChangeTwo = () => {
    if (shipPlayerTwo.length >= 3) {
  
      setTimeout(() => {
        setPosition(!position);
      }, 1800);
    }
  };
  const handleReset = () => {
    setSelectIdOne([]);
    setSelectIdTwo([]);
    setPlayers("player1");
    setShipPlayerOne([]);
    setShipPlayerTwo([]);
    setPosition(false);
  };

  return (
    <div className=' app-class'>
      <div className='reading-help'>
        {shipPlayerOne.length <= 3 && !position ? (
          <div>
            <h1>select player1 shipplacement</h1>
          </div>
        ) : (
          ""
        )}
        {shipPlayerTwo.length <= 3 && position ? (
          <div>
            <h1>select player2 shipplacement</h1>
          </div>
        ) : (
          ""
        )}
      </div>
      <div></div>
      <div className='board-game'>
        {!position ? (
          <Board
         
            shipPlayerTwo={shipPlayerTwo}
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
            shipPlayerOne={shipPlayerOne}
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
      <div className='report-winner'>
        <h1>{winneOner && selectIdOne.length > 4 ? "player1 : winner" : ""}</h1>
        <h1>{winnerTow && selectIdTwo.length > 4 ? "player2 : winner" : ""}</h1>
        {winneOner && selectIdOne.length > 4 ? (
          <button className='reset-button' onClick={() => handleReset()}>
            {" "}
            play again{" "}
          </button>
        ) : (
          ""
        )}
        {winnerTow && selectIdTwo.length > 4 ? (
          <button className='reset-button' onClick={() => handleReset()}>
            play again
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default App;
