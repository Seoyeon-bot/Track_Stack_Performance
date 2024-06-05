import React from 'react' ; 
import  { objectEntries} from './NewsArticle'; 
const AnalystEstimates = ({data})=>{
    return(
        <div style = {{color : 'white'}}>
            <h2 >Analyst Estimates</h2>
            {objectEntries(data.analyst_estimates).map(([analyst, estimate]) => (
        <div key={analyst}>
          <p>{analyst}: {estimate}</p> <hr/>
        </div>
      ))}
        </div>
    ); 
}; 


export default AnalystEstimates;