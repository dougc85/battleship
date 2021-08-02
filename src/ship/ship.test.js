import shipFactory from './ship';


const ship1 = shipFactory(6);
ship1.hit(5);

test('hit function 1', () => {
  expect(ship1.hitArray[5]).toBe(1);
});

test('hit function 2', () => {
  expect(ship1.hitArray[0]).toBe(0);
});

const ship2 = shipFactory(1);
ship2.hit(0);

test('hit function 3', () => {
  expect(ship2.hitArray[0]).toBe(1);
})

test('sunk function', () => {
  expect(ship2.isSunk()).toBe(true);
});

test('sunk function 2', () => {
  expect(ship1.isSunk()).toBe(false);
});

