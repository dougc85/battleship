import ship from '../ship/ship';

const gameboardFactory = () => {

  const shipDetailsObject = {
    patrolBoat: 2,
    submarine: 3,
    destroyer: 3,
    battleship: 4,
    carrier: 5,
  }

  const board = [];

  const ships = {};

  const shotsFired = [];

  //Instantiate board as 2-dim Array (10x10) of objects
  for (let i = 0; i < 10; i++) {
    board[i] = [];
    for (let j = 0; j < 10; j++) {
      board[i][j] = {
        shipName: undefined,
        shipPos: undefined,
      };
    }
  };

  //Check if horizontal placement of ships will collide with edge or other ships
  const canPlaceHorizontal = (row, column, length) => {
    if (column + length > 10) {
      return false;
    }
    for (let i = 0; i < length; i++) {
      if (board[row][column + i].shipName !== undefined) {
        return false;
      }
    }
    return true;
  }

  const canPlaceVertical = (row, column, length) => {
    if (row + length > 10) {
      return false;
    }
    for (let i = 0; i < length; i++) {
      if (board[row + i][column].shipName !== undefined) {
        return false;
      }
    }
    return true;
  }

  const place = (row, column, shipName, orientation) => {

    const shipLength = shipDetailsObject[shipName];

    if (orientation === 'horizontal') {
      if (!canPlaceHorizontal(row, column, shipLength)) {
        throw new Error('check canPlaceHorizontal before calling place')
      }
      for (let i = 0; i < shipLength; i++) {
        board[row][column + i].shipName = shipName;
        board[row][column + i].shipPos = i;
      }
    } else if (orientation === 'vertical') {
      if (!canPlaceVertical(row, column, shipLength)) {
        return;
        // throw new Error('check canPlaceVertical before calling place')
      }
      for (let i = 0; i < shipLength; i++) {
        board[row + i][column].shipName = shipName;
        board[row + i][column].shipPos = i;
      }
    } else {
      throw new Error("orientation must be 'horizontal' or 'vertical'");
    }

    const { hit, isSunk } = ship(shipLength);

    ships[shipName] = {
      hit,
      isSunk,
      length: shipLength,
      orientation,
      origin: [row, column],
      sunk: false,
    };
  };

  const hitInfoOrMiss = (row, column) => {
    if (board[row][column].shipName === undefined) {
      return 'miss';
    } else {
      return { ...board[row][column] };
    }
  };

  //takes x and y coordinates
  //checks if hit/miss,
  //
  //Records misses/sends hit function to hit ships/
  const handleAttack = (row, column) => {
    const hitInfo = hitInfoOrMiss(row, column);

    if (hitInfo === 'miss') {
      shotsFired.push([row, column, 'miss']);
    } else {
      shotsFired.push([row, column, 'hit']);

      const shipName = board[row][column].shipName;
      const shipPos = board[row][column].shipPos;
      const currentShip = ships[shipName];

      currentShip.hit(shipPos);
      if (currentShip.isSunk) currentShip.sunk = true;
    }
  };

  const allSunk = () => {
    for (const currentShip in ships) {
      if (!ships[currentShip].sunk) {
        return false;
      }
    }
    return true;
  }

  return { board, place, canPlaceHorizontal, canPlaceVertical, ships, handleAttack, hitInfoOrMiss, shotsFired, allSunk };
}

export default gameboardFactory;