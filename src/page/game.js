import Catcher from "../component/catcher";
import FallElement from "../component/fall_element";
import React, { useState, useEffect } from 'react';
import * as FileSaver from 'file-saver';
import Blob from 'blob';
import {saveAs, save} from 'file-saver';
import Papa from 'papaparse';
import Leaderboard from "./leaderboard";
import { Link } from "react-router-dom";

function Game() {
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(60);
  const [catcher_x, setCatcherX] = useState(0);
  const [catcher_y, setCatcherY] = useState(0);
  const [fall_x, setFallX] = useState(0);
  const [fall_y, setFallY] = useState(0);
  const [gameStart, setGameStart] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [showUserNameInput, setShowUserNameInput] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  //Game clock
  useEffect(() => {

    if (gameStart === true && countdown===0) {
      // Countdown timer
      const timer = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime === 1) {
            clearInterval(timer);
            setShowUserNameInput(true); //show input box after game finish
            
          }
          return prevTime - 1;
        });
      }, 1000);
      
      // Cleanup timer
      return () => {
        clearInterval(timer);
        
        
      };
    }
  }, [gameStart, countdown]);
  
  //Countdown timer after click game start
  useEffect(() => {
    if (gameStart === true && countdown > 0) {
      const countdownTimer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      return () => clearInterval(countdownTimer);
    }
  }, [gameStart, countdown]);



 
  // Function to save the score to the CSV file
  const submitPlayerData = async() => {
    


    const myData = {
      name: playerName,
      score: score
    }
    // console.log(playerName)
    // console.log(score)
    console.log(myData);
    const result = await fetch("http://localhost:3001/player_scores", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(myData),
      

    });
    //console.log(JSON.stringify(myData))
    const resultInJson = await result.json();
    console.log(resultInJson); //print out the return msg from server
    setShowLeaderboard(true);
  };


  return (
    <div className="Game">
      {gameStart ? (
        // Display the game if the game has started
        <>
          {countdown > 0  ? (
            // Display the countdown after the start game button is clicked
            <p style={{ fontSize: 50, backgroundColor: "#282c34", color: "white", padding: "10px 20px", borderRadius: "15px" }}>{countdown}</p>
            ) : (
            <>
            {showUserNameInput ? (
              <>
              {showLeaderboard ? (
              <>
              <h1 style={{ backgroundColor: "#282c34", color: "white", padding: "10px 20px", borderRadius: "15px" }}>Your Record has been uploaded!</h1>
              <Link to="/leaderboard" style={{ backgroundColor: "#3c414d", color: "white", padding: "10px 20px", borderRadius: "15px" }}>Click here to check your ranks</Link>
                </>
              ):(
                // Display the input box after the game has finished
                <>
                  <p style={{ fontSize: 50, borderRadius: '15px',
                      backgroundColor: '#282c30',padding: '10px 20px',fontWeight:'bold' }}>GG! Times Over!</p>
                  <p style={{borderRadius: '18px',padding: '10px 10px',
                      backgroundColor: '#3c414d',display:'inline-block'}}>Your score is {score} !</p>
                  <div>
                  <input 
                    type="text" 
                    placeholder="Enter your name here"
                    style={{ 
                      padding: '10px',
                      fontSize: '16px',
                      borderRadius: '5px',
                      border: '1px solid #ccc',
                      marginBottom: '10px'
                    }}
                    onChange={(e) => setPlayerName(e.target.value)}
                    
                  />
                  <button 
                    style={{ 
                      padding: '10px 20px',
                      fontSize: '16px',
                      borderRadius: '5px',
                      backgroundColor: '#282c30',
                      color: 'white',
                      border: 'none'
                    }}
                    onClick={submitPlayerData}
                  >
                    Submit
                  </button>
                  </div>
                </>
              )}                
              </>  
            ) : (
              <>
              <div>
              <p style={{borderRadius: '15px',
                      backgroundColor: '#282c30',padding: '10px 20px',fontWeight:'bold', fontSize: 50 }}>Game begin</p>
              <div>
                <p style={{borderRadius: '20px',padding: '10px 20px',
                      backgroundColor: '#282c30',display:'inline-block'} }>Score: {score}</p>
              </div>
              <div>
                <p style={{borderRadius: '20px',padding: '10px 20px',
                      backgroundColor: '#282c30',display:'inline-block'}}>Time: {time}</p>
              </div>
              <Catcher 
                catcher_x_position={catcher_x} 
                catcher_y_position={catcher_y} 
                setCatcherX={setCatcherX} 
                setCatcherY={setCatcherY}
                gameStart={gameStart}
              />

              <FallElement 
                time={time} 
                setScore={setScore} 
                catcher_x_position={catcher_x} 
                catcher_y_position={catcher_y}
              />
              </div>
              </>
            )}
            </>
          )}
        </>
      ) : (
        // Display the start button if the game has not started
        <>
            <button onClick={() => setGameStart(true)} style={{fontSize:"50px", backgroundColor: "#282c34", color: "white", padding: "10px 20px", borderRadius: "15px", border: "none"}}>Start Game</button>
        </>
      )}
    </div>
  );
}

export default Game;