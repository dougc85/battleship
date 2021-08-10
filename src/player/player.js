const playerFactory = (type, gameboard) => {

  let computerMove;
  let removeFromList;
  const computerMoveList = {};
  let computerMoveStatus = 'random';
  let unresolvedComputerMoves = [];

  if (type === 'computer') {
    for (let i = 0; i < 10; i++) {
      computerMoveList[i.toString()] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    }

    removeFromList = (row, column) => {
      const rowString = row.toString();
      const positionInArrayOfColumns = computerMoveList[rowString].indexOf(column);
      computerMoveList[rowString].splice(positionInArrayOfColumns, 1);
      if (computerMoveList[rowString].length === 0) {
        delete computerMoveList[rowString];
      }
    }

    computerMove = () => {
      if (unresolvedComputerMoves.length === 0) {
        computerMoveStatus = 'random';
      }
      if (computerMoveStatus === 'random') {
        const keys = Object.keys(computerMoveList);
        const rowString = keys[Math.floor(keys.length * Math.random())];
        const positionInArrayOfColumns = Math.floor(computerMoveList[rowString].length * Math.random());
        const columnNum = computerMoveList[rowString][positionInArrayOfColumns];

        const rowNum = parseInt(rowString);

        computerMoveList[rowString].splice(positionInArrayOfColumns, 1);
        if (computerMoveList[rowString].length === 0) {
          delete computerMoveList[rowString];
        }
        const move = [rowNum, columnNum];
        return move;

      } else if (computerMoveStatus === 'tactical') {

        const remainingMoves = unresolvedComputerMoves.length;

        //check for horizontal alignment
        for (let i = 0; i < remainingMoves; i++) {
          const unresolvedMove = unresolvedComputerMoves[i];
          for (let j = 0; j < remainingMoves; j++) {
            const comparisonMove = unresolvedComputerMoves[j];
            if (Math.abs(unresolvedMove[1] - comparisonMove[1]) === 1) {
              if (gameboard.canAttack(unresolvedMove[0], unresolvedMove[1] + 1)) {
                const move = [unresolvedMove[0], unresolvedMove[1] + 1];
                removeFromList(...move);
                return move;
              }
              else if (gameboard.canAttack(unresolvedMove[0], unresolvedMove[1] - 1)) {
                const move = [unresolvedMove[0], unresolvedMove[1] - 1];
                removeFromList(...move);
                return move;
              }
            }
          }
        }

        //check for vertical alignment
        for (let i = 0; i < remainingMoves; i++) {
          const unresolvedMove = unresolvedComputerMoves[i];
          for (let j = 0; j < remainingMoves; j++) {
            const comparisonMove = unresolvedComputerMoves[j];
            if (Math.abs(unresolvedMove[0] - comparisonMove[0]) === 1) {
              console.log('in vertical line')
              if (gameboard.canAttack(unresolvedMove[0] + 1, unresolvedMove[1])) {
                const move = [unresolvedMove[0] + 1, unresolvedMove[1]];
                removeFromList(...move);
                return move;
              }
              else if (gameboard.canAttack(unresolvedMove[0] - 1, unresolvedMove[1])) {
                const move = [unresolvedMove[0] - 1, unresolvedMove[1]];
                removeFromList(...move);
                return move;
              }
            }
          }
        }

        for (let i = 0; i < remainingMoves; i++) {
          const unresolvedMove = unresolvedComputerMoves[i];
          const potentialMoves = [[unresolvedMove[0] + 1, unresolvedMove[1]], [unresolvedMove[0] - 1, unresolvedMove[1]], [unresolvedMove[0], unresolvedMove[1] + 1], [unresolvedMove[0], unresolvedMove[1] - 1]];

          //randomize moves
          for (let i = potentialMoves.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = potentialMoves[i];
            potentialMoves[i] = potentialMoves[j];
            potentialMoves[j] = temp;
          }

          for (const move of potentialMoves) {
            if (gameboard.canAttack(...move)) {
              removeFromList(...move);
              return move;
            }
          }
        }
      }
    };
  }

  const move = (row, column) => {
    if (type === "human") {
      gameboard.handleAttack(row, column);
    } else {
      const [rowCPU, columnCPU] = computerMove();
      gameboard.handleAttack(rowCPU, columnCPU);
      const lastShot = gameboard.shotsFired[gameboard.shotsFired.length - 1]
      if (lastShot[2] === 'hit') {
        unresolvedComputerMoves.push([rowCPU, columnCPU, lastShot[3]]);
        computerMoveStatus = 'tactical';
        if (lastShot[4]) {
          unresolvedComputerMoves = unresolvedComputerMoves.filter((computerMove) => {
            return computerMove[2] !== lastShot[3];
          })
        }
      }
      return [rowCPU, columnCPU];
    };
  }
  return { move, computerMove };
}

export default playerFactory;