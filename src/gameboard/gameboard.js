const gameboardFactory = () => {

  const shipDetailsObject = {
    patrolBoat: 2,
    submarine: 3,
    destroyer: 3,
    battleship: 4,
    carrier: 5,
  }

  const board = [];

  for (let i = 0; i < 10; i++) {
    board[i] = [];
    for (let j = 0; j < 10; j++) {
      board[i][j] = {
        shipName: undefined,
        shipPos: undefined,
        status: undefined,
      };
    }
  };

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

  const place = (row, column, shipName, direction) => {

    const shipLength = shipDetailsObject[shipName];

    if (direction === 'horizontal') {
      if (!canPlaceHorizontal(row, column, shipLength)) {
        throw new Error('check canPlaceHorizontal before calling place')
      }
      for (let i = 0; i < shipLength; i++) {
        board[row][column + i].shipName = shipName;
        board[row][column + i].shipPos = i;
      }
    } else if (direction === 'vertical') {
      if (!canPlaceVertical(row, column, shipLength)) {
        return;
        // throw new Error('check canPlaceVertical before calling place')
      }
      for (let i = 0; i < shipLength; i++) {
        board[row + i][column].shipName = shipName;
        board[row + i][column].shipPos = i;
      }
    } else {
      throw new Error("direction must be 'horizontal' or 'vertical'");
    }
  };

  return { board, place, canPlaceHorizontal, canPlaceVertical };
}

export default gameboardFactory;