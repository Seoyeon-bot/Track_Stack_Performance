// function to get data 

import data from './Components/appleStockData.json';

// filter data based on period and fetch. 
export const fetchData = (period) => {
  const now = new Date();
  let startDate = new Date(now);  // deault : current date 

  switch (period) {
   
    case '1d':
      startDate.setDate(now.getDate() - 1);
      break;
    case '1w':
      startDate.setDate(now.getDate() - 7);
      break;
    case '1m':
      startDate.setMonth(now.getMonth() - 1);
      break;
    case '6m':
      startDate.setMonth(now.getMonth() - 6);
      break;
    case '1y':
      startDate.setFullYear(now.getFullYear() - 1);
      break;
    default:
      console.log('Invalid period selected. Fetching all data.');
      startDate = new Date(0); // fetch all data
  }
  const startTime = startDate.getTime();
  const filteredData = data.filter(stock => withinDesiredPeriod(stock, startTime)); // filter data based on period. 

  console.log('Filtered Data:', filteredData);
  return filteredData;
};

const withinDesiredPeriod = (stock, startTime) => {
  const stockTime = new Date(stock.date).getTime();
  const currentTime = Date.now(); 
  return stockTime >= startTime && stockTime <= currentTime;
};