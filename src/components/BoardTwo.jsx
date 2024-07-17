import { Link } from "react-router-dom";

function BoardTwo({ playerBoardTwo, onClick, shipPlayerTwo, hadnleTrue }) {
  return (
    <div className='whole-chart'>
      {shipPlayerTwo.length > 0 ? (
        <h1 className='hint-game'>player2:choose your shipPlacement</h1>
      ) : (
        <div className='turn-player'>
          <h1 className='hint-game'>player2</h1>
        </div>
      )}

      <div className='board_one-grid'>
        {playerBoardTwo.map((cell, index) => {
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
      <button>
        {shipPlayerTwo.length <= 0 ? (
          <Link className="hint-game" to={"/fight"} onClick={hadnleTrue}>
            {" "}
            Lets go For fight
          </Link>
        ) : (
          <div to={"/place"} className="hint-game opacity-[.4]">change Player</div>
        )}
      </button>
    </div>
  );
}

export default BoardTwo;
