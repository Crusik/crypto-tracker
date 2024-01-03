import React from 'react';
import './CryptoTracker.css';

function CryptoTracker() {
  return (
    <div className="dashboard">
      <h1>Cryptocurrency Tracker</h1>
      <p>Total value of your holdings: $<span id="total-value"></span></p>
    
      <table>
        <thead>
          <tr>
          <th>Cryptocurrency</th>
          <th>Balance</th>
          <th>Price</th>
          <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
          <td>Bitcoin (BTC)</td>
          <td>1.5</td>
          <td id="btc-price">$0</td>
          <td id="btc-value">$0</td>
          </tr>
        </tbody>
        <tbody>
          <tr>
          <td>Ethereum (ETH)</td>
          <td>2.5</td>
          <td id="eth-price">$0</td>
          <td id="eth-value">$0</td>
          </tr>
        </tbody>
        <tbody>
          <tr>
          <td>Cardano (ADA)</td>
          <td>5533</td>
          <td id="ada-price">$0</td>
          <td id="ada-value">$0</td>
          </tr>
        </tbody>
        <tbody>
          <tr>
          <td>Solana (SOL)</td>
          <td>225</td>
          <td id="sol-price">$0</td>
          <td id="sol-value">$0</td>
          </tr>
        </tbody>
        <tbody>
          <tr>
          <td>Flux (FLUX)</td>
          <td>80.8</td>
          <td id="flux-price">$0</td>
          <td id="flux-value">$0</td>
          </tr>
        </tbody>
        {/* Add rows for additional cryptocurrencies here --> */}
      </table>
    </div>
  );
}

export default CryptoTracker;
