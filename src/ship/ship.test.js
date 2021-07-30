import shipFactory from './ship';

test('first test', () => {
  expect(shipFactory().foo).toBe(1);
});

