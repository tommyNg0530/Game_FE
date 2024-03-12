import './App.css';
import React, { useEffect } from 'react';
import backgroundImage from './img/bg1.png';
import Game from './page/game';


function App() {

  return (
    <div className="App">
      <header className="App-header" style={{ backgroundImage: `url(${backgroundImage})`, 
            backgroundSize: 'cover', 
            backgroundPosition: 'center', }}>
        
        <Game/>
      
      </header>
    </div>
  );
}


export default App;
