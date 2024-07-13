import { arrayOfObjects } from "../jsFoldre/constant.js";

function Board({
  selectIdOne,
  setSelectIdOne,
  handleShip,
  shipPlayerOne,
  handleChange,
  selectIdTwo,
  shipPlayerTwo,
 
}) {


  const handleClick = (id) => {
    
     
        setSelectIdOne((prevState) => [...prevState, id]);
    
      
      
      
        
      

    
  };

  const updateSelectId = selectIdTwo.slice(4);
  const updateshipPlace = shipPlayerTwo.slice(4);

  return (
    <div className='whole-chart'>
      <h1>player1</h1>
      <div className='board_one-grid'>
        {arrayOfObjects.map((item) => {
          const hitFire =
            selectIdTwo.includes(item.id) && updateshipPlace.includes(item.id);

          const bothInclude =
            shipPlayerOne.includes(item.id) && updateSelectId.includes(item.id);
          const missFire = updateSelectId.includes(item.id);
          return (
            <div
              key={item.id}
              onClick={() => {
                handleClick(item.id);
                handleShip(item.id);
                handleChange();
              }}
              className={`${
                selectIdOne.includes(item.id) ? "board-two" : "board-one"
              } ${
                shipPlayerOne.includes(item.id) ? "board-black" : "board-one"
              }  ${bothInclude ? "black-fire" : "board-one"} `}
            >
              <span>{shipPlayerOne.includes(item.id) ? "⛴️" : null}</span>
              <span className='number-class'>{missFire ? "☄️" : null}</span>
              <span className='number-class'>{hitFire ? "🧨" : ""}</span>
            </div>
          );
        })}
      </div>
      {selectIdTwo.includes(shipPlayerOne) ? <span>hit</span> : null}
    </div>
  );
}

export default Board;
