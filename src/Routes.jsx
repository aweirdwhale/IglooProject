import React from 'react';

import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom';

import Landing from './igprj/landing/Landing';
import Play from './igprj/Play/Play2';
import _Tetris from './igprj/tetris/tetris';

const _Routes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/Play" element={<Play />} />
        <Route path="/Play/Tetris" element={<_Tetris />} />
      </Routes>
    </BrowserRouter>
  );
};

export default _Routes;