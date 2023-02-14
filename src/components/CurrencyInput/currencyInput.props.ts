import {RatesSelectName} from "../../types/rates.props";
import React from "react";

export interface CurrencyInputProps {
  label: string;
  value: string;
  selectedCurrency: string;
  disabled: boolean;
  selectedCurrencyDisabled: boolean;
  currencies: RatesSelectName[];
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}