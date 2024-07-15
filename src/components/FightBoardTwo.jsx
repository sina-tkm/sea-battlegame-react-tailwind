import { Link } from "react-router-dom";

function FightBoardTwo({
  playerBoardTwo,
  onClick,
  shipPlayerTwo,
  setPosition,
}) {
  const hanldeSwich = () => {
    alert("player2 : are you ready?");
  };
 
  return (
    <div className='whole-chart'>
      <h1>player1</h1>
      <div className='board_one-grid'>
        {playerBoardTwo.map((cell, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                onClick(index);
                setPosition();
              }}
              className='board-one'
            >
              {shipPlayerTwo.length > 0 && cell.ship ? "⛴️" : ""}{" "}
            </div>
          );
        })}
      </div>
      <button>
        <Link to={"/fight/fightone"} onClick={() => hanldeSwich()}>
          change Player
        </Link>
      </button>
     
    </div>
  );
}

export default FightBoardTwo;
