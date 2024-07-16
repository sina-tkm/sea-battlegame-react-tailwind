import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function FightBoardTwo({
  setPlayerBoardTwo,
  playerBoardTwo,
  onClick,
  shipPlayerTwo,
}) {
  const [winner, setWinner] = useState(false);
  const [clicked, setClick] = useState(false);

  const navigate = useNavigate();

  const handleAlert = () => {
    setTimeout(() => {
      const hitCount = playerBoardTwo.filter((cell) => cell.hit).length;
      if (hitCount < 14) {
        alert("player1:are you ready?");
      }
      navigate("/fight/one");
      setClick(false);
    }, 1000);
  };
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
            return { ...c, hit: true, clicked: true };
          } else {
            return { ...c, miss: true, clicked: true };
          }
        }
        return c;
      });
    });
    setClick(true);
  };

  return (
    <div className='whole-chart'>
      <h1>player 1</h1>
      <div className='board_one-grid'>
        {playerBoardTwo.map((cell, index) => {
          return (
            <button
              key={index}
              onClick={() => {
                onClick(index);
                handleShot(cell);
                handleAlert();
              }}
              disabled={clicked}
              className={`board-one ${cell.hit ? "hit" : ""} ${
                cell.miss ? "miss" : ""
              }`}
            >
              {shipPlayerTwo.length > 0 && cell.ship ? "⛴️" : ""}
              {cell.hit ? "☄️ " : ""}
              {cell.miss ? "🌊" : ""}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default FightBoardTwo;
