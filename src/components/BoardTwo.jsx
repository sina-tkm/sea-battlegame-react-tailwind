import { Link } from "react-router-dom";
import { useGameProvider } from "./contexts/AppProvider";

function BoardTwo() {
  const { playerBoardTwo, handleCellClickTwo, shipPlayerTwo } =
    useGameProvider();
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
                handleCellClickTwo(index);
              }}
              className='board-one'
            >
              {shipPlayerTwo.length > 0 && cell.ship ? "⚓️" : ""}{" "}
            </div>
          );
        })}
      </div>
      <button className='mt-4'>
        {shipPlayerTwo.length <= 0 ? (
          <Link className='hint-game border rounded-md mt-2' to={"/fight"}>
            {" "}
            Lets go For fight
          </Link>
        ) : (
          <div
            to={"/place"}
            className='hint-game opacity-[.4] border rounded-md mt-2 '
          >
            change Player
          </div>
        )}
      </button>
    </div>
  );
}

export default BoardTwo;
