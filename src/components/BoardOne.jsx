import { arrayOfObjects } from '../jsFoldre/constant.js';

function Board({selectIdOne,setSelectIdOne,handleShip,shipPlayerOne,handleChange,selectIdTwo}) {
  


  const updateSelectId = selectIdTwo.slice(4)
  const handleClick = (id) => {
    setSelectIdOne((prevState) => [...prevState, id]);
  };


  return (
    <div className='board_one-grid'>
      {arrayOfObjects.map((item) => {
           const bothInclude = shipPlayerOne.includes(item.id) && updateSelectId.includes(item.id);
           const missFire = updateSelectId.includes(item.id)
        return (
          <div
            key={item.id} 
            onClick={() => {handleClick(item.id);handleShip(item.id);handleChange()}}
            className={`${selectIdOne.includes(item.id) ? "board-two" : "board-one"} ${shipPlayerOne.includes(item.id) ? "board-black" : "boad-one"}  ${bothInclude ? "black-fire" : "board-one"} `}
          >
            <span>{shipPlayerOne.includes(item.id) ? '⛴️' : null}</span>
            <span className='number-class'>{missFire ? "☄️"  : null}</span>
           
          </div>
        );
      })}
    </div>
  );
}

export default Board;
