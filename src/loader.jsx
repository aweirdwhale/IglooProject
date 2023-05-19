import React from 'react'
import ReactDOM from 'react-dom/client'

import Loader from './Load'
import App from './App'

import './samples/node-api'
import './main.css'



console.log('React version: ' + React.version)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>

  
  // <HashRouter>
  //   <Routes>
  //     <Route path="/" exact element={ <Landing /> } />
  //     <Route path="/Play" element={ <Play /> } />
  //   </Routes>
  // </HashRouter>
)

// postMessage({ payload: 'removeLoading' }, '*')