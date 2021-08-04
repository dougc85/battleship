class DomStuff {

  constructor(humanGameboard) {
    this.app = document.querySelector('.app');

    this.humanGameboard = humanGameboard;

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
        ['patrolBoat', 2, `and finally, ${this.name}, the small but mighty tugboat?`],
        ['submarine', 3, `they'll never see it coming, the mighty submarine. where to?`],
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
        }

        square.addEventListener('click', () => {
          if (this.checkPlacementFunction(row, column, this.shipLength)) {
            this.humanGameboard.place(row, column, this.shipName, this.orientation);
            this.selectNextShip();
            instructions.textContent = this.shipPlacementCommand;
            this.renderGrid(container, instructions);
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


}

export default DomStuff;