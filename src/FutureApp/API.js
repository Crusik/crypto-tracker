// import React, { useState, useEffect } from "react";

function API() {
    // const [data, setData] = useState(null);
    // const [loading, setLoading] = useState(true);
  
    // useEffect(() => {
  
      const apiKey = 'c52ba4f9-756d-400b-9278-93418e4a1b11';
      
      async function getPrices() {
        const response = await fetch(
          `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?&CMC_PRO_API_KEY=${apiKey}`, {mode: "no-cors"}
        );
        const data = await response.json();
        // setData(data);
        // setLoading(false);
        console.log(data);
        console.log(data.data[0].quote.USD.price);

      }
      getPrices();
    // }, []);
  
    // if (loading) {
    //   return <div>Loading...</div>
    // }
    // return <div>{data}</div>
}

export default API;