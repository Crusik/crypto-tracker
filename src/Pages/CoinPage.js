import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CryptoState } from "../CryptoContext";
import axios from "axios";
import { SingleCoin } from "../config/API";
import CoinInfo from '../components/CoinInfo';
import './CoinPage.css';
import { LinearProgress, Typography } from '@mui/material';
import { numberWithCommas } from '../components/Banner/Carousel';

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();

  const { currency, symbol } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));

    setCoin(data);

  };

  console.log(coin);

  useEffect(() => {
    fetchCoin();
  }, [currency]);

  if (!coin) return <LinearProgress style={{ backgroundColor: "white" }}/>

  return (
    <div className='container'>
        <div className='sidebar'>
          <img
            src={coin?.image.large}
            alt={coin?.name}
            height="200"
            style={{ marginBottom: 20 }}
          />
          <Typography variant='h3' className='heading'>
            {coin?.name}
          </Typography>
          <Typography variant='subtitle1' className='description'>
            {coin?.description.en.split(". ")[0]}.
          </Typography>
          <div className='marketData'>
            <span style={{ display: "flex" }}>
              <Typography variant='h5' className='heading'>
                Rank:
              </Typography>
              &nbsp; &nbsp;
              <Typography
                variant='h5'
                style={{
                  fontFamily: "Montserrat",
                }}
              >
                {coin?.market_cap_rank}
              </Typography>
            </span>
            <span style={{ display: "flex" }}>
              <Typography variant='h5' className='heading'>
                Current Price:
              </Typography>
              &nbsp; &nbsp;
              <Typography
                variant='h5'
                style={{
                  fontFamily: "Montserrat",
                }}
              >
                {symbol}{" "}
                {numberWithCommas(
                  coin?.market_data.current_price[currency.toLowerCase()]
                )}
              </Typography>
            </span>
            <span style={{ display: "flex" }}>
              <Typography variant='h5' className='heading'>
                Market Cap:{" "}
              </Typography>
              &nbsp; &nbsp;
              <Typography
                variant='h5'
                style={{
                  fontFamily: "Montserrat",
                }}
              >
                {symbol}{" "}
                {numberWithCommas(
                  coin?.market_data.market_cap[currency.toLowerCase()]
                    .toString()
                )}
              </Typography>
            </span>
          </div>
        </div>

        {/* {chart} */}
        <CoinInfo coin={coin} />
    </div>
  )
}

export default CoinPage