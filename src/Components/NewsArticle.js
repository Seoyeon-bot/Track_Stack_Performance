import React from 'react'; 

const NewsArticle=({data})=>{
    return(
        <div style={{color :'white' }}>
      <h2 >News Articles</h2>
      
        {Object.keys(data.news).map((key) => (
          <div key={key}>
            <h3>{key}</h3>
            <p>Sentiment Score: {data.news[key].sentiment.score}</p>
            <p>Summary: {data.news[key].summary}</p>
          </div>
        ))}
    
    </div>
    );
};

export default NewsArticle; 