import React, { useState, useEffect } from 'react';

function Prices() {
  const [prices, setPrices] = useState({});
  const [error, setError] = useState(null);
  const apiKey = 'c52ba4f9-756d-400b-9278-93418e4a1b11';

  useEffect(() => {
    async function fetchPrices() {
      try {
        const response = await fetch(
          `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?&CMC_PRO_API_KEY=${apiKey}`
        );
        const data = await response.json();
        setPrices(data.data);
      } catch (error) {
        setError(error);
      }
    }

    fetchPrices();
  }, []);

  if (error) {
    return <p>An error occurred: {error.message}</p>;
  }

  return (
        <div className="new-dashboard">
      <h1>Cryptocurrency Tracker</h1>
      <p>Total value of your holdings: $<span id="new-total-value"></span></p>

      <table>
        <thead>
        <tr>
          <th>Cryptocurrency</th>
          <th>Balance</th>
          <th>Price</th>
          <th>Value</th>
        </tr>
        </thead>
        {prices.map((price) => (
          <tbody key={price.id}>
            <td>{price.name}</td>
            <td><input type="text" id={`${price.symbol}-balance`} /></td>
            <td id={`${price.symbol}-price`}>${price.quote.USD.price.toFixed(2)}</td>
            <td id={`${price.symbol}-value`}>$0</td>
          </tbody>
        ))}
      </table>
    </div>
  );
}

export default Prices;
