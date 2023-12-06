import React, { useState, useEffect } from 'react';
import { trySendCart } from './tryLogin';
import Header from './components/Header';
import CardHolder from './components/CardHolder';
import Cart from './components/Cart';
import About from './components/About';
import Login from './components/Login';

const STATE_SHOP = 0;
const STATE_CHECKOUT = 1;
const STATE_ABOUT = 2;

function App() {
  const [state, setState] = useState(0);

  return (
    <div className="App">
      <Header stateCallback={setState}/>
      <div id="page">
        {
          state==STATE_SHOP && <CardHolder/>
        }
        {
          state==STATE_ABOUT && <About/>
        }
      </div>
    </div>
  );
}

export default App;
