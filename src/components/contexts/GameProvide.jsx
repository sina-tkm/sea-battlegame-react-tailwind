import  { createContext, useState } from "react";

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [shotOne, setShotOne] = useState([]);
  const [shotTwo, setShotTwo] = useState([]);
  const [changePlayer, setChangePlayer] = useState(false);

  return (
    <GameContext.Provider value={{ shotOne, setShotOne, shotTwo, setShotTwo, changePlayer, setChangePlayer }}>
      {children}
    </GameContext.Provider>
  );
};

export default GameContext;
