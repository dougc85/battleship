import DomStuff from "./dom/dom";
import playerFactory from "./player/player";
import gameboardFactory from "./gameboard/gameboard";

let name;
let computerPlayer = {};
let humanPlayer = {};
let computerGameboard = {};
let humanGameboard = {};


function startNewGame() {
  computerPlayer = playerFactory('computer');
  humanPlayer = playerFactory('human');
  computerGameboard = gameboardFactory();
  humanGameboard = gameboardFactory();
  const domStuff = new DomStuff(
    humanGameboard);
}

startNewGame();




// computerGameboard.place(0,0, 'patrolBoat', 'horizontal');
// computerGameboard.place(1,0, 'submarine', 'horizontal');
// computerGameboard.place(2,0, 'destroyer', 'horizontal');
// computerGameboard.place(3,0, 'battleship', 'horizontal');
// computerGameboard.place(4,0, 'carrier', 'horizontal');

