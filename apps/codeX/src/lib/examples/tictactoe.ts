export const tictactoeExample = {
  js: `import React, { useState } from 'react';

/**
 * A classic Tic Tac Toe game implementation in React
 * Features:
 * - Turn-based gameplay (X and O players)
 * - Win detection
 * - Game state management
 * - Reset functionality
 */

// Helper function to calculate winner
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], // Rows
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // Columns
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // Diagonals
    [2, 4, 6],
  ];

  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// Square component for individual board cells
function Square({ value, onClick, isWinning }) {
  return (
    <button
      className={\`square \${isWinning ? 'winning' : ''}\`}
      onClick={onClick}
    >
      {value}
    </button>
  );
}

// Board component
function Board({ squares, onClick, winningLine }) {
  const renderSquare = (i) => (
    <Square
      key={i}
      value={squares[i]}
      onClick={() => onClick(i)}
      isWinning={winningLine?.includes(i)}
    />
  );

  return (
    <div className="board">
      {[0, 1, 2].map((row) => (
        <div key={row} className="board-row">
          {[0, 1, 2].map((col) => renderSquare(row * 3 + col))}
        </div>
      ))}
    </div>
  );
}

function App() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);

  const current = history[stepNumber];
  const winner = calculateWinner(current);
  const isDraw = !winner && current.every(square => square !== null);

  // Find winning line
  const getWinningLine = () => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    for (const [a, b, c] of lines) {
      if (current[a] && current[a] === current[b] && current[a] === current[c]) {
        return [a, b, c];
      }
    }
    return null;
  };

  const handleClick = (i) => {
    const newHistory = history.slice(0, stepNumber + 1);
    const squares = [...current];

    // Return if square is filled or game is won
    if (winner || squares[i]) return;

    squares[i] = xIsNext ? 'X' : 'O';
    setHistory([...newHistory, squares]);
    setStepNumber(newHistory.length);
    setXIsNext(!xIsNext);
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  const moves = history.map((_, move) => {
    const desc = move ? \`Go to move #\${move}\` : 'Go to game start';
    return (
      <li key={move}>
        <button
          className={\`move-button \${move === stepNumber ? 'current' : ''}\`}
          onClick={() => jumpTo(move)}
        >
          {desc}
        </button>
      </li>
    );
  });

  let status;
  if (winner) {
    status = \`Winner: \${winner}\`;
  } else if (isDraw) {
    status = 'Game ended in a draw!';
  } else {
    status = \`Next player: \${xIsNext ? 'X' : 'O'}\`;
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current}
          onClick={handleClick}
          winningLine={getWinningLine()}
        />
      </div>
      <div className="game-info">
        <div className="status">{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

export default App;`,

  css: `.game {
  display: flex;
  flex-direction: row;
  margin: 20px;
  font-family: Arial, sans-serif;
}

.game-board {
  margin-right: 20px;
}

.board {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2px;
  background: #444;
  padding: 2px;
  border-radius: 8px;
}

.board-row {
  display: contents;
}

.square {
  background: white;
  border: none;
  font-size: 32px;
  font-weight: bold;
  line-height: 34px;
  height: 80px;
  padding: 0;
  text-align: center;
  width: 80px;
  cursor: pointer;
  color: #444;
  transition: background-color 0.2s;
}

.square:hover {
  background: #f0f0f0;
}

.square.winning {
  background: #c8e6c9;
  color: #2e7d32;
}

.game-info {
  margin-left: 20px;
}

.status {
  margin-bottom: 10px;
  font-size: 24px;
  font-weight: bold;
  color: #444;
}

.move-button {
  padding: 8px 16px;
  margin: 4px 0;
  background: #f5f5f5;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.move-button:hover {
  background: #e0e0e0;
}

.move-button.current {
  background: #2196f3;
  color: white;
}

ol {
  padding-left: 30px;
}

li {
  margin: 5px 0;
}

@media (max-width: 600px) {
  .game {
    flex-direction: column;
    align-items: center;
  }
  
  .game-info {
    margin-left: 0;
    margin-top: 20px;
  }
}`
};