import React, { useState, useEffect, useMemo } from 'react';
import Board from './Board';
import { randomTetromino } from './Tetrominoes';
import { DEFAULT_ROW, DEFAULT_COL } from '../utils/constants';

const INITIAL_DROP_POSITION = {
  col: 3,
  row: 0,
};

const createBoard = () =>
  Array.from(Array(DEFAULT_ROW), () => Array(DEFAULT_COL).fill(0));

export const Game = () => {
  const [board, setBoard] = useState(createBoard());
  const [tetromino, setTetromino] = useState(randomTetromino());
  const [position, setPosition] = useState(INITIAL_DROP_POSITION);

  const tetrominoPositions = useMemo(() => {
    const colPositions = [];
    const rowPositions = [];
    tetromino.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (typeof value === 'string') {
          const updatedCol = x + position.col;
          const updatedRow = y + position.row;
          colPositions.push(updatedCol);
          rowPositions.push(updatedRow);
        }
      });
    });
    return { colPositions, rowPositions };
  }, [tetromino, position]);

  const dropTetromino = () => {
    const { rowPositions } = tetrominoPositions;
    if (rowPositions.some((pos) => pos + 1 >= DEFAULT_ROW)) {
      return;
    }
    setPosition((prev) => ({
      col: prev.col,
      row: prev.row + 1,
    }));
  };

  const moveTetromino = (direction) => {
    const { colPositions } = tetrominoPositions;
    if (
      colPositions.some(
        (pos) => pos + direction < 0 || pos + direction === DEFAULT_COL
      )
    ) {
      return;
    }
    setPosition((prev) => ({
      col: prev.col + direction,
      row: prev.row,
    }));
  };

  const rotateTetromino = () => {
    const rotatedTetromino = {
      ...tetromino,
      shape: tetromino.shape[0].map((_, index) =>
        tetromino.shape.map((row) => row[index]).reverse()
      ),
    };
    setTetromino(rotatedTetromino);
  };

  const updateBoard = () => {
    const newBoard = createBoard();
    tetromino.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        const updatedRow = y + position.row;
        const updatedCol = x + position.col;
        if (value !== 0) {
          newBoard[updatedRow][updatedCol] = value;
        }
      });
    });
    setBoard(newBoard);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowUp') {
        rotateTetromino();
      }
      if (event.key === 'ArrowLeft') {
        moveTetromino(-1);
      }
      if (event.key === 'ArrowRight') {
        moveTetromino(1);
      }
      if (event.key === 'ArrowDown') {
        dropTetromino();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [tetrominoPositions]);

  useEffect(() => {
    const interval = setInterval(() => {
      dropTetromino();
    }, 1000);
    return () => clearInterval(interval);
  }, [tetrominoPositions]);

  useEffect(() => {
    updateBoard();
  }, [tetromino, position]);

  return (
    <div>
      <Board board={board} tetromino={tetromino} />
    </div>
  );
};
