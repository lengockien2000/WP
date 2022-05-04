/* eslint-disable no-undef */
import { formatVnd } from 'utils/formatter';

it('Should be in right format', async () => {
  // generate data of 100.000.000 vnd
  const price = 100000000;

  // format the price
  const formattedPrice = formatVnd(price);

  // expect formatted price
  expect(formattedPrice).toBe('100.000.000');
});
