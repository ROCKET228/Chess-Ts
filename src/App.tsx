import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import BoardComponent from "./components/BoardComponent";
import {Board} from "./modules/Board";
import {Player} from "./modules/Player";
import {Colors} from "./modules/Colors";
import LostFigures from "./components/LostFigures";
import Timer from "./components/Timer";

function App() {
    const [board, setBoard] = useState(new Board())
    const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE));
    const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK));
    const [firstStep, setFirstStep] = useState(true);
    const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null)

  useEffect(() => {
      restart()
  }, [])

  function restart() {
      const newBoard = new Board();
      newBoard.initCell()
      newBoard.addFigures()
      setBoard(newBoard)
      setCurrentPlayer(whitePlayer);
  }

  function swapPlayer(){
        setFirstStep(false)
        setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer)

  }

  return (
    <div className="app">
        <Timer currentPlayer={currentPlayer}
               restart={restart}
               firstStep={firstStep}
        />
      <BoardComponent
          board={board}
          setBoard={setBoard}
          currentPlayer={currentPlayer}
          swapPlayer={swapPlayer}
      />
        <div>
            <LostFigures
                title="Black figures"
                figures={board.lostBlackFigures}
            />
            <LostFigures
                title="White figures"
                figures={board.lostWhiteFigures}
            />
        </div>
    </div>
  );
}

export default App;
