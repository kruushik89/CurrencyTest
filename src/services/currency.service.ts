import axios from "axios";
import {baseUrl} from "../config/api.config";
import {throwError} from "./error.simulation.service";

export const getCurrency = async (id: number) => {
  const url = `${baseUrl}/p24api/pubinfo?json&exchange&coursid=${id}`;
  const {data} = await axios.get(
    `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`
  );
  throwError();
  return data;
}