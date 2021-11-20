import {
    Container,
    Typography,
    makeStyles,
    Grid,
    Box,
    Button
  } from "@material-ui/core";
  import { Link } from 'react-router-dom';

  import walletLogos from '../assets/metamask+phantom.png'
  
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
function ConnectWallet() {
    const classes = useStyles();

    return (
        <Container maxWidth="md" className={classes.container}>
            <Grid container item justify="center">
                <Grid container item xs={12} md={8} direction="column" alignItems="flex-end">
                    <Button
                        variant="contained"
                        className={classes.ctaButton}
                        disableElevation
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
