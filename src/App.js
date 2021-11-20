import { Web3ReactProvider } from '@web3-react/core';
import { ethers } from "ethers";
import { CssBaseline } from "@material-ui/core";
import { ThemeProvider, createTheme } from "@material-ui/core/styles"
import TopBar from './components/TopBar';
import Hero from './components/Hero';
import Copyright from './components/Copyright';

import "@fontsource/dm-sans";

const themeLight = createTheme({
  palette: {
    // background: {
    //   default: "#fff"
    // },
    primary: {
      main: "#095B86"
    }
  },
  typography: {
    fontFamily: [
      'DM Sans',
      '-apple-system',
      'BlinkMacSystemFont',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
});

function App() {

  function getLibrary(provider) {
    return new ethers.providers.Web3Provider(provider);
  }

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <ThemeProvider theme={themeLight}>
        <CssBaseline />
        <TopBar />
        <Hero />
        <Copyright />
      </ThemeProvider>
    </Web3ReactProvider>
  );
}

export default App;