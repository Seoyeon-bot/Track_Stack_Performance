// Candlestick.js
import React, { useEffect, useState } from 'react';
import ApexCharts from 'react-apexcharts';
import { fetchData } from '../services';

const CandlestickChart = ({ period }) => {

const [series, setSeries] = useState([]);
  const [performance, setPerformance] = useState('');

  const options = {
    chart: {
      type: 'candlestick',
      height: '100%',
      width: '100%',
      background: 'rgba(48,109,202,.5)',
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
        autoSelected: 'zoom'
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
      labels: { style: { colors: 'white' } },
      axisTicks: { color: 'white' },
      axisBorder: { color: 'white' }
    },
    yaxis: {
      labels: { style: { colors: 'white' } },
      tooltip: { enabled: true, style: { color: 'white' } }
    },
    tooltip: { theme: 'dark' },
    grid: {
      borderColor: '#e0e0e0',
      strokeDashArray: 0,
    }
  };

  useEffect(() => {
    const loadChartData = async () => {
      const filteredData = await fetchData(period);
       const formattedData = filteredData.map(formatStockData);
       setSeries([{ data: formattedData }]);
       updatePerformance(formattedData);
     };
 
     // format stoack data 
     const formatStockData = (stock) => ({
       x: new Date(stock.date).getTime(),
       y: [stock.open, stock.high, stock.low, stock.close].map(Number)
     });
 
    loadChartData(); //
  }, [period]);

  const updatePerformance = (formattedData) => {
    if (formattedData.length === 0) {   // handle error. 
        setPerformance('No data available');
        return; 
    }

    const startPrice = formattedData[0].y[0];
    const endPrice = formattedData[formattedData.length - 1].y[3];
    
    if (isNaN(startPrice) || isNaN(endPrice)) {  // handle case when data format is invalid 
        setPerformance('Invalid data format');
        return; 
    }

    const diff = endPrice - startPrice;
    const percentage = (diff / startPrice) * 100;
    const direction = diff >= 0 ? 'Increased' : 'Decreased';

    if (isNaN(diff) || isNaN(percentage)) {
        setPerformance('Invalid data format');
        return; 
    }

    const absDiff = Math.abs(diff).toFixed(2);  // get absolute value 
    const absPercentage = Math.abs(percentage).toFixed(2);
    const message = `${direction} by ${absDiff} (${absPercentage}%)`;
    setPerformance(message);
};

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ApexCharts
        options={options}
        series={series}
        type="candlestick"
        width="100%"
      />
      <div style={{ marginTop: '20px', color: 'white' }}>
        Performance: {performance}
      </div>
    </div>
  );
};


export default CandlestickChart;
