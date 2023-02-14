import React, {useEffect, useState} from 'react';
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import {Alert, Button} from "@mui/material";

import CurrencyTable from "../CurrencyTable/CurrencyTable";
import CurrencyInput from "../CurrencyInput/CurrencyInput";
import {getCurrency} from "../../services/currency.service";
import {BASE_CCY, CCY} from "../../data/data";
import {RatesProps} from "../../types/rates.props";
import {convert} from "../../utils/utils";

import "./Main.css";

const Main = () => {
  const [isChange, setIsChange] = useState(true);
  const [rates, setRates] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [firstValue, setFirstValue] = useState('');
  const [secondValue, setSecondValue] = useState('');
  const [firstCurrencySelect, setFirstCurrencySelect] = useState(CCY[0].value);
  const [secondCurrencySelect, setSecondCurrencySelect] = useState(BASE_CCY[0].value);
  const [ccy, setCCY] = useState(CCY);
  const [baseCCY, setBaseCCY] = useState(BASE_CCY);

  useEffect(() => {
    getCurrency(5)
      .then(setRates)
      .catch(error => setErrorMessage(error.message))
  }, [])

  useEffect(() => {
    if (firstValue && rates.length) {
      const secondValue = convert(+firstValue, firstCurrencySelect, secondCurrencySelect, rates);
      setSecondValue(secondValue.toFixed(2).toString());
    }
    if (!firstValue) {
      setSecondValue('');
    }
  }, [firstValue, firstCurrencySelect, secondCurrencySelect, rates]);

  const onChangeFirst = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFirstValue(e.target.value);
  };
  const onFirstSelectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstCurrencySelect(e.target.value);
  }

  const onSecondSelectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSecondCurrencySelect(e.target.value);
  }

  const onErrorMessage = () => {
    getCurrency(5)
      .then(setRates)
    setErrorMessage(null);
  }

  const changeCurrent = () => {
    if (isChange) {
      const temp = BASE_CCY;
      const currencyTemp = BASE_CCY[0].value;
      setBaseCCY(ccy);
      setCCY(temp);
      setSecondCurrencySelect(CCY[0].value);
      setFirstCurrencySelect(currencyTemp);
      setIsChange(false);
    }
    if (!isChange) {
      setBaseCCY(BASE_CCY);
      setCCY(CCY);
      setSecondCurrencySelect(BASE_CCY[0].value);
      setFirstCurrencySelect(CCY[0].value);
      setIsChange(true);
    }
  }

  const onApply = (name: string, type: string, newValue: string) => {
    const newRates = rates.map((rate: RatesProps) => {
      if (rate.ccy === name) {
        return {...rate, [type]: newValue}
      }
      return rate;
    });

    setRates(newRates as any);
  }

  return (
    <>
      <div className="main">
        {!errorMessage ? <CurrencyTable rates={rates} onApply={onApply}/> :
          (
            <Alert style={{position: "relative",}} severity="error">
              {errorMessage}
              <Button
                className="error-message"
                variant="outlined"
                size="small"
                color="error"
                onClick={onErrorMessage}
              >
                Ok
              </Button>
            </Alert>
          )
        }
        <div className="wrap-currency-input">
          <CurrencyInput
            label="Change"
            currencies={ccy}
            value={firstValue}
            onChange={onChangeFirst}
            selectedCurrency={firstCurrencySelect}
            onSelectChange={onFirstSelectChange}
            selectedCurrencyDisabled={!!errorMessage}
            disabled={!!errorMessage}
          />
          <CompareArrowsIcon className="compare-arrows" onClick={changeCurrent}/>
          <CurrencyInput
            label="Get"
            currencies={baseCCY}
            value={secondValue}
            disabled
            selectedCurrency={secondCurrencySelect}
            onSelectChange={onSecondSelectChange}
            selectedCurrencyDisabled={!!errorMessage}
          />
        </div>
      </div>
      )
    </>
  );
};

export default Main;