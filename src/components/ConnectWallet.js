import {
  Container,
  Typography,
  makeStyles,
  Grid,
  Box,
  Button
} from "@material-ui/core";
import walletLogos from '../assets/metamask+phantom.png';
import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';

const injected = new InjectedConnector({ supportedChainIds: [1, 4, 1337] });

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4),
    },
    leftPanel: {
        backgroundColor: '#fff',
        borderRadius: '12px',
        border: '.75px solid #BDBDBD',
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: theme.spacing(3)
    },
    walletLogos: {
        margin: '0 auto',
        width: '250px',
        marginBottom: theme.spacing(3),
    },
    subHeading: {
        fontSize: '1.5rem',
        fontWeight: '700',
        color: '#333333',
        lineHeight: '100%',
        letterSpacing: 0,
        textAlign: 'center',
        marginBottom: theme.spacing(1),

    },
    heroBody: {
        fontSize: '1.125rem',
        fontWeight: '400',
        color: '#4F4F4F',
        lineHeight: '150%',
        letterSpacing: 0,
        textAlign: 'center',
        width: '90%'

    },
    ctaButton: {
        borderRadius: '50px',
        fontSize: '1rem',
        fontWeight: '500',
        color: '#ffffff',
        backgroundColor: '#2F80ED',
        '&:hover': {
            backgroundColor: '#1B69D1'
         },
    }
}));

function ConnectWallet(props) {
    if (!props.w3r) {
      throw new Error('Missing web3React');
    }
    const web3React = props.w3r;

    const classes = useStyles();

    function initConnection() {
      web3React.activate(injected);
    }

    return (
        <Container maxWidth="md" className={classes.container}>
            <Grid container item justifyContent="center">
                <Grid container item xs={12} md={8} direction="column" alignItems="flex-end">
                    <Button
                        variant="contained"
                        className={classes.ctaButton}
                        disableElevation
                        onClick={initConnection}
                    >
                        Connect your Wallet
                    </Button>
                    <Box className={classes.leftPanel}>
                        <img src={walletLogos} className={classes.walletLogos} alt="wallet logos" />
                        <Typography variant="h6" component="h3" className={classes.subHeading}>
                            Connect your wallet
                        </Typography>
                        <Typography variant="body1" paragraph className={classes.heroBody}>
                        Connect your wallet to begin. We currently support Metamask &amp; phantom
                        </Typography>
                    </Box>

                </Grid>
            </Grid>
        </Container>
    )
}

export default ConnectWallet
