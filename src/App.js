import { useState } from "react";
import x from './public/X_modified.png'
import o from './public/O_modified.png'


export function Board({ isValX, squares, onPlay }) {
  function handleClick(i) {
    if (squares[i])
      return;
    squares[i] = isValX ? 'X' : 'O'
    onPlay(squares)
  }
  let status
  let winner = calculateWinner(squares)
  if (winner)
    status = (!isValX ? <div>Winner is :<img src={x} alt="X" className="square-elem-winner" /> </div>
      : <div>Winner is :<img src={o} alt="O" className="square-elem-winner" /> </div>)
  else
    status = (isValX ? <div>Next Player is :<img src={x} alt="X" className="square-elem-winner" /> </div>
      : <div>Next Player is :<img src={o} alt="O" className="square-elem-winner" /> </div>)
  return <>
    <div className='status'>{status}</div>
    <div className='board-row'>
      <Square val={squares[0]} onSquareClick={() => { handleClick(0) }} />
      <Square val={squares[1]} onSquareClick={() => { handleClick(1) }} />
      <Square val={squares[2]} onSquareClick={() => { handleClick(2) }} />
    </div>
    <div className='board-row'>
      <Square val={squares[3]} onSquareClick={() => { handleClick(3) }} />
      <Square val={squares[4]} onSquareClick={() => { handleClick(4) }} />
      <Square val={squares[5]} onSquareClick={() => { handleClick(5) }} />
    </div>
    <div className='board-row'>
      <Square val={squares[6]} onSquareClick={() => { handleClick(6) }} />
      <Square val={squares[7]} onSquareClick={() => { handleClick(7) }} />
      <Square val={squares[8]} onSquareClick={() => { handleClick(8) }} />
    </div>
  </>;
}

function Square({ val, onSquareClick }) {
  let img = val == 'X' ? <img src={x} alt="X" className="square-elem" />
    : val == 'O' ? <img src={o} className="square-elem" />
      : val
  return <button
    className="square"
    onClick={onSquareClick}
  >{img}</button>
}

export default function Game() {
  const [squares, setSquares] = useState([Array(9).fill(null)])
  const [currMove, setCurrMove] = useState(0)
  let isValX = !(currMove % 2)
  console.log(squares);
  let current_square = squares[currMove].slice()
  function handlePlay(next_squares) {
    let next = [...squares.slice(0, currMove + 1), next_squares]
    setSquares(next)
    setCurrMove(next.length - 1)
  }
  function jumpTo(i) {
    setCurrMove(i)
    return
  }
  const moves = squares.map((e, i) => {
    let desc
    if (i > 0)
      desc = 'go to step ' + i
    else
      desc = 'goto the begining'
    return <>
      <li key={i}>
        <button onClick={() => jumpTo(i)}>{desc}</button>
      </li>
    </>
  })
  return <div className="game">
    <div className="game-board">
      <Board isValX={isValX} squares={current_square} onPlay={handlePlay} />
    </div>
    <div>
      <ol>{moves}</ol>
    </div>
  </div>;
}

function calculateWinner(squares) {
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
  for (let i = 0; i <= lines.length; i++) {
    if (lines[i]) {
      let [a, b, c] = lines[i]
      if (squares[a] && squares[b] && squares[c] && squares[a] == squares[b] && squares[a] == squares[c]) {
        return true
      }
    }
  }
  return false
}