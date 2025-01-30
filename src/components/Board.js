import React from 'react';

const Board = ({ board, tetromino }) => {
  return (
    <div className='board'>
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className='row'>
          {row.map((cell, cellIndex) => (
            <div
              key={cellIndex}
              className={`cell ${cell ? `${tetromino.color}` : ''}`}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
