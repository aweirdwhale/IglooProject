import React from 'react';

import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom';

import Landing from './igprj/landing/Landing';
import Play from './igprj/Play/Play2';
import _Pacman from './igprj/Play/Pacman';

const _Routes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/Play" element={<Play />} />
        <Route path="/Play/Pacman" element={<_Pacman />} />
      </Routes>
    </BrowserRouter>
  );
};

export default _Routes;