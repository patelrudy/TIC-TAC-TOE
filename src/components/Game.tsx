import React, { useState } from 'react';
import Board from './Board';
import './Game.css';

const createEmptyBoard = () => Array(3).fill(null).map(() => Array(3).fill(null));

const Game: React.FC = () => {
  const [board, setBoard] = useState(createEmptyBoard());
  const [isXNext, setIsXNext] = useState(true);
  const [isAI, setIsAI] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const calculateWinner = (board: (string | null)[][]) => {
    // win lines 
    const lines = [
      [[0, 0], [0, 1], [0, 2]],
      [[1, 0], [1, 1], [1, 2]],
      [[2, 0], [2, 1], [2, 2]],
      [[0, 0], [1, 0], [2, 0]],
      [[0, 1], [1, 1], [2, 1]],
      [[0, 2], [1, 2], [2, 2]],
      [[0, 0], [1, 1], [2, 2]],
      [[0, 2], [1, 1], [2, 0]]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [[x1, y1], [x2, y2], [x3, y3]] = lines[i];
      if (board[x1][y1] && board[x1][y1] === board[x2][y2] && board[x1][y1] === board[x3][y3]) {
        return board[x1][y1];
      }
    }
    return null;
  };

  const handleClick = (i: number, j: number) => {
    if (!board[i][j] && !calculateWinner(board)) {
      const newBoard = [...board];
      newBoard[i][j] = isXNext ? 'X' : 'O';
      setBoard(newBoard);
      setIsXNext(!isXNext);

      // If AI mode is enabled, let the AI make its move if there are moves left
      if (isAI && !calculateWinner(newBoard) && isMovesLeft(newBoard)) {
        const [aiMoveI, aiMoveJ] = findBestMove(newBoard, 'O');
        newBoard[aiMoveI][aiMoveJ] = 'O';
        setBoard(newBoard);
        setIsXNext(true);
      }
    }
};

  const findBestMove = (board: (string | null)[][], player: string): [number, number] => {
    let bestVal = -1000;
    let move: [number, number] = [-1, -1];
  
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (!board[i][j]) {
          let tempBoard = JSON.parse(JSON.stringify(board)); // Create a copy of the board
          tempBoard[i][j] = player;
          let moveVal = minimax(tempBoard, 0, false);
          if (moveVal > bestVal) {
            move = [i, j] as [number, number];
            bestVal = moveVal;
          }
        }
      }
    }
    return move;
  };
  

  const minimax = (board: (string | null)[][], depth: number, isMax: boolean): number => {
    let score = calculateWinner(board);

    if (score === 'O') return 10;
    if (score === 'X') return -10;
    if (isMovesLeft(board) === false) return 0;

    if (isMax) {
      let best = -1000;

      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (!board[i][j]) {
            let tempBoard = JSON.parse(JSON.stringify(board)); // Create a copy of the board
            tempBoard[i][j] = 'O';
            best = Math.max(best, minimax(tempBoard, depth + 1, !isMax));
          }
        }
      }
      return best;
    }

    else {
      let best = 1000;

      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (!board[i][j]) {
            let tempBoard = JSON.parse(JSON.stringify(board)); // Create a copy of the board
            tempBoard[i][j] = 'X';
            best = Math.min(best, minimax(tempBoard, depth + 1, !isMax));
          }
        }
      }
      return best;
    }
  };

  const isMovesLeft = (board: (string | null)[][]): boolean => {
    for (let i = 0; i < 3; i++)
      for (let j = 0; j < 3; j++)
        if (!board[i][j]) return true;
    return false;
  };

   const handleGameModeChange = (ai: boolean) => {
    setBoard(createEmptyBoard());
    setIsXNext(true);
    setIsAI(ai);
    setGameStarted(true);
  };

  const resetGame = () => {
    setBoard(createEmptyBoard());
    setIsXNext(true);
    setIsAI(false);
    setGameStarted(false);
  }

  let status;
  if (!gameStarted) {
    status = 'Please select game type';
  } else {
    const winner = calculateWinner(board);
    if (winner) {
      status = 'Winner: ' + winner;
    } else if (isMovesLeft(board)) {
      status = 'Next player: ' + (isXNext ? 'X' : 'O');
    } else {
      status = 'Game is a draw';
    }
  }

  return (
    <div className="game">
      <button onClick={() => handleGameModeChange(false)}>Player vs Player</button>
      <button onClick={() => handleGameModeChange(true)}>AI vs Player</button>
      <button onClick={resetGame}>Reset Game</button>
      <div className="game-board">
        {gameStarted && <Board board={board} onClick={handleClick} />}
        <div className="status">{status}</div>
      </div>
    </div>
  );
};

export default Game;