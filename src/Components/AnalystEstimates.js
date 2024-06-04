import React from 'react' ; 

const AnalystEstimates = ({data})=>{
    return(
        <div style = {{color : 'white'}}>
            <h2 >Analyst Estimates</h2>
            <div>Citibank: {data.analyst_estimates.Citibank}</div> <hr />
            <div>Goldman Sachs: {data.analyst_estimates["Goldman Sachs"]}</div> <hr />
            <div>Morgan Stanley: {data.analyst_estimates["Morgan Stanley"]}</div> <hr />
            <div>BofA: {data.analyst_estimates["BofA"]}</div> <hr />
            <div>J.P.Morgan: {data.analyst_estimates["J.P.Morgan"]}</div> <hr />
            <div>Moelis: {data.analyst_estimates["Moelis"]}</div> <hr />
            <div>Lazard: {data.analyst_estimates["Lazard"]}</div> <hr />
            <div>Evercore: {data.analyst_estimates["Evercore"]}</div> <hr />
            
        </div>
    ); 
}; 
export default AnalystEstimates;