import React, { useState, useEffect } from 'react';
import Board from './Board';
import { randomTetromino } from './Tetrominoes';
import { DEFAULT_ROW, DEFAULT_COL } from '../utils/constants';

const createBoard = () =>
  Array.from(Array(DEFAULT_ROW), () => Array(DEFAULT_COL).fill(0));

export const Game = () => {
  const [board, setBoard] = useState(createBoard());
  const [tetromino, _setTetromino] = useState(randomTetromino());
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const dropTetromino = () => {
    setPosition((prev) => ({
      x: prev.x,
      y: prev.y + 1,
    }));
  };

  const updateBoard = () => {
    const newBoard = createBoard();
    tetromino.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          newBoard[y + position.y][x + position.x] = value;
        }
      });
    });
    setBoard(newBoard);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      dropTetromino();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    updateBoard();
  }, [tetromino, position]);

  return (
    <div>
      <Board board={board} />
    </div>
  );
};
