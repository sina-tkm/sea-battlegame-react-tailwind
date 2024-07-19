import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGameProvider } from "./contexts/AppProvider";

function FightBoardTwo() {
  const { handleShot, playerBoardTwo, shipPlayerTwo } = useGameProvider();
  const [ships, setShips] = useState([]);

  const navigate = useNavigate();

  const handleAlert = (cell) => {
    if (!cell.clicked) {
      const hitCount = playerBoardTwo.filter((cell) => cell.hit).length;
      if (hitCount === 14) {
        return;
      } else if (hitCount < 14) {
        setTimeout(() => {
          alert("player2 :are you ready?");
          navigate("/fight/one");
        }, 300);
      }
    } else {
      return;
    }
  };
  useEffect(() => {
    const hitCount = playerBoardTwo.filter((cell) => cell.hit).length;
    if (hitCount === 14) {
      navigate("/winner");
    }
  }, [playerBoardTwo, navigate]);

  useEffect(() => {
    const destroyerHits = playerBoardTwo.filter(
      (c) => c.ship === "Destroyer" && c.hit
    ).length;
    const supportHits = playerBoardTwo.filter(
      (c) => c.ship === "support" && c.hit
    ).length;
    const battleshipHits = playerBoardTwo.filter(
      (c) => c.ship === "Battleship" && c.hit
    ).length;
    const carrierHits = playerBoardTwo.filter(
      (c) => c.ship === "Carrier" && c.hit
    ).length;
    setShips({
      destroyer: destroyerHits,
      support: supportHits,
      battleship: battleshipHits,
      carrier: carrierHits,
    });
  }, [playerBoardTwo]);

  return (
    <div className='whole-chart'>
      <h1 className='hint-game'> turn: player 1</h1>
      <div className='board_one-grid'>
        {playerBoardTwo.map((cell, index) => {
          return (
            <button
              key={index}
              onClick={() => {
                handleShot(cell);
                handleAlert(cell);
              }}
              className='board-one text-[10px] md:text-[12px] lg:text-[14px] '
            >
              {shipPlayerTwo.length > 0 && cell.ship ? "⛴️" : ""}
              {cell.hit ? "☄️ " : ""}
              {cell.miss ? "🌊" : ""}
            </button>
          );
        })}
      </div>
      <div className='flex gap-2'>
        <div className='flex flex-col'>
          {ships.support === 2 ? (
            <p>support destroyed</p>
          ) : (
            <p className='opacity-[.3]'>support destroyed</p>
          )}
          {ships.destroyer === 3 ? (
            <p>Destroyer destroyed</p>
          ) : (
            <p className='opacity-[.3]'>Destroyer destroyed</p>
          )}
        </div>
        <div className='flex flex-col'>
          {ships.battleship === 4 ? (
            <p>battleship destroyed</p>
          ) : (
            <p className='opacity-[.3]'> battleship destroyed</p>
          )}
          {ships.carrier === 5 ? (
            <p> carrier destroyed</p>
          ) : (
            <p className='opacity-[.3]'> carrier destroyed</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default FightBoardTwo;
