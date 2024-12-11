import React, { useState, useEffect } from 'react';
import Board from './Board';
import { DEFAULT_ROW, DEFAULT_COL } from '../utils/constants';

const createBoard = () =>
  Array.from(Array(DEFAULT_ROW), () => Array(DEFAULT_COL).fill(0));

export const Game = () => {
  const [board, setBoard] = useState(createBoard());

  const updateBoard = () => {
    const newBoard = createBoard();
    setBoard(newBoard);
  };

  useEffect(() => {
    updateBoard();
  }, []);

  return (
    <div>
      <Board board={board} />
    </div>
  );
};
