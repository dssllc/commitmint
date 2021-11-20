
import { useState } from "react";
import {
  Container,
  Typography,
  makeStyles,
  Grid,
  Box,
  Button,
  Avatar,
  TextField,
} from "@material-ui/core";
import ConnectWallet from "../components/ConnectWallet";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import TokenOfLove from "../artifacts/contracts/TokenOfLove.sol/TokenOfLove.json";
import { LOVE_CONTRACT_ADDRESS } from '../constants';

import walletDp1 from "../assets/wallet_dp1.png";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  leftPanel: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    border: ".75px solid #BDBDBD",
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: theme.spacing(3)
  },
  rightPanel: {
    backgroundColor: "rgba(47, 128, 237, 0.1)",
    borderRadius: "12px",
    border: ".75px solid #2F80ED",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    display: "flex",
  },
  walletLogos: {
    margin: "0 auto",
    width: "250px",
    marginBottom: theme.spacing(3),
  },
  subHeading: {
    fontSize: ".75rem",
    fontWeight: "500",
    color: "#828282",
    textTransform: "uppercase",
    lineHeight: "100%",
    letterSpacing: 0,
    marginBottom: theme.spacing(1),

  },
  walletAddress: {
    fontSize: "1.25rem",
    fontWeight: "700",
    color: "#333333",
  },
  walletAvatar: {
    marginRight: "12px"
  },
  heroBody: {
    fontSize: "1.125rem",
    fontWeight: "400",
    color: "#4F4F4F",
    lineHeight: "150%",
    letterSpacing: 0,
    textAlign: "center",
    width: "90%"

  },
  ctaButton: {
    borderRadius: "50px",
    fontSize: "1rem",
    fontWeight: "500",
    color: "#ffffff",
    backgroundColor: "#2F80ED",
    width: "160px",
    "&:hover": {
      backgroundColor: "#1B69D1"
    },
  },
  input: {
    width: "100%",
    marginBottom: theme.spacing(3),
  },
  inputLast: {
    marginBottom: "0"
  },
  uploadButton: {
    width: "100%",
    marginBottom: theme.spacing(3),

  },
  divider: {
    width: "100%",
    marginBottom: theme.spacing(3),
    // backgroundColor: "#333"
  }
}));

export default function TokenOfLove() {
  const classes = useStyles();

  const [partnerAddress, setPartnerAddress] = useState("");
  const [offerSent, setOfferSent] = useState(false);

  const web3React = useWeb3React();

  if (!web3React.active) {
    return <ConnectWallet w3r={web3React} />
  }

  function getFormattedWalletAddress() {
    let output = web3React.account.substring(0,4);
    output += "...";
    output += web3React.account.substring(web3React.account.length - 4);
    return output;
  }

 async function sendOffer() {
    const signer = web3React.library.getSigner(web3React.account);
    const tokenContract = new ethers.Contract(LOVE_CONTRACT_ADDRESS, TokenOfLove.abi, signer);
    let overrides = {
      value: ethers.utils.parseEther(".001")
    };
    const txn = await tokenContract.offer(partnerAddress, overrides);
    await txn.wait();
    setOfferSent(true);
  }

  return (
    <Container maxWidth="md" className={classes.container}>
      <Grid container item justifyContent="center" spacing={3}>
        {!offerSent &&
        <Grid container item xs={12} md={7} direction="column" alignItems="flex-end">

          <Grid container item component="form" justifyContent="center" direction="column" className={classes.leftPanel}>
            <TextField
              label="Partner's Wallet Address"
              color="primary"
              variant="outlined"
              className={`${classes.input} ${classes.inputLast}`}
              onChange={e => setPartnerAddress(e.target.value)}
            />
          </Grid>

          <Button
            variant="contained"
            className={classes.ctaButton}
            disableElevation
            onClick={sendOffer}
          >
            Send token
          </Button>

        </Grid>
        }
        {offerSent &&
        <Typography variant="h5" component="h3">
          Offer sent! Check your wallet for the transaction status and token ID.
          <br />
          Next steps: send the token ID to your partner and ask them to visit the accept link.
        </Typography>
        }
        <Grid item xs={12} md={4}>
          <Grid container item direction="row" className={classes.rightPanel}>
            <Avatar className={classes.walletAvatar} alt="wallet address" src={walletDp1} />
            <Box>
              <Typography variant="h6" component="h3" className={classes.subHeading}>
                Your account
              </Typography>

              <Typography variant="h5" component="h3" className={classes.walletAddress}>
                {getFormattedWalletAddress()}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
