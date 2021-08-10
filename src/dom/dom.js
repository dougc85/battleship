class DomStuff {

  constructor(
    humanGameboard,
    computerGameboard,
    humanPlayer,
    computerPlayer,
    checkWinner,
  ) {
    this.app = document.querySelector('.app');

    this.humanGameboard = humanGameboard;
    this.computerGameboard = computerGameboard;
    this.humanPlayer = humanPlayer;
    this.computerPlayer = computerPlayer;

    this.checkWinner = checkWinner;

    this.orientation = 'horizontal';
    this.shipLength = 5;
    this.checkPlacementFunction = this.humanGameboard.canPlaceHorizontal;

    this.name = '';

    this.shipsPlaced = [];

    this.shipName = '';
    this.shipPlacementCommand = '';

    this.renderTitleScreen();

    this.noPlaceColor = 'red';
    this.placeSafeColor = 'green';
    this.alreadyPlacedColor = 'blue';
  }

  renderTitleScreen() {
    const titlePage = document.createElement('div');
    titlePage.classList.add('title-page');

    const title = document.createElement('h1');
    title.classList.add('title');

    const nameEntry = document.createElement('form');
    nameEntry.classList.add('name-entry');

    const captainLabel = document.createElement('label');
    captainLabel.classList.add('captain-label');
    captainLabel.setAttribute('for', 'captain-name');
    captainLabel.textContent = "CAPTAIN'S NAME:";

    const captainName = document.createElement('input');
    captainName.setAttribute('autocomplete', 'off');
    captainName.setAttribute('type', 'text');
    captainName.setAttribute('class', 'captain-name');
    captainName.setAttribute('id', 'captain-name');

    nameEntry.append(captainLabel);
    nameEntry.append(captainName);

    titlePage.append(title);
    titlePage.append(nameEntry);

    this.app.append(titlePage);

    nameEntry.addEventListener('submit', (e) => {
      e.preventDefault();
      this.name = captainName.value;

      this.shipsToPlace = [
        ['patrolBoat', 2, `and finally, ${this.name}, the small but mighty patrol boat?`],
        ['submarine', 3, `they'll never see it coming, the wily submarine. where to?`],
        ['destroyer', 3, `place your destroyer VERY carefully, ${this.name}!`],
        ['battleship', 4, `toward which icy waters shall the battleship head?`],
        ['carrier', 5, `Cpt. ${this.name}, where would you like to place your carrier?`]
      ];

      titlePage.remove();
      this.selectNextShip();
      this.renderFleetPrep();
    })

  }

  selectNextShip() {
    const shipInfo = this.shipsToPlace.pop();
    const [shipName, shipLength, command] = shipInfo;
    this.shipLength = shipLength;
    this.shipName = shipName;
    this.shipPlacementCommand = command;
    this.shipsPlaced.push(shipInfo);
  }


  renderFleetPrep() {

    const fleetPrep = document.createElement('div');
    fleetPrep.classList.add('fleet-prep');

    const fleetPrepHeading = document.createElement('h2');
    fleetPrepHeading.classList.add('fleet-prep-heading');
    fleetPrepHeading.textContent = 'assemble your fleet.';

    const fleetPrepInstructions = document.createElement('p');
    fleetPrepInstructions.classList.add('fleet-prep-instructions');
    fleetPrepInstructions.textContent = this.shipPlacementCommand;

    const fleetPrepGrid = document.createElement('div');
    fleetPrepGrid.classList.add('grid-container');

    this.renderGrid(fleetPrepGrid, fleetPrepInstructions);

    const rotateButton = document.createElement('button');
    rotateButton.classList.add('rotate');
    rotateButton.classList.add('button');
    rotateButton.textContent = 'ROTATE SHIP';
    rotateButton.addEventListener('click', () => {
      if (this.orientation === 'horizontal') {
        this.orientation = 'vertical';
        this.checkPlacementFunction = this.humanGameboard.canPlaceVertical;
      } else {
        this.orientation = 'horizontal';
        this.checkPlacementFunction = this.humanGameboard.canPlaceHorizontal;
      }
    })

    fleetPrep.append(fleetPrepHeading, fleetPrepInstructions, fleetPrepGrid, rotateButton);
    this.app.append(fleetPrep);
  }

  renderGrid(container, instructions) {
    while (container.firstChild) {
      container.removeChild(container.lastChild);
    }

    for (let row = 0; row < 10; row++) {
      for (let column = 0; column < 10; column++) {
        let square = document.createElement('div');
        square.setAttribute('class', 'square');
        square.dataset.position = `${row}${column}`;

        if (this.humanGameboard.board[row][column].shipName !== undefined) {
          square.style.backgroundColor = this.alreadyPlacedColor;
          if (this.humanGameboard.board[row][column].shipPos === 0) {
            const shipName = this.humanGameboard.board[row][column].shipName;
            this.placeShipImage(square, shipName, this.humanGameboard.ships[shipName].orientation, 'large');
          }
        }


        square.addEventListener('click', () => {
          if (this.checkPlacementFunction(row, column, this.shipLength)) {
            this.humanGameboard.place(row, column, this.shipName, this.orientation);

            if (this.shipName === 'patrolBoat') {
              this.renderGrid(container, instructions);

              const rotateButton = document.querySelector('.rotate');

              const startButton = document.createElement('button');
              startButton.classList.add('start');
              startButton.classList.add('button');
              startButton.textContent = 'START GAME';
              startButton.addEventListener('click', () => {
                document.querySelector('.fleet-prep').remove();
                this.renderGameplay();
              });

              rotateButton.insertAdjacentElement('afterend', startButton);
              rotateButton.remove();

              instructions.textContent = 'ready to play?';

              while (container.firstChild) {
                container.removeChild(container.lastChild);
              }

              for (let row = 0; row < 10; row++) {
                for (let column = 0; column < 10; column++) {
                  let square = document.createElement('div');
                  square.setAttribute('class', 'square');
                  square.dataset.position = `${row}${column}`;

                  if (this.humanGameboard.board[row][column].shipName !== undefined) {
                    square.style.backgroundColor = this.alreadyPlacedColor;
                    if (this.humanGameboard.board[row][column].shipPos === 0) {
                      const shipName = this.humanGameboard.board[row][column].shipName;
                      this.placeShipImage(square, shipName, this.humanGameboard.ships[shipName].orientation, 'large');
                    }
                  }
                  container.appendChild(square);
                }
              }

            } else {
              this.selectNextShip();
              instructions.textContent = this.shipPlacementCommand;
              this.renderGrid(container, instructions);
            }
          }
        })
        square.addEventListener('mouseenter', (e) => {
          if (!this.checkPlacementFunction(row, column, this.shipLength)) {
            square.style.backgroundColor = 'red';
          } else {
            if (this.orientation === 'horizontal') {
              for (let i = 0; i < this.shipLength; i++) {
                const nextSquare = document.querySelector(`[data-position='${row}${column + i}']`);
                nextSquare.style.backgroundColor = 'green';
              }
            } else {
              for (let i = 0; i < this.shipLength; i++) {
                const nextSquare = document.querySelector(`[data-position='${row + i}${column}']`);
                nextSquare.style.backgroundColor = 'green';
              }
            }
          }
        });
        square.addEventListener('mouseleave', () => {
          if (!this.checkPlacementFunction(row, column, this.shipLength)) {
            if (this.humanGameboard.board[row][column].shipName !== undefined) {
              square.style.backgroundColor = this.alreadyPlacedColor;
            } else {
              square.style.backgroundColor = 'black';
            }
          } else {
            if (this.orientation === 'horizontal') {
              for (let i = 0; i < this.shipLength; i++) {
                const nextSquare = document.querySelector(`[data-position='${row}${column + i}']`);
                nextSquare.style.backgroundColor = 'black';
              }
            } else {
              for (let i = 0; i < this.shipLength; i++) {
                const nextSquare = document.querySelector(`[data-position='${row + i}${column}']`);
                nextSquare.style.backgroundColor = 'black';
              }
            }
          }
        })
        container.appendChild(square);
      }
    }
  }

  placeShipImage(square, name, orientation, gridSize) {
    const shipImage = document.createElement('img');
    shipImage.classList.add('ship-image');

    if (orientation === 'horizontal') {
      if (gridSize === 'large') {
        (name === 'patrolBoat') ? shipImage.classList.add('patrol-boat-horizontal-large') :
          (name === 'submarine') ? shipImage.classList.add('submarine-horizontal-large') :
            (name === 'destroyer') ? shipImage.classList.add('destroyer-horizontal-large') :
              (name === 'battleship') ? shipImage.classList.add('battleship-horizontal-large') :
                shipImage.classList.add('carrier-horizontal-large');
      } else if (gridSize === 'small') {
        (name === 'patrolBoat') ? shipImage.classList.add('patrol-boat-horizontal-small') :
          (name === 'submarine') ? shipImage.classList.add('submarine-horizontal-small') :
            (name === 'destroyer') ? shipImage.classList.add('destroyer-horizontal-small') :
              (name === 'battleship') ? shipImage.classList.add('battleship-horizontal-small') :
                shipImage.classList.add('carrier-horizontal-small');
      }
    } else if (orientation === 'vertical') {
      if (gridSize === 'large') {
        (name === 'patrolBoat') ? shipImage.classList.add('patrol-boat-vertical-large') :
          (name === 'submarine') ? shipImage.classList.add('submarine-vertical-large') :
            (name === 'destroyer') ? shipImage.classList.add('destroyer-vertical-large') :
              (name === 'battleship') ? shipImage.classList.add('battleship-vertical-large') :
                shipImage.classList.add('carrier-vertical-large');
      } else if (gridSize === 'small') {
        (name === 'patrolBoat') ? shipImage.classList.add('patrol-boat-vertical-small') :
          (name === 'submarine') ? shipImage.classList.add('submarine-vertical-small') :
            (name === 'destroyer') ? shipImage.classList.add('destroyer-vertical-small') :
              (name === 'battleship') ? shipImage.classList.add('battleship-vertical-small') :
                shipImage.classList.add('carrier-vertical-small');
      }
      shipImage.classList.add('vertical');
    }

    shipImage.src = `./battleships/${name}.png`;
    square.append(shipImage);
  }

  renderGameplay() {
    const gameplay = document.createElement('div');
    gameplay.classList.add('gameplay');

    const gameplayHeading = document.createElement('h2');
    gameplayHeading.classList.add('gameplay-heading');
    gameplayHeading.textContent = 'sink them before they sink you.';

    const gameplayMain = document.createElement('div');
    gameplayMain.classList.add('gameplay-main');

    const gameplayHuman = document.createElement('div');
    gameplayHuman.classList.add('gameplay-human');
    const gameplayComputer = document.createElement('div');
    gameplayComputer.classList.add('gameplay-computer');

    const humanHeading = document.createElement('h3');
    humanHeading.classList.add('human-heading');
    humanHeading.textContent = 'your fleet';

    const humanGrid = document.createElement('div');
    humanGrid.classList.add('human-grid');
    this.renderGameplayGrid(humanGrid, this.humanGameboard);

    const computerHeading = document.createElement('h3');
    computerHeading.classList.add('computer-heading');
    computerHeading.textContent = 'enemy terrain';

    const computerGrid = document.createElement('div');
    computerGrid.classList.add('computer-grid');
    this.renderGameplayGrid(computerGrid, this.computerGameboard);

    const instructions = document.createElement('p');
    instructions.classList.add('gameplay-instructions');
    instructions.textContent = 'To play, fire upon (click on) the enemy gameboard to your right. But watch out! Every shot you fire will result in your getting fired upon as well! Try to beat the computer by being first to sink all 5 ships!';

    gameplayHuman.append(humanHeading, humanGrid);
    gameplayComputer.append(computerHeading, computerGrid);
    gameplayMain.append(gameplayHuman, instructions, gameplayComputer);
    gameplay.append(gameplayHeading, gameplayMain);
    this.app.append(gameplay);
  }

  renderGameplayGrid(container, gameboard) {
    for (let row = 0; row < 10; row++) {
      for (let column = 0; column < 10; column++) {
        let square = document.createElement('div');
        square.setAttribute('class', 'square');
        square.dataset.position = `${row}${column}`;

        if (gameboard === this.humanGameboard) {
          square.style.cursor = 'default';
          if (gameboard.board[row][column].shipName !== undefined) {
            square.style.backgroundColor = this.alreadyPlacedColor;
            if (this.humanGameboard.board[row][column].shipPos === 0) {
              const shipName = this.humanGameboard.board[row][column].shipName;
              this.placeShipImage(square, shipName, this.humanGameboard.ships[shipName].orientation, 'small');
            }
          }
        }

        if (container.classList.contains('computer-grid')) {
          square.addEventListener('click', () => {
            this.playRound(row, column);
            const winner = this.checkWinner(this.humanGameboard, this.computerGameboard);
            if (winner === undefined) {
              return
            } else if (winner === 'computer') {
              document.querySelector('.gameplay').remove();
              this.renderComputerWins();
            } else {
              document.querySelector('.gameplay').remove();
              this.renderHumanWins();
            }
          });
        }

        //Add highliting when player moves cursor over CPU gameboard
        if (gameboard === this.computerGameboard) {
          square.addEventListener('mouseenter', (e) => {
            square.style.opacity = '.5';
          });
          square.addEventListener('mouseleave', () => {
            square.style.opacity = '1';
          });
        };

        container.appendChild(square);
      }
    }
  }

  playRound(row, column) {
    if (this.computerGameboard.canAttack(row, column)) {
      this.humanPlayer.move(row, column);
      const [rowCPU, columnCPU] = this.computerPlayer.move();

      const humanGrid = document.querySelector('.human-grid');
      const computerGrid = document.querySelector('.computer-grid');

      const shotByPlayer = computerGrid.querySelector(`[data-position='${row}${column}']`);
      const shotByComputer = humanGrid.querySelector(`[data-position='${rowCPU}${columnCPU}']`);

      const replacementSquare = document.createElement('div');
      replacementSquare.setAttribute('class', 'square');
      replacementSquare.dataset.position = `${row}${column}`;

      this.addIconToSquare(shotByComputer, this.humanGameboard.board[rowCPU][columnCPU].status);
      this.addIconToSquare(replacementSquare, this.computerGameboard.board[row][column].status);

      computerGrid.replaceChild(replacementSquare, shotByPlayer);

      const computerShipName = this.computerGameboard.board[row][column].shipName;
      const humanShipName = this.humanGameboard.board[rowCPU][columnCPU].shipName;

      this.handleSunk('computer', computerShipName, computerGrid);
      this.handleSunk('human', humanShipName, humanGrid);

    }
  };

  handleSunk(player, shipName, grid) {
    const gameboard = (player === 'computer') ?
      this.computerGameboard :
      this.humanGameboard;

    if (shipName && gameboard.ships[shipName].sunk) {
      const [originRow, originColumn] = gameboard.ships[shipName].origin;
      const orientation = gameboard.ships[shipName].orientation;
      const length = gameboard.ships[shipName].length;

      if (orientation === 'horizontal') {
        for (let i = 0; i < length; i++) {
          grid.querySelector(`[data-position='${originRow}${originColumn + i}']`).style.backgroundColor = 'red';
        }
      } else {
        for (let i = 0; i < length; i++) {
          grid.querySelector(`[data-position='${originRow + i}${originColumn}']`).style.backgroundColor = 'red';
        }
      }
      if (player === 'computer') {
        const originSquare = grid.querySelector(`[data-position='${originRow}${originColumn}']`);
        this.placeShipImage(originSquare, shipName, orientation, 'small');
      }
    }
  }

  addIconToSquare(square, status) {
    if (status === 'miss') {
      const missIcon = document.createElement('img');
      missIcon.classList.add('miss');
      missIcon.src = "./splash.png";
      square.append(missIcon);
    } else {
      const hitIcon = document.createElement('img');
      hitIcon.classList.add('hit');
      hitIcon.src = "./explosion.png";
      square.append(hitIcon);
    }
  }

  renderComputerWins() {


  }

  renderHumanWins() {

  }
}

export default DomStuff;