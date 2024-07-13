import { arrayOfObjectsPlus } from "../jsFoldre/constant.js";

function BoardTwo({
  selectIdTwo,
  setSelectIdTwo,
  hanldeShipTwo,
  shipPlayerTwo,
  handleChangeTwo,
  selectIdOne,
  shipPlayerOne,
}) {
  const updateSelectId = selectIdOne.slice(4);
  const updateshipPlace  = shipPlayerOne.slice(4)

  const handleClick = (id) => {
    setSelectIdTwo((prevState) => [...prevState, id]);
  };

  return (
    <div className='whole-chart'>
      <h1>player2</h1>
      <div className='board_one-grid'>
        {arrayOfObjectsPlus.map((item) => {
          const hitFire =
            selectIdOne.includes(item.id) && updateshipPlace.includes(item.id)
           

          // Use valid slice parameters if slicing is necessary
          const bothInclude =
            shipPlayerTwo.includes(item.id) && updateSelectId.includes(item.id);
          const missedFire = updateSelectId.includes(item.id);
          return (
            <div
              key={item.id}
              onClick={() => {
                handleClick(item.id);
                hanldeShipTwo(item.id);
                handleChangeTwo();
              }}
              className={`
              ${selectIdTwo.includes(item.id) ? "board-three" : "boardtwo-one"}
              ${shipPlayerTwo.includes(item.id) ? "board-black" : "board-one"}
              ${bothInclude ? "black-fire" : "board-one"}
              
            `}
            >
              <span>{shipPlayerTwo.includes(item.id) ? "⛴️" : null}</span>
              <span>{}</span>
              <span className='number-class'>{missedFire ? "☄️" : null}</span>
              <span>{hitFire && shipPlayerTwo.length > 3  ? "🧨" : ""}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default BoardTwo;
