import { useState } from "react";


export function Board({ isValX, squares, onPlay }) {
  function handleClick(i) {
    if (squares[i])
      return;
    squares[i] = { isValX } ? 'X' : 'O'
    onPlay(squares)
  }
  let status
  let winner = calculateWinner(squares)
  if (winner)
    status = "Winner is " + (!isValX ? 'X' : 'O')
  else
    status = "Next player: " + (isValX ? 'X' : 'O')
  return <>
    <div class='status'>{status}</div>
    <div class='board-row'>
      <Square val={squares[0]} onSquareClick={() => { handleClick(0) }} />
      <Square val={squares[1]} onSquareClick={() => { handleClick(1) }} />
      <Square val={squares[2]} onSquareClick={() => { handleClick(2) }} />
    </div>
    <div class='board-row'>
      <Square val={squares[3]} onSquareClick={() => { handleClick(3) }} />
      <Square val={squares[4]} onSquareClick={() => { handleClick(4) }} />
      <Square val={squares[5]} onSquareClick={() => { handleClick(5) }} />
    </div>
    <div class='board-row'>
      <Square val={squares[6]} onSquareClick={() => { handleClick(6) }} />
      <Square val={squares[7]} onSquareClick={() => { handleClick(7) }} />
      <Square val={squares[8]} onSquareClick={() => { handleClick(8) }} />
    </div>
  </>;
}

function Square({ val, onSquareClick }) {
  return <button
    className="square"
    onClick={onSquareClick}
  >{val}</button>
}

export default function Game() {
  const [isValX, setIsValX] = useState(true)
  const [squares, setSquares] = useState(Array(9).fill(null))
  let current_square = squares[squares.length - 1]
  function handlePlay(next_squares) {
    setSquares([...quares, next_squares])
    setIsValX(!isValX)
  }
  return <>
    <div className="game">
      <Board isValX={isValX} squares={current_square} onPlay={handlePlay} />
    </div>
  </>;
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