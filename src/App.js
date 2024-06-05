
import React, {useEffect, useState } from 'react'; 
import './App.css'; 
import CandlestickChart from './Components/CandlestickChart';
import AnalystEstimates from './Components/AnalystEstimates';
import NewsArticle from './Components/NewsArticle';
import Ratios from './Components/Ratios';
import givenData from './Components/givenData.json'; 

function App() {
 
  const [period, setPeriod] = useState('1w'); 
  const [ data, setData] = useState({}); // empty obj
  useEffect(()=>{
    setData(givenData); 
  }, []); 

// handle period. 
const handlePeriodChange = (newPeriod) => {
  console.log(`Changing period to: ${newPeriod}`); // Debug log
  setPeriod(newPeriod);
};


    return (
      <div className="App" style={styles.landingPage}>
      <h1 style={styles.header}>Stock Information</h1>
      <div style={styles.buttonGroup}>
      <button style={period === '1d'? styles.buttonActive : styles.button}
       onClick={() => handlePeriodChange('1d')}>1 Day</button>
        <button style={period === '1w' ? styles.buttonActive : styles.button} 
        onClick={() => handlePeriodChange('1w')}>1 Week</button>
        <button style={period === '1m'? styles.buttonActive : styles.button} 
        onClick={() => handlePeriodChange('1m')}>1 Month</button>
        <button style={period === '6m' ? styles.buttonActive : styles.button} 
        onClick={() => handlePeriodChange('6m')}>6 Months</button>
        <button style={period === '1y' ? styles.buttonActive : styles.button} 
        onClick={() => handlePeriodChange('1y')}>1 Year</button>
      </div>
      
      <div style={styles.chartContainer}>
      <div style={styles.chart}>
      <CandlestickChart period={period} />
      </div>
       </div>

        <div style={styles.container}>
          <div style={styles.left}>
            <Ratios data={data} />
          </div>
          <div style={styles.right}>
            <AnalystEstimates data={data} />
          </div>
        </div>
        <NewsArticle data={data} />
      </div>
    );
  }
  
 
  
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
    
  },
  left: {
    flex: 1,
    marginRight: '20px',
    textAlign : 'left', 
    border: '1px solid #ddd',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '20px',
  },
  right: {
    flex: 1,
    textAlign : 'left', 
    border: '1px solid #ddd',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '20px',
    
  },
 
  chartContainer : {
    padding : '40px',
    borderRadius : '10px',
  }, 

  chart: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '20px',
 
  },
  header : {
    color: 'white', 
  textAlign: 'center', 
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  button: {
    margin: '0 10px',
    padding: '10px 20px',
    backgroundColor: 'rgba(48,109,202,.5)',// '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  buttonActive: {
    margin: '0 10px',
    padding: '10px 20px',
    backgroundColor: 'rgba(48,109,202,1)', // '#0056b3',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  landingPage : {
    backgroundColor : 'black', 
  }, 


};


export default App;
