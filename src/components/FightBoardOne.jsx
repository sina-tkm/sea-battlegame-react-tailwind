import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGameProvider } from "./contexts/AppProvider";

function FightBoardOne() {
  const { setPlayerBoardOne, shipPlayerTwo, playerBoardOne } =
    useGameProvider();
  const [clicked, setClick] = useState(false);
  const [ships, setShips] = useState([]);

  const navigation = useNavigate();

  const handleNavigate = (cell) => {
    if (!cell.clicked) {
      const hitCount = playerBoardOne.filter((cell) => cell.hit).length;
      if (hitCount >= 14) {
        return;
      } else if (hitCount < 14) {
        setTimeout(() => {
          alert("are you ready?");
          navigation(-1);
        }, 800);
      }
    } else {
      setClick(false);
      return;
    }
  };

  useEffect(() => {
    const hitCount = playerBoardOne.filter((cell) => cell.hit).length;
    if (hitCount === 14) {
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
  useEffect(() => {
    const destroyerHits = playerBoardOne.filter(
      (c) => c.ship === "Destroyer" && c.hit
    ).length;
    const supportHits = playerBoardOne.filter(
      (c) => c.ship === "support" && c.hit
    ).length;
    const battleshipHits = playerBoardOne.filter(
      (c) => c.ship === "Battleship" && c.hit
    ).length;
    const carrierHits = playerBoardOne.filter(
      (c) => c.ship === "Carrier" && c.hit
    ).length;
    setShips({
      destroyer: destroyerHits,
      support: supportHits,
      battleship: battleshipHits,
      carrier: carrierHits,
    });
  }, [playerBoardOne]);

  return (
    <div className='whole-chart'>
      <h1 className='hint-game'> turn: Player 2</h1>
      <div className='board_one-grid'>
        {playerBoardOne.map((cell, index) => (
          <button
            key={index}
            onClick={() => {
              
              handleShot(cell);
              handleNavigate(cell);
            }}
            disabled={clicked}
            className='board-one text-[10px] md:text-[12px] lg:text-[14px]'
          >
            {shipPlayerTwo.length > 0 && cell.ship ? "S" : ""}{" "}
            {cell.hit ? "☄️ " : ""}
            {cell.miss ? "🌊" : ""}
          </button>
        ))}
      </div>
      <div className='flex gap-x-2'>
        <div className='flex flex-col'>
          {ships.support === 2 && <p>support destroyed</p>}
          {ships.destroyer === 3 && <p>destroyer destroyed</p>}
        </div>
        <div className='flex flex-col'>
          {ships.battleship === 4 && <p>battleShip destroyed</p>}
          {ships.carrier === 5 && <p>carrier destroyed</p>}
        </div>
      </div>
    </div>
  );
}

export default FightBoardOne;
