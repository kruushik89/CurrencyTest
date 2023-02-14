export const getCurrency = async (id: number) => {
  const res = await fetch(`https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=${id}`);
  return res.json();
}