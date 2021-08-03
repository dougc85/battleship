import gameboardFactory from "./gameboard";

const gameboard1 = gameboardFactory();

test('gameboard setup', () => {
  expect(gameboard1.board[7][5].shipName).toBe(undefined);
});

test('can place horiz edge - yes', () => {
  expect(gameboard1.canPlaceHorizontal(1, 4, 6)).toBe(true);
});

test('can place horiz edge - no', () => {
  expect(gameboard1.canPlaceHorizontal(1, 9, 6)).toBe(false);
});

test('can place vertical edge - yes', () => {
  expect(gameboard1.canPlaceHorizontal(7, 0, 3)).toBe(true);
});

test('can place vertical edge - no', () => {
  expect(gameboard1.canPlaceHorizontal(8, 9, 3)).toBe(false);
});

const gameboard2 = gameboardFactory();
gameboard2.place(0, 3, 'destroyer', 'horizontal');
gameboard2.place(5, 1, 'carrier', 'vertical');

test('placed ship 1 - name', () => {
  expect(gameboard2.board[0][5].shipName).toBe('destroyer');
});

test('placed ship 1 - position', () => {
  expect(gameboard2.board[0][4].shipPos).toBe(1);
});

test('placed ship 2 - name', () => {
  expect(gameboard2.board[9][1].shipName).toBe('carrier');
});

test('placed ship 2 - position', () => {
  expect(gameboard2.board[7][1].shipPos).toBe(2);
});

test('placed ship - testing where no ship has been placed', () => {
  expect(gameboard2.board[9][2].shipName).toBe(undefined);
})

test('can place horiz not edge related - yes', () => {
  expect(gameboard2.canPlaceHorizontal(0, 0, 2)).toBe(true);
});

test('can place horiz not edge related - no', () => {
  expect(gameboard2.canPlaceHorizontal(0, 5, 5)).toBe(false);
});

test('can place vert not edge related - yes', () => {
  expect(gameboard2.canPlaceVertical(0, 1, 5)).toBe(true);
});

test('can place vert not edge related - no', () => {
  expect(gameboard2.canPlaceVertical(0, 1, 6)).toBe(false);
});

test('miss', () => {
  expect(gameboard2.hitInfoOrMiss(0, 8)).toBe('miss');
});

test('hit - ship name', () => {
  expect(gameboard2.hitInfoOrMiss(7, 1).shipName).toBe('carrier');
});

test('hit - ship position', () => {
  expect(gameboard2.hitInfoOrMiss(0, 4).shipPos).toBe(1);
});

gameboard2.handleAttack(0, 3);
gameboard2.handleAttack(0, 4);
gameboard2.handleAttack(0, 5);
gameboard2.handleAttack(0, 8);

test('sunk ship', () => {
  expect(gameboard2.ships.destroyer.sunk).toBe(true);
});

gameboard2.handleAttack(5, 1);
gameboard2.handleAttack(6, 1);
gameboard2.handleAttack(7, 1);
gameboard2.handleAttack(8, 1);
gameboard2.handleAttack(9, 1);

test('shots fired 1', () => {
  expect(gameboard2.shotsFired).toEqual([
    [0, 3, 'hit'],
    [0, 4, 'hit'],
    [0, 5, 'hit'],
    [0, 8, 'miss'],
    [5, 1, 'hit'],
    [6, 1, 'hit'],
    [7, 1, 'hit'],
    [8, 1, 'hit'],
    [9, 1, 'hit'],
  ]);
});

test('all sunk - yes', () => {
  expect(gameboard2.allSunk()).toBe(true);
});






