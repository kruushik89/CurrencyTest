export interface CurrencyTableProps {

}

export interface EditProps {
  buy: string;
  name: string;
  type: string;
  onApply: (name: string, type: string, input: string) => any;
}