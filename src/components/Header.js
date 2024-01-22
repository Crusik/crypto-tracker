import { AppBar, Container, Toolbar, Typography, Select, MenuItem, createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import React from 'react'
import './Header.css';
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../CryptoContext";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const Header = () => {
  
  const navigate = useNavigate()

  
  const { currency, setCurrency} = CryptoState()
  
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
        <AppBar color="transparent" position="static">
          <Container>
            <Toolbar>
                <Typography onClick={() => navigate("/")} className="title" variant="h6" >
                  Crypto Tracker
                </Typography>
                <Select
                  variant="outlined"
                  style={{
                    width: 100,
                    height: 40,
                    marginRight: 15,
                  }}
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                >
                <MenuItem value={"USD"}>USD</MenuItem>
                <MenuItem value={"INR"}>INR</MenuItem>
                </Select>
            </Toolbar>
          </Container>
        </AppBar>
      </ThemeProvider>
  )
}

export default Header;