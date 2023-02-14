import React, {useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelIcon from '@mui/icons-material/Cancel';

import {EditProps} from "./currencyTable.props";
import "./CurrencyTable.css";

const Edit: React.FC<EditProps> = ({buy, onApply, name, type}) => {
  const [edit, setEdit] = useState(false);
  const [input, setInput] = useState(buy);
  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value);

  const saveValue = () => {
    onApply(name, type, input);
    setEdit(false);
  }

  const cellEdit = () => {
    setEdit(true);
  }

  const onCancel = () => {
    setEdit(false);
  }

  return (
    <>
      {!edit && <EditIcon className="edit-icon" fontSize="small" onClick={cellEdit}/>}
      {edit && (
        <div className="apply">
          <CheckCircleOutlineIcon onClick={saveValue} fontSize="small" color="success" className="icon"/>
          <CancelIcon onClick={onCancel} fontSize="small" color="error" className="icon"/>
        </div>
      )}
      {
        !edit ? Number(buy) :
        <input type="number" value={input} onChange={inputChange} />
      }
    </>
  )
}

const CurrencyTable = ({rates, onApply}: any) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ maxWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Currency/Current <br/> Date</TableCell>
            <TableCell>Buy</TableCell>
            <TableCell>Sale</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rates?.map((row: any, index: any) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.ccy}/{row.base_ccy}
              </TableCell>
              <TableCell style={{position: "relative"}}>
                <Edit buy={row.buy} onApply={onApply} type="buy" name={row.ccy} />
              </TableCell>
              <TableCell style={{position: "relative"}}>
                <Edit buy={row.sale} onApply={onApply} type="sale" name={row.ccy} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CurrencyTable;