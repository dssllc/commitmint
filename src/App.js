import { Web3ReactProvider } from "@web3-react/core";
import { ethers } from "ethers";
import { CssBaseline } from "@material-ui/core";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import { Outlet } from "react-router-dom";
import TopBar from "./components/TopBar";
import Copyright from "./components/Copyright";

const themeLight = createTheme({
  palette: {
    primary: {
      main: "#095B86"
    }
  }
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
        <Outlet />
        <Copyright />
      </ThemeProvider>
    </Web3ReactProvider>
  );
}

export default App;
