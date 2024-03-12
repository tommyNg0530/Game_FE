import React, { useState, useEffect } from 'react';

const FallElement = (props) => {
    const [y_position, setY] = useState(0);
    const [x_position, setX] = useState(Math.floor(Math.random() * (window.innerWidth-150)));
    const [fallingSpeed, setFallingSpeed] = useState(1); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10
    const [image, setImage] = useState('e1');
    const [score, setScore] = useState(-100);
    //Falling action
    useEffect(() => {
        //console.log('time', props.time);
        if (props.time !== 0) {
            
            const interval = setInterval(() => {
                setY(prevPosition => prevPosition + fallingSpeed);  
            }, 10);

            return () => {
                clearInterval(interval);
            };
        }   
        

    }, [y_position, props.time]);

    function refall(){
        const images = ['e1', 'e2', 'p1', 'p2', 'p3', 'p4'];
        const randomIndex = Math.floor(Math.random() * images.length);

        //p1, p2, p3, p4 will give 50 points, e1, e2 will give -100 points
        if (randomIndex >1){
            setScore(50);
        }else{
            setScore(-100);
        }
        setY(0);
        setX(Math.floor(Math.random() * (window.innerWidth-150)));
        setImage(images[randomIndex]); //change image randomly
        setFallingSpeed(Math.floor(Math.random() * 10) + 1); //change falling speed randomly
    }

    //Refall position and change image randomly
    useEffect(() => {
        const containerHeight = window.innerHeight;
        const imageHeight = 100; // Assuming the image height is 100px
        if (y_position + imageHeight > containerHeight) {
            
            refall()
            
        }
    }, [y_position]);
    
    // Check if the fall element and catcher overlap, Score counting
    useEffect(() => {
        const catcherWidth = 100; 
        const catcherHeight = 200; 
        const fallElementWidth = 150; 
        const fallElementHeight = 150; 

        const catcherLeft = props.catcher_x_position;
        const catcherRight = props.catcher_x_position + catcherWidth;

        const catcherTop = props.catcher_y_position;
        console.log(catcherTop, catcherLeft);
        const catcherBottom = props.catcher_y_position+ catcherHeight;

        const fallElementLeft = x_position;
        const fallElementRight = x_position + fallElementWidth;
        const fallElementTop = y_position;
        const fallElementBottom = y_position + fallElementHeight;

        if (
            fallElementLeft < catcherRight &&
            fallElementRight > catcherLeft &&
            fallElementTop < catcherBottom &&
            fallElementBottom > catcherTop
        ) {
            props.setScore(prevScore => prevScore + score);
            refall();
            
        }
    }, [x_position, y_position]);



    
    return (
        <div
            style={{
                position: 'absolute',
                top: `${y_position}px`,
                left:`${x_position}px`,
                transition: 'top 0.1s linear',
            }}
        >
            <img src={require(`../img/${image}.png`)} alt="Falling Image" style={{ width: '150px', height: '150px' }} />
        </div>
    );
};

export default FallElement;
