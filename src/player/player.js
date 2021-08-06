const playerFactory = (type, gameboard) => {

  let computerMove;
  const computerMoveList = [];

  if (type === 'computer') {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        computerMoveList.push([i, j]);
      }
    }

    computerMove = () => {
      const movePosition = Math.floor(Math.random() * computerMoveList.length);
      const move = computerMoveList[movePosition];
      computerMoveList.splice(movePosition, 1);
      return move;
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