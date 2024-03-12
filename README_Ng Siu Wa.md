Dear Recruiter, 

    Nice to meet you. 
    My name is Ng Siu Wa Tommy. I am a year 4 student studying computer engineering in HKUST

    Thank you for giving me this opportunity and below are some guidelines just to briefly talk about my work. 

    I spent around 2 and a half day on this project and I'm glad that my previous internship experience help me a lot on this one.

    =========================================================================================
    

    This app has divide into react.js frontend and express backend server

    FE and BE initiate:

        1. cd Game_FE && npm start
        2. cd server && npm run dev

    Core Files brief:
        => FrontEnd:
            1. component
                1.1 catcher.js     
                    = handling the catcher object and respond to user input
                    = control by left arrow key and right arrow key

                1.2 fall_element.js 
                    = handling the fall element and fall action
                    = counting score when fall element touch the catcher
            2. page
                2.1 game.js
                    = Core Control most of the logic, page navigation, condition rendering
                      for different game stages 
                     e.g. before start, counting down, during game, end game input and input upload
                     = send player record to backend

                2.2 leaderboard.js
                    = retrieve backend data for play name and score
                    = show and sort in descending order for only top 100 records

            3. index.js & app.js
                = page navigation

        => Backend:
            1. server.js
                = route for all api get & post
                = for receiving player score and store
                = for sending player score to leaderboard

            2. player_scores.json
                = data storage for player's score and name

    Logic / user flow introduce:
        1. The webpage start with a top navigation bar and game start button
        2. Once game start button has been clicked, a 3,2,1 countdown will show
        3. Catcher game will be start and counting down for 60s
        4. The fall elements is designed to have random falling speed and falling position
        5. Once the game end, score and a input field for player name will be show 
        6. After user submit their play name, data will be send to backend and store

