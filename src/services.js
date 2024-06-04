// function to get data 
/**
 * 
 * https://www.alphavantage.co/documentation/
 * @param {*} symbol 
 */
// src/services.js
import axios from 'axios';

const API_KEY = import.meta.env; // .VITE_API_KEY;

console.log('API_KEY:', API_KEY);

export const fetchStockData = async (symbol, period) => {
  let functionType, interval ;
  switch (period) {
    case '1d':
      functionType = 'TIME_SERIES_INTRADAY';
      interval = '6min';
      break;
    case '1w':
    case '1m':
    case '6m':
    case '1y':
      functionType = 'TIME_SERIES_WEEKLY_ADJUSTED';
      break;
    default:
      functionType = 'TIME_SERIES_WEEKLY_ADJUSTED';
  }
  const url = `https://www.alphavantage.co/query?function=${functionType}&symbol=${symbol}&apikey=${API_KEY}${
    interval ? `&interval=${interval}` : ''
  }`;
  const response = await axios.get(url);
  //const response = await axios.get(`https://www.alphavantage.co/query?function=${functionType}&symbol=${symbol}&apikey=${API_KEY}`);
  return response.data;
};