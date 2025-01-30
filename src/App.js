import React from 'react';
import { Game } from './components/Game';

const App = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <div>
        <h1>Tetris :D</h1>
        <Game />
      </div>
    </div>
  );
};

export default App;
