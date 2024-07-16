import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function FightBoardTwo({
  setPlayerBoardTwo,
  playerBoardTwo,
  onClick,
  shipPlayerTwo,
}) {
  const [winner, setWinner] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const hitCount = playerBoardTwo.filter((cell) => cell.hit).length;
    if (hitCount === 14) {
      setWinner(true);
      navigate("/winner");
    }
  }, [playerBoardTwo, navigate]);

  const handleShot = (cell) => {
    setPlayerBoardTwo((prevShots) => {
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
      <h1>player 1</h1>
      <div className='board_one-grid'>
        {playerBoardTwo.map((cell, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                onClick(index);
                handleShot(cell);
              }}
              className={`board-one ${cell.hit ? "hit" : ""} ${
                cell.miss ? "miss" : ""
              }`}
            >
              {shipPlayerTwo.length > 0 && cell.ship ? "⛴️" : ""}
              {cell.hit ? "☄️ " : ""}
              {cell.miss ? "🌊" : ""}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FightBoardTwo;
