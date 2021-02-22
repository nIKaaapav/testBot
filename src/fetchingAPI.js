import fetch from "node-fetch";
import config from "./config";

const url = config.URL;

const listExchangeFetch = () => {
  return fetch(`${url}/latest?base=USD`)
    .then((res) => res.json())
    .then((res) => res.rates);
};

const exchengeMoneyFetch = (symbol, base) => {
  return fetch(`${url}/latest?symbols=${symbol}&base=${base}`)
    .then((res) => res.json())
    .then((res) => res);
};

const historyFetch = (start_at, end_at, base, symbols) => {
  return fetch(
    `${url}/history?start_at=${start_at}&end_at=${end_at}&base=${base}&symbols=${symbols}`
  )
    .then((res) => res.json())
    .then((res) => res);
};

export default {
  listExchangeFetch,
  exchengeMoneyFetch,
    historyFetch
};
