const playerFactory = (type, gameboard) => {

  let computerMove;
  const computerMoveList = [];

  if (type === 'computer') {
    for (let i = 0; i < 10; i++) {
      computerMoveList[i] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    }

    computerMove = () => {
      const row = Math.floor(Math.random() * computerMoveList.length);
      const column = Math.floor(Math.random() * computerMoveList[row].length);

      if (computerMoveList[row].length === 1) {
        computerMoveList.splice(row, 1);
        return [row, column];
      }

      computerMoveList[row].splice(column, 1);
      return [row, column];
    };
  }

  const move = (row, column) => {
    if (type === "human") {
      gameboard.handleAttack(row, column);
    } else {
      const [rowCPU, columnCPU] = computerMove();
      gameboard.handleAttack(rowCPU, columnCPU);
      return [rowCPU, columnCPU];
    };
  }
  return { move, computerMove };
}

export default playerFactory;