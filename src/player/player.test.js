import playerFactory from "./player";
import gameboardFactory from "../gameboard/gameboard";

const gameboard3 = gameboardFactory();
const playerComputer3 = playerFactory('computer', gameboard3);

test('Is computerMove an array', () => {
  expect(Array.isArray(playerComputer3.computerMove())).toBe(true);
})

const gameboard4 = gameboardFactory();
const playerComputer4 = playerFactory('computer', gameboard4);
for (let i = 0; i < 100; i++) {
  playerComputer4.computerMove();
}

test('Does computerMove only allow for 100 calls', () => {
  expect(() => {
    playerComputer4.computerMove();
  }).toThrow();
});