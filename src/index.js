import DomStuff from "./dom/dom";
import playerFactory from "./player/player";
import gameboardFactory from "./gameboard/gameboard";

let name;
let computerPlayer = {};
let humanPlayer = {};
let computerGameboard = {};
let humanGameboard = {};


function startNewGame() {
  computerGameboard = gameboardFactory();
  humanGameboard = gameboardFactory();
  computerPlayer = playerFactory('computer', humanGameboard);
  humanPlayer = playerFactory('human', computerGameboard);

  placeComputerShips(computerGameboard);

  const domStuff = new DomStuff(
    humanGameboard,
    computerGameboard,
    humanPlayer,
    computerPlayer,
    checkWinner,
  );
}

function placeComputerShips(gameboard) {
  for (const shipName in gameboard.shipDetailsObject) {
    const shipLength = gameboard.shipDetailsObject[shipName];
    const orientations = ['horizontal', 'vertical'];
    let orientation = orientations[Math.floor(Math.random() * 2)];
    let row = Math.floor(Math.random() * 10);
    let column = Math.floor(Math.random() * 10);
    let checkPlacementFunction =
      (orientation === 'horizontal') ?
        gameboard.canPlaceHorizontal :
        gameboard.canPlaceVertical;

    while (!checkPlacementFunction(row, column, shipLength)) {
      orientation = orientations[Math.floor(Math.random() * 2)];
      row = Math.floor(Math.random() * 10);
      column = Math.floor(Math.random() * 10);
      checkPlacementFunction =
        (orientation === 'horizontal') ?
          gameboard.canPlaceHorizontal :
          gameboard.canPlaceVertical;
    }
    gameboard.place(row, column, shipName, orientation);
  }
}

function checkWinner(humanGameboard, computerGameboard) {
  if (humanGameboard.allSunk()) {
    return 'computer';
  } else if (computerGameboard.allSunk()) {
    return 'human';
  }
}

startNewGame();




// computerGameboard.place(0,0, 'patrolBoat', 'horizontal');
// computerGameboard.place(1,0, 'submarine', 'horizontal');
// computerGameboard.place(2,0, 'destroyer', 'horizontal');
// computerGameboard.place(3,0, 'battleship', 'horizontal');
// computerGameboard.place(4,0, 'carrier', 'horizontal');

