import {Player} from "../modules/Player";
import {FC, useEffect, useRef, useState} from "react";
import {Colors} from "../modules/Colors";

interface TimerProps {
    currentPlayer: Player | null;
    restart: () => void;
    firstStep: boolean;

}


const Timer: FC<TimerProps> = ({currentPlayer, restart, firstStep}) => {
    const [blackTime, setBlackTime] = useState(10)
    const [whiteTime, setWhiteTime] = useState(300)

    const timer = useRef<null | ReturnType<typeof setInterval>>(null)


    useEffect(() => {
        if(!firstStep) {
            startTimer()
        }
    },[currentPlayer])

    useEffect(() => {
        if(blackTime == 0 || whiteTime == 0)
        {
            handleRestart()
        }
    },[blackTime, whiteTime])

    function startTimer(){

        if(timer.current){
            clearInterval(timer.current)
        }
        const callback = currentPlayer?.color === Colors.WHITE ? decrementWhiteTimer : decrementBlackTimer
        timer.current = setInterval(callback, 1000)

    }

    function decrementBlackTimer(){
        setBlackTime(prev => prev - 1)
    }

    function decrementWhiteTimer(){
        setWhiteTime(prev => prev - 1)
    }

    const handleRestart = () => {
        setBlackTime(300)
        setWhiteTime(300)
        restart()
    }

    return (
        <div>
            <div>
                <button onClick={handleRestart}>Restart game</button>
            </div>
            <h2>Black - {blackTime}</h2>
            <h2>White - {whiteTime}</h2>
        </div>
    );
};

export default Timer;