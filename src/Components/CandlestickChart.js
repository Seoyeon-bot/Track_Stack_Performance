import React, { useEffect, useState } from 'react';
import ApexCharts from 'react-apexcharts';
import { fetchStockData } from '../services';

const CandlestickChart = ({ symbol = "AAPL", period }) => {
  const [series, setSeries] = useState([]);
  const [performance, setPerformance] = useState('');
  const [options, setOptions] = useState({
    chart: {
      type: 'candlestick',
      height: '100%',
      width: '100%',
      background : 'rgba(48,109,202,.5)',
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true,
        },
        autoSelected: 'zoom' // Default zoom tool selection
      },
    
      responsive: [
        {
          breakpoint: 1000,
          options: {
            chart: {
              width: '100%',
              height: 400
            }
          }
        },
        {
          breakpoint: 600,
          options: {
            chart: {
              width: '100%',
              height: 300
            }
          }
        }
      ]
    },
    title: {
      text: 'Candlestick Chart',
      align: 'left',
      style: {
        color: 'white', 
      }
    },
    xaxis: {
      type: 'datetime',
      labels: {
        style: {
          colors: 'white', // X-axis label color
        }
      },
      axisTicks: {
        color: 'white' // X-axis ticks color
      },
      axisBorder: {
        color: 'white' // X-axis border color
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: 'white', // Y-axis label color
        }
      },
      tooltip: {
        enabled: true,
        style: {
          color: 'white' // Tooltip text color
        }
      }
    },
    // ? 
    tooltip: {
      theme: 'dark' // Ensures tooltip background is suitable for white text
    },
    grid: {
      borderColor: '#e0e0e0', // Light grid color for dark background
      strokeDashArray: 0, // Solid lines
    }
  });

  useEffect(() => {
    const getData = async () => {
      console.log(`Fetching data for symbol: ${symbol}, period: ${period}`);
      const data = await fetchStockData(symbol, period);
      console.log('Raw data:', data);
      const formattedData = formatData(data, period);
      console.log('Formatted data:', formattedData);

      setSeries([{ data: formattedData }]);
      updatePerformance(formattedData);
    };
    getData();
  }, [symbol, period]);

  const formatData = (data, period) => {
    let timeSeriesKey;

    if (period === '1d') {
      timeSeriesKey = 'Time Series (5min)'; 
    } else {
      timeSeriesKey = 'Time Series (Daily)';
    }

    if (!data[timeSeriesKey]) return [];

    const now = new Date();
    let startDate;

    switch (period) {
      case '1d':
        startDate = new Date(now.setHours(0, 0, 0, 0)); // Start of today
        break;
      case '1w':
        startDate = new Date(now.setDate(now.getDate() - 7)); // Last 7 days
        break;
      case '1m':
        startDate = new Date(now.setMonth(now.getMonth() - 1)); // Last month
        break;
      case '6m':
        startDate = new Date(now.setMonth(now.getMonth() - 6)); // Last 6 months
        break;
      case '1y':
        startDate = new Date(now.setFullYear(now.getFullYear() - 1)); // Last year
        break;
      default:
        startDate = new Date(now.setFullYear(now.getFullYear() - 1)); // Default to last year
    }

   return Object.entries(data[timeSeriesKey])
   .filter(([date]) => new Date(date) >= startDate)
   .map(([date, value]) => ({
     x: new Date(date).getTime(),
     y: [
       parseFloat(value['1. open']),
       parseFloat(value['2. high']),
       parseFloat(value['3. low']),
       parseFloat(value['4. close'])
     ]
   }))
   .reverse();
};

  const updatePerformance = (formattedData) => {
    if (formattedData.length > 0) {
      const startPrice = formattedData[0].y[0]; // Assuming y[0] is the open price
      const endPrice = formattedData[formattedData.length - 1].y[3]; // Assuming y[3] is the close price
      const diff = endPrice - startPrice;
      const message = diff >= 0 
        ? `Increased by ${diff.toFixed(2)} (${((diff / startPrice) * 100).toFixed(2)}%)`
        : `Decreased by ${Math.abs(diff).toFixed(2)} (${((diff / startPrice) * 100).toFixed(2)}%)`;
      setPerformance(message);
    }
  };

  return (
    <div style={{ width: '100%', height: '100%'}}>
      <ApexCharts
        options={options}
        series={series}
        type="candlestick"
        //height="100%"
        width="100%"
        
      />
       <div style={{ marginTop: '20px', color: 'white' }}>
        Performance: {performance}
      </div>
     
    </div>
  );
};

export default CandlestickChart;
