import {
  Typography,
  makeStyles,
  Grid,
  Box,
  Avatar,
} from "@material-ui/core";

import walletDp1 from '../assets/wallet_dp1.png'

const useStyles = makeStyles((theme) => ({
  rightPanel: {
    backgroundColor: 'rgba(47, 128, 237, 0.1)',
    borderRadius: '12px',
    border: '.75px solid #2F80ED',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    display: 'flex',
  },
  walletLogos: {
    margin: '0 auto',
    width: '250px',
    marginBottom: theme.spacing(3),
  },
  subHeading: {
    fontSize: '.75rem',
    fontWeight: '500',
    color: '#828282',
    textTransform: 'uppercase',
    lineHeight: '100%',
    letterSpacing: 0,
    marginBottom: theme.spacing(1),

  },
  walletAddress: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: '#333333',
  },
  walletAvatar: {
    marginRight: '12px'
  },
  order1: {
    [theme.breakpoints.down("sm")]: {
      order: 1
    }
  },
}));

export default function UserAccountPanel() {
  const classes = useStyles();

  return (
    <Grid item xs={12} md={4} className={classes.order1}>
      <Grid container item direction="row" className={classes.rightPanel}>
        <Avatar className={classes.walletAvatar} alt="wallet address" src={walletDp1} />
        <Box>
          <Typography variant="h6" component="h3" className={classes.subHeading}>
            Your account
          </Typography>

          <Typography variant="h5" component="h3" className={classes.walletAddress}>
            0x89242D542....08B2
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}
