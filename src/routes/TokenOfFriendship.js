
import { useState, useRef } from "react";
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

import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import TokenOfFriendshipContract from "../artifacts/contracts/TokenOfFriendship.sol/TokenOfFriendship.json";
import { FRIEND_CONTRACT_ADDRESS } from '../constants';

import walletDp1 from "../assets/wallet_dp1.png";

import ConnectWallet from "../components/ConnectWallet";
import MetadataForm from "../components/MetadataForm";
import UserAccountPanel from "../components/UserAccountPanel";

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
  notificationPanel: {
    border: "2px solid #2F80ED",
  },
  walletLogos: {
    margin: "0 auto",
    width: "250px",
    marginBottom: theme.spacing(3),
  },
  notificationHeading: {
    display: 'block',
    fontSize: "1.45rem",
    fontWeight: "600",
    color: "#333333",
    lineHeight: "100%",
    letterSpacing: 0,
    marginBottom: theme.spacing(1),
    textAlign: 'center'
  },
  notificationSubHeading: {
    display: 'block',
    fontSize: "1.15rem",
    fontWeight: "400",
    color: "#4F4F4F",
    lineHeight: "100%",
    letterSpacing: 0,
    marginBottom: theme.spacing(1),
    textAlign: 'center'
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
  instructions: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(2),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    border: "1px solid #BDBDBD",
    borderRadius: "6px",
    backgroundColor: "#F2F2F2",
    fontSize: "1rem",
    fontFamily: 'monospace',
    fontWeight: "400",
    color: "#333333",
    width: "100%",
    overflowWrap: 'anywhere',
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
  }
}));

export default function TokenOfFriendship() {
  const classes = useStyles();

  const [friendsAddress, setFriendAddress] = useState("");
  const [offerSent, setOfferSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const [tokenId, setTokenId] = useState('0x000000000000000000abc');

  const [copySuccess, setCopySuccess] = useState('');
  const instructions = useRef(null);

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

  function checkAddress(address) {
    try {
      ethers.utils.getAddress(address);
      setFriendAddress(address);
      setErrorMsg(null);
    } catch (e) {
      setErrorMsg("Please enter a valid address");
      return false;
    }
  }

  async function sendOffer() {
    try {
      const signer = web3React.library.getSigner(web3React.account);
      const tokenContract = new ethers.Contract(FRIEND_CONTRACT_ADDRESS, TokenOfFriendshipContract.abi, signer);
      const txn = await tokenContract.offer(friendsAddress);
      await txn.wait();
      setOfferSent(true);
    } catch (e) {
      if (!!e.message.match(/user denied transaction/i)) {
        setErrorMsg("Transaction was rejected");
      }
    }
  }

  function copyToClipboard(e) {
    const text = instructions.current.innerText;
    navigator.clipboard.writeText(text)
    // document.execCommand('copy');
    // This is just personal preference.
    // I prefer to not show the whole text area selected.
    e.target.focus();
    setCopySuccess('Copied!');
  };  

  return (
    <Container maxWidth="md" className={classes.container}>
      <Grid container item justifyContent="center" spacing={3}>
        {!offerSent &&
        <Grid container item xs={12} md={7} direction="column" alignItems="flex-end">

          <Grid container item component="form" justifyContent="center" direction="column" className={classes.leftPanel}>
            <TextField
              label="Friend's Wallet Address"
              color="primary"
              variant="outlined"
              className={`${classes.input} ${classes.inputLast}`}
              onChange={e => checkAddress(e.target.value)}
              error={!!errorMsg}
              helperText={errorMsg ? errorMsg : null}
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
          <Grid container item xs={12} md={7} direction="column" alignItems="flex-end">
            <Grid container item justifyContent="center" direction="column" className={classes.leftPanel}>
              <Typography variant="h3" component="h3" className={classes.notificationHeading}>
                Offer sent!
              </Typography>
              <Typography variant="h5" component="h3" className={classes.notificationSubHeading}>
                Check your wallet for the transaction status and token ID.
              </Typography>
            </Grid>

            <Grid container item justifyContent="center" direction="column" className={`${classes.leftPanel} ${classes.notificationPanel}`}>

              <Typography variant="h3" component="h3" className={classes.notificationHeading}>
                Next Steps
              </Typography>
              <Box variant="h5" component="h3" className={classes.notificationSubHeading}>
                Ask your partner to visit the accept link and paste the token ID to accept the offer.
                <div className={classes.instructions} ref={instructions}> Accept my Token of Friendship when you visit: <a href="#" className={classes.acceptLink}>{`${process.env.PUBLIC_URL}`}https://commintmint.app/friendship/accept</a>
                  <br />
                  and paste the
                  <br />
                  Token ID: {tokenId}
                </div>
                <Button onClick={copyToClipboard} variant="text">Copy message</Button>
              </Box>
            </Grid>
          </Grid>
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
