import FightBoardOne from "./FightBoardOne";
import FightBoardTwo from "./FightBoardTwo";

function FightLayout({
  changeplayer,
  setPlayerBoardOne,
  setPlayerBoardTwo,
  playerBoardOne,
  playerBoardTwo,
  shipPlayerOne,
  shipPlayerTwo,
  handleChange,
  handleCellClickTwo,
  handleCellClick,
  handleSwitch,
}) {
  return (
    <div>
      {" "}
      {!changeplayer && (
        <FightBoardTwo
          onClick={(index) => handleCellClickTwo(index)}
          setPlayerBoardTwo={setPlayerBoardTwo}
          playerBoardTwo={playerBoardTwo}
          shipPlayerTwo={shipPlayerTwo}
          handleChange={handleChange}
        />
      )}
      
       {changeplayer &&  <FightBoardOne
          onClick={(index) => handleCellClick(index)}
          setPlayerBoardOne={setPlayerBoardOne}
          playerBoardOne={playerBoardOne}
          shipPlayerOne={shipPlayerOne}
          shipPlayerTwo={shipPlayerTwo}
          handleSwitch={handleSwitch}
        />}
      
    </div>
  );
}

export default FightLayout;
