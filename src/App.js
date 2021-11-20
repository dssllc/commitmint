import { Web3ReactProvider } from "@web3-react/core";
import { ethers } from "ethers";
import { Container, CssBaseline, makeStyles } from "@material-ui/core";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import { Outlet } from "react-router-dom";
import TopBar from "./components/TopBar";
import Copyright from "./components/Copyright";

import "@fontsource/dm-sans";

const themeLight = createTheme({
  palette: {
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
    button: {
      textTransform: 'none',
      fontSize: '1rem',
      fontWeight: 'bold',
    }
  },
 
});

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    maxWidth: '100%',
    backgroundImage: `url('/bg.png')`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
  }
}));

function App() {

  const classes = useStyles()

  function getLibrary(provider) {
    return new ethers.providers.Web3Provider(provider);
  }

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <ThemeProvider theme={themeLight}>
        <Container className={classes.root}>
          <CssBaseline />
          <TopBar />
          <Outlet />
          <Copyright />
        </Container>
      </ThemeProvider>
    </Web3ReactProvider>
  );
}

export default App;
