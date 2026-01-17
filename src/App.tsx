import { useState, type JSX } from 'react';
import './App.css'

interface SquareProps {
  state: string,
  nextState: () => void,
}

function Square({state, nextState}: SquareProps): JSX.Element {
  return <button className="square" onClick={nextState}>{state}</button>;
}

export default function TicTacToe(): JSX.Element {
  const boardStates = Array(9).fill(0).map(_ => useState(""));
  const start = "O";
  const [current, setCurrent] = useState(start);

  const states = boardStates.map(([s, _]) => s);
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  var done: string | undefined = undefined;
  for(var [a, b, c] of lines) {
    if(states[a] === states[b] && states[b] === states[c]) {
      done = states[a];
      break;
    }
  }
  const message = done ? "Victory: " + done : "Next: " + current;
  
  const [history, setHistory] = useState<string[]>([]);
  function nextState(x: number, y: number): () => void {
    const [state, setState] = boardStates[x+3*y];
    return () => {
      if(!done && state === "") {
        setState(current);
        history.push(current + " at (" + x + ", " + y + ")");
        setHistory(history);
        setCurrent(current === "X" ? "O" : "X");
      }
    };
  }
  function reset() {
    setCurrent(start);
    setHistory([]);
    boardStates.forEach(([_, set]) => set(""));
  }
  
  return ( <>
    <h2>TicTacToe</h2>
    <div className="game">
    <div className="game-board">
      {message}
      {[0,1,2].map(y => <div className="board-row">
        {[0,1,2].map(x => <Square state={boardStates[x+3*y][0]} nextState={nextState(x, y)}/>)}
      </div>)}
      <button onClick={reset}>Reset</button>
    </div>
    <div className="game-info">
      <div style={{width: "12ch"}}></div>
      <ol>{history.map(h => <li>{h}</li>)}</ol>
    </div>
    </div>
  </>);
}
