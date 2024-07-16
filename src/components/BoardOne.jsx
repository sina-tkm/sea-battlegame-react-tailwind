import { Link } from "react-router-dom";

function Board({ playerBoardOne, onClick, shipPlayerTwo,shipPlayerOne }) {
  return (
    <div className='whole-chart'>
      {shipPlayerTwo.length > 0 ? (
        <h1 className='hint-game'>player1:choose your shipPlacement</h1>
      ) : (
        <h1 className='hint-game'>player1</h1>
      )}
      <div className='board_one-grid'>
        {playerBoardOne.map((cell, index) => {
          return (
            <div
          
              key={index}
              onClick={() => {
                onClick(index);
                
              }}
              className='board-one'
            >
              {shipPlayerTwo.length > 0 && cell.ship ? "S" : ""}{" "}
            </div>
          );
        })}
      </div>
      <button>
      {shipPlayerOne.length <= 0 ? <Link to={"/place/one"}>change Player</Link> :  <div >change Player</div> }
        </button>
    </div>
  );
}

export default Board;
