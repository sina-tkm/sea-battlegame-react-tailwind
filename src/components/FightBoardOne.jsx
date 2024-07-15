import { Link, useNavigate } from "react-router-dom";

function FightBoardOne({
  playerBoardOne,
  onClick,
  shipPlayerTwo,
  setPosition,
  shipPlayerOne,
}) {
    const navigation = useNavigate()
    const handleNavigate = ()=>{
        alert("player1:are you ready?")
        navigation(-1)
    }
  return (
    <div className='whole-chart'>
      <h1>  player 2</h1>
      <div className='board_one-grid'>
        {playerBoardOne.map((cell, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                onClick(index);
                setPosition();
              }}
              className='board-one'
            >
              {shipPlayerTwo.length > 0 && cell.ship ? "S" : ""}{" "}
            </div>
          );
        })}
      </div>
      <button>
        {shipPlayerOne.length <= 0 ? (
          <Link onClick={()=>handleNavigate()}>change Player</Link>
        ) : (
          <div>change Player</div>
        )}
      </button>
    </div>
  );
}

export default FightBoardOne;
