import React from 'react';

import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom';

import Landing from './igprj/landing/Landing';
import Play from './igprj/Play/Play2';
import Help from './igprj/help/help'
import Credits from './igprj/Credits/credits';
import Drops from './components/bgDrops/drops';

// import P from './igprj/builtingames/basicGame';

const _Routes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/Play" element={<Play />} />
        <Route path='/Help' element={<Help />} />
        <Route path='/Credits' element={<Credits />} />

        {/* <Route path='/Pong' element={<P />} /> */}

        {/* dev */}
        {/* <Route path='/' element={<Drops />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default _Routes;