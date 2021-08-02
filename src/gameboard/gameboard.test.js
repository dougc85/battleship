import gameboardFactory from "./gameboard";

const gameboard1 = gameboardFactory();

test('gameboard setup', () => {
  expect(gameboard1.board[7][5].status).toBe(undefined);
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





