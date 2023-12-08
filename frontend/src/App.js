import React, { useState } from 'react';
import Header from './components/Header';
import CardHolder from './components/CardHolder';
import About from './components/About';
import Add from './components/Add';
import Update from './components/Update';
import Delete from './components/Delete';

const STATE_READ = 0;
const state_ADD = 1;
const STATE_UPDATE = 2;
const STATE_DELET = 3;
const STATE_ABOUT = 4;

function App() {
  const [state, setState] = useState(0);

  return (
    <div className="App">
      <Header stateCallback={setState}/>
      <div id="page">
        {
          state==STATE_READ && <CardHolder/>
        }
        {
          state==state_ADD && <Add/>
        }
        {
          state==STATE_UPDATE && <Update/>
        }
        {
          state==STATE_DELET && <Delete/>
        }
        {
          state==STATE_ABOUT && <About/>
        }
      </div>
    </div>
  );
}

export default App;
