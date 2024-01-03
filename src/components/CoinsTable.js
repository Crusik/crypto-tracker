import { Container, Typography, TextField, TableContainer, LinearProgress, Table, TableHead, TableRow, TableCell, TableBody, CssBaseline, Pagination } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { CoinList } from '../config/API';
import { CryptoState } from '../CryptoContext';
import { useNavigate } from "react-router-dom";
import numberWithCommas from '../components/Banner/Carousel';
import './CoinsTable.css';

const CoinsTable = () => {

    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const navigate = useNavigate();

    const { currency, symbol } = CryptoState();

    const fetchCoins = async () => {
        setLoading(true);
        const { response } = await axios.get(CoinList(currency));

        setCoins(response);
        setLoading(false);
    };

    
    useEffect(() => {
        fetchCoins();
    });
    
    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });
    
    const handleSearch = () => {
        if(!coins) return [];
        return coins.filter((coin) => (
            coin.name.toLowerCase().includes(search) ||
            coin.symbol.toLowerCase().includes(search)
        ))
    }

  return (
    <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Container style={{ textAlign: "center"}} color="secondary" type="dark">
            <Typography
                variant="h4"
                style={{ margin: 18, fontFamily: "Montserrat" }}
            >
                Cryptocurrency Prices by Market Cap
            </Typography>
            <TextField
            label="Search For a Crypto Currency.."
            variant="outlined"
            style={{ marginBottom: 20, width: "100%" }}
            onChange={(e)=>setSearch(e.target.value)}
            />
            <TableContainer>
                {
                loading ? (
                    <LinearProgress style={{ backgroundColor: "white" }} />
                ) : (
                    <Table>
                        <TableHead style={{ backgroundColor: "#1565c0" }}>
                            <TableRow>
                                {["Coin", "Price", "24h Change", "Market Cap"].map((head) =>(
                                    <TableCell
                                        style={{
                                            color: "black",
                                            fontWeight: "700",
                                            fontFamily: "Montserrat",
                                        }}
                                        key={head}
                                    >
                                        {head}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {handleSearch()
                                .slice((page - 1) * 10, (page - 1) * 10 + 10)
                                .map(row => {
                                const profit = row.price_change_percentage > 0;

                                return (
                                    <TableRow 
                                    onClick={() => navigate(`/coins/${row.id}`)}
                                    className="row"
                                    key={row.name}
                                    >
                                        <TableCell
                                            component={"th"}
                                            scope="row"
                                            style={{
                                                display: "flex",
                                                gap: 15,
                                            }}
                                        >
                                            <img
                                                src={row?.image}
                                                alt={row.name}
                                                height="50"
                                                style={{ marginBottom: 10 }}
                                            />
                                            <div
                                                style={{ display: "flex", flexDirection: "column" }}
                                            >
                                                <span
                                                    style={{
                                                        textTransform: "uppercase",
                                                        fontSize: 22,
                                                    }}
                                                >
                                                    {row.symbol}
                                                </span>
                                                <span style={{ color: "darkgrey" }}>{row.name}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell align="right">
                                            {symbol}{" "}
                                            {numberWithCommas(row.current_price.toFixed(2))}
                                        </TableCell>
                                        <TableCell
                                        align="right"
                                        style={{
                                            color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                                            fontWeight: 500,
                                        }}
                                        >
                                            {profit && "+"}
                                            {row.price_change_percentage_24h.toFixed(2)}%
                                        </TableCell>
                                        <TableCell align="right">
                                            {symbol}{" "}
                                            {numberWithCommas(
                                                row.market_cap.toString()
                                            )}
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                )
            }
            </TableContainer>

            <Pagination 
                style={{
                    padding: 20,
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                }}
                count={Math.floor(handleSearch()?.length / 10)}
                onChange={(_, value) => {
                    setPage(value);
                    window.scroll(0, 450);
                }}
            />
        </Container>
    </ThemeProvider>
  )
}

export default CoinsTable