import React from 'react' ; 
 // Key ratios 

const Ratios = ({data })=>{
    return  (
        <div style={{color : 'white', }} >
         <h2> Key Ratios </h2>

         <div> Market Cap: {data.market_cap}</div>  <hr />
         <div>Shares Outstanding: {data.shares_outstanding}</div>  <hr />
        <div> P/E Ratio: {data.pe_ratio}</div>  <hr />
        <div> P/S Ratio: {data.ps_ratio}</div>  <hr />
        <div>P/B Ratio: {data.pb_ratio}</div>  <hr />
        <div>PEG Ratio: {data.peg_ratio}</div>  <hr />
        <div>Current Ratio: {data.current_ratio}</div>  <hr />
        <div> Debt to Equity Ratio: {data.debt_to_equity_ratio}</div>  <hr />
        <div>EPS: {data.eps}</div>  <hr />
        
        </div> 
       
    ); 
}; 

export default Ratios; 