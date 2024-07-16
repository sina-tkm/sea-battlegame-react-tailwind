import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function FightBoardOne({
  setPlayerBoardOne,
  onClick,
  shipPlayerTwo,
  playerBoardOne,
  shipPlayerOne,
}) {
  // const [ShotOne, setShotsOne] = useState();
  const [WinnerOne, setWinnerOne] = useState(false);

  const navigation = useNavigate();

  const handleNavigate = () => {
    alert("Are you sure you want to navigate?");
    navigation(-1);
  };

  useEffect(() => {
  
      const hitCount = playerBoardOne.filter((cell) => cell.hit).length;
      if (hitCount === 14) {
        setWinnerOne(true);
        navigation("/winner");
      }
   

  
  }, [playerBoardOne, navigation]);

  const handleShot = (cell) => {
    setPlayerBoardOne((prevShots) => {
      return prevShots.map((c) => {
        if (c.id === cell.id) {
          if (cell.ship !== null) {
            console.log(`Hit at cell: ${cell.id}`);
            return { ...c, hit: true, clicked: true };
          } else {
            console.log(`Miss at cell: ${cell.id}`);
            return { ...c, miss: true, clicked: true };
          }
        }
        return c;
      });
    });
    console.log("Updated cell:", cell);
  };

  return (
    <div className='whole-chart'>
      <h1>Player 2</h1>
      <div className='board_one-grid'>
        {playerBoardOne.map((cell, index) => (
          <div
            key={index}
            onClick={() => {
              onClick(index);
              handleShot(cell);
            }}
            className='board-one'
          >
            {shipPlayerTwo.length > 0 && cell.ship ? "S" : ""}{" "}
            {cell.hit ? "☄️ " : ""}
            {cell.miss ? "🌊" : ""}
          </div>
        ))}
      </div>
      <button>
        {shipPlayerOne.length <= 0 ? (
          <Link onClick={() => handleNavigate()}>Change Player</Link>
        ) : (
          <div>Change Player</div>
        )}
      </button>
    </div>
  );
}

export default FightBoardOne;
