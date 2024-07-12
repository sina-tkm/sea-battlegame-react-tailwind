import { arrayOfObjectsPlus } from "../jsFoldre/constant.js";

function BoardTwo({
  selectIdTwo,
  setSelectIdTwo,
  hanldeShipTwo,
  shipPlayerTwo,
  handleChangeTwo,
  selectIdOne,
}) {
  const updateSelectId = selectIdOne.slice(4)


  // Ensure selectIdTwo updates correctly
  const handleClick = (id) => {
    setSelectIdTwo((prevState) => [...prevState, id]);
  };

  return (
    <div className='board_one-grid'>
      {arrayOfObjectsPlus.map((item) => {
        // Use valid slice parameters if slicing is necessary
        const bothInclude = shipPlayerTwo.includes(item.id) && updateSelectId.includes(item.id);
        const missFire = updateSelectId.includes(item.id)
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
            <span className="number-class">{missFire ? "☄️" : null}</span>
          </div>
        );
      })}
    </div>
  );
}

export default BoardTwo;
