import React from 'react'; 

const NewsArticle=({data})=>{
  
    return(
        <div style={{color :'white' }}>
      <h2 >News Articles</h2>  
        {objectEntries(data.news).map(([key, {sentiment, summary}]) => (
          <div key={key}>
            <h3>{key}</h3>
            <p>Sentiment Score: {sentiment.score}</p>
            <p>Summary: {summary}</p>
          </div>
        ))}
    
    </div>
    );
};

// conver to object array type ( key, value) pairs. 
export const objectEntries = (obj)=>{
  if(!obj) return []; 
  return Object.keys(obj).map(key=>[key, obj[key]]); 
 }; 

export default NewsArticle; 


