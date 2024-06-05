// function to get data 

import data from './Components/appleStockData.json';

// filter data based on period and fetch. 
export const fetchData = (period) => {

const now = new Date();
  let startDate = new Date(now);  // deault : current date 

  switch (period) {
    case '1D':
      startDate.setDate(now.getDate() - 1);
      break;
    case '1W':
      startDate.setDate(now.getDate() - 7);
      break;
    case '1M':
      startDate.setMonth(now.getMonth() - 1);
      break;
    case '6M':
      startDate.setMonth(now.getMonth() - 6);
      break;
    case '1Y':
      startDate.setFullYear(now.getFullYear() - 1);
      break;
    default:
      startDate = new Date(0); // fetch all data. 
  }
 
const startTime = startDate.getTime();
const filteredData = data.filter(stock => {
   const stockTimestamp = new Date(stock.date).getTime();  // conver to time. 
  return stockTimestamp >= startTime;   // get stocka data on or after the start date. 
});

  //const filteredData = data.filter(stock => new Date(stock.date) >= startDate);
  console.log('Filtered Data:', filteredData);
  return filteredData;
};