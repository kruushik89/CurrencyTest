import {convert} from "./utils";
import {RatesProps} from "../types/rates.props";

const rates = [{ccy: "EUR", base_ccy: "UAH", buy: "41.3", sale: "42.3"}, {
  ccy: "USD",
  base_ccy: "UAH",
  buy: "39.2",
  sale: "39.7"
}] as RatesProps[];

describe("convert", () => {
  test("converts EUR to UAH", () => {
    const result = convert(100, "EUR", "UAH", rates);
    expect(result).toBe(4130);
  });

  test("converts UAH to EUR", () => {
    const result = convert(100, "UAH", "EUR", rates);
    expect(result).toBeCloseTo(2.36, 2);
  });

  test("converts USD to UAH", () => {
    const result = convert(100, "USD", "UAH", rates);
    expect(result).toBeCloseTo(3920, 0);
  });

  test("converts UAH to USD", () => {
    const result = convert(100, "UAH", "USD", rates);
    expect(result).toBeCloseTo(2.51, 0);
  });

  test("returns the same amount for the same currency", () => {
    const result = convert(100, "EUR", "EUR", rates);
    expect(result).toBe(100);
  });

  test("returns 0 for unknown currencies", () => {
    const result = convert(100, "XYZ", "UAH", rates);
    expect(result).toBe(0);
  });
});