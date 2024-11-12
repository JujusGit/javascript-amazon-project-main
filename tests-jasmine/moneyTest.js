import { formmatCurrency } from "../script/utils/money.js";


describe('test suite: format currency', () => {
  it('converts cents into dollars', () => {
    expect(formmatCurrency(2095)).toEqual('20.95');
  });
});

