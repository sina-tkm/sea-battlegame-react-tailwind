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
              {shipPlayerTwo.length > 0 && cell.ship ? "⚓️" : ""}{" "}
            </div>
          );
        })}
      </div>
      <button className="mt-4">
      {shipPlayerOne.length <= 0 ? <Link className="hint-game border rounded-md mt-2 " to={"/place/one"}>change Player</Link> :  <div   className="hint-game opacity-[.4] border rounded-md mt-2 ">change Player</div> }
        </button>
    </div>
  );
}

export default Board;
