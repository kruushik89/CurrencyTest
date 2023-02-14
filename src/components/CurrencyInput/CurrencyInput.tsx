import * as React from 'react';
import TextField from '@mui/material/TextField';
import {MenuItem} from "@mui/material";

import {CurrencyInputProps} from "./currencyInput.props";
import "./CurrencyInput.css";

const CurrencyInput: React.FC<CurrencyInputProps> = (
  {
    label,
    value,
    onChange,
    disabled = false,
    selectedCurrency,
    onSelectChange,
    selectedCurrencyDisabled,
    currencies
  }
) => {
  return (
    <div className="wrap-inputs">
      <TextField
        id={label}
        label={label}
        variant="outlined"
        value={value}
        onChange={onChange}
        disabled={disabled}
        type="number"
      />
      <TextField
        id="outlined-select-currency"
        select
        value={selectedCurrency}
        onChange={onSelectChange}
        style={{maxWidth: "150px"}}
        disabled={selectedCurrencyDisabled}
      >
        {currencies.map((option: any) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );
};

export default CurrencyInput;