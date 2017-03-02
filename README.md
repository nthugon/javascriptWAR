# javascriptWAR
javascriptWAR is an implementation of the card game WAR written with JavaScript, HTML, and CSS.
It can be played in the browser window using the UI, as well as be played in the console with an option for automated played where the entire game is cycled through.

## To Play
To play the game, open the `index.html` file with a browser.

To play the game in the browser window simply follw the on screen instructions. Each hand of the game must be played individually when done in the window.

To run every cycle of an entire game and see the results of each hand printed, you can run the automatedGame function in the console providing the number of players as the argument to that function. `automatedGame(3);` typed in the console will play the game with 3 players. 

## Unit Tests
To see the results of unit tests, open the `card-test.html` and/or `game-test.html` files in the browser. These files are located in the test directory. The unit tests are run using Mocha and Chai. The results of the unit tests will be displayed in the window.

## Code Organization

### Game Logic
The game logic for the program is written using Object-Oriented JavaScript. There are two files containing this code.

`card.js` contains the javaScript class used to build cards.

`game.js` contains the javaScript class used to create a game and execute the methods needed for game play.

### Game View
UI rendering and logging to the console is done separately from the game logic.

`app.js` contains the code that executes the UI rendering.


## License
The project is licensed under the MIT license.

## Author
All code written by Nathan Hugon.
