import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function FightBoardOne({
  setPlayerBoardOne,
  onClick,
  shipPlayerTwo,
  playerBoardOne,
}) {
  const [WinnerOne, setWinnerOne] = useState(false);
  const [clicked, setClick] = useState(false);

  const navigation = useNavigate();

  const handleNavigate = () => {
    setTimeout(() => {
      const hitCount = playerBoardOne.filter((cell) => cell.hit).length;
      if (hitCount < 14) {
        alert("are you ready?");
      }
      navigation(-1);
      setClick(false);
    }, 1000);
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
      <h1>Player 2</h1>
      <div className='board_one-grid'>
        {playerBoardOne.map((cell, index) => (
          <button
            key={index}
            onClick={() => {
              onClick(index);
              handleShot(cell);
              handleNavigate();
            }}
            disabled={clicked}
            className='board-one'
          >
            {shipPlayerTwo.length > 0 && cell.ship ? "S" : ""}{" "}
            {cell.hit ? "☄️ " : ""}
            {cell.miss ? "🌊" : ""}
          </button>
        ))}
      </div>
    </div>
  );
}

export default FightBoardOne;
