import React from 'react';
import './Board.css';

type BoardProps = {
  board: (string | null)[][];
  onClick: (i: number, j: number) => void;
};

const Board: React.FC<BoardProps> = ({ board, onClick }) => {
  return (
    <div className="board">
      {board.map((row, i) => (
        <div className="board-row" key={i}>
          {row.map((cell, j) => (
            <button className="cell" key={j} onClick={() => onClick(i, j)}>
              {cell}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
