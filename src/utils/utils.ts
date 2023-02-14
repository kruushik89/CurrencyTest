import {RatesProps} from "../types/rates.props";

export const findRate = (name: string, rates: RatesProps[]): any => {
  const rate = rates.find((r: any) => r.ccy === name);
  return rate ? rate : {buy: 0, sale: 0};
};

export const convert = (c1Amount: number, c1Name: string, c2Name: string, rates: RatesProps[]) => {
  const c1Rate = findRate(c1Name, rates);
  const c2Rate = findRate(c2Name, rates);

  if (c1Name === c2Name) {
    return c1Amount;
  }

  if (c1Name === "UAH") {
    return c1Amount / Number(c2Rate.sale);
  }

  if (c2Name === "UAH") {
    return c1Amount * Number(c1Rate.buy);
  }

  const c1InUah = c1Amount * Number(c1Rate.buy);
  return c1InUah / Number(c2Rate.sale);
};