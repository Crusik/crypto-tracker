import React, { useEffect, useState } from 'react';
import { CryptoState } from "../CryptoContext"
import axios from "axios";
import { HistoricalChart } from "../config/API";
import { createTheme } from '@mui/material/styles';
import { CircularProgress } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { Line } from 'react-chartjs-2';

const CoinInfo = ( coin ) => {
  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(1);

  
  const { currency } = CryptoState();
  
  const fetchHistoricData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency))
    
    setHistoricData(data.prices);
  };
  
  useEffect(() => {
    fetchHistoricData();
  }, [currency, days]);

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <div className='container'>
        {
          !historicData ? (
            <CircularProgress
            size={250}
            thickness={1}
            />
          ):( <>
                <Line 
                  data={{
                    labels:historicData.map(coin => {
                      let date = new Date(coin[0]);
                      let time = 
                        date.getHours() > 12
                          ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                          : `${date.getHours()}:${date.getMinutes()} AM`
                    })
                  }}
                />
              </>)
        }
      </div>
    </ThemeProvider>
  )
}

export default CoinInfo