
import React, { useEffect, useRef } from 'react';


const Catcher = (props) => {

    const elementRef = useRef();
    
    const step_size = 30;
    const [x, setX] = React.useState();

    const getPosition = () => {
        const x = elementRef.current.offsetLeft;
        const y = elementRef.current.offsetTop;
        setX(x);
        props.setCatcherY(y); //update catcher y position to game.js
    
    };

    useEffect(() => {
        getPosition();
    }, [x]);
    
    if (props.gameStart === true) {
        document.onkeydown = checkKey;
        function checkKey(e) {
            e = e || window.event;
        
            if (e.keyCode == '37') {
                moveLeft();
                console.log('left detected');
            }
            else if (e.keyCode == '39') {
                moveRight();
                console.log('right detected');
            }
        }
    }

    const moveRight = () => {
        // Logic for moving right
        
        const boatImage = document.querySelector('img');
        if (!boatImage) {
            return; // do nothing if cannot get the element
        }
        const currentPosition = parseInt(boatImage.style.left);
        //console.log(currentPosition);
        const newPosition = x + step_size;
        if ( newPosition <= window.innerWidth-120) {
            boatImage.style.left = `${newPosition}px`;
            //console.log(newPosition);
            setX(newPosition);
            props.setCatcherX(newPosition); //update catcher x position to game.js
        }
        
    
    };
    const moveLeft = () => {
        // Logic for moving left
        const boatImage = document.querySelector('img');
        if (!boatImage) {
            return; // do nothing if cannot get the element
        }
        const currentPosition = parseInt(boatImage.style.left);
        const newPosition = x - step_size;
        if ( newPosition > 110) {
            boatImage.style.left = `${newPosition}px`;
            //console.log(newPosition);
            setX(newPosition);
            props.setCatcherX(newPosition); //update catcher x position to game.js
        }
        
    }

    return (
        
            <img ref={elementRef}  
                 src={require("../img/boat.png")} alt="Boat" 
                 style={{ position: 'absolute', 
                          left: '50%', bottom: 0, transform: 'translateX(-50%)', width: '200px', height: '200px' }} 
            />
        
    )
};


export default Catcher;
