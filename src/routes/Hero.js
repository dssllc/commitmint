import {
  Container,
  Typography,
  makeStyles,
  Grid,
  Button,
  Box
} from "@material-ui/core";
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(12),
    marginBottom: theme.spacing(4),
  },
  heroTitle: {
    fontSize: '2.5rem',
    fontWeight: '700',
    color: '#333333',
    lineHeight: '100%',
    letterSpacing: 0
  },
  subHeading: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#333333',
    lineHeight: '100%',
    letterSpacing: 0
  },
  heroBody: {
    fontSize: '1.125rem',
    fontWeight: '400',
    color: '#4F4F4F',
    lineHeight: '150%',
    letterSpacing: 0,
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  ctaButton1: {
    borderRadius: '0',
    color: '#ffffff',
    backgroundColor: '#F2994A',
    '&:hover': {
      backgroundColor: '#DE802D'
    }
  },
  ctaButton2: {
    borderRadius: '0',
    color: '#ffffff',
    backgroundColor: '#2F80ED',
    '&:hover': {
      backgroundColor: '#1B69D1'
    }
  }
}));

export default function Hero() {
  const classes = useStyles();

  return (
    <Container maxWidth="md" className={classes.container}>
      <Grid container>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" component="h2" className={classes.heroTitle} gutterBottom>
            Smart Contract for Relationships
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" component="h3" className={classes.subHeading}>
            How it works
          </Typography>
          <Typography variant="body1" paragraph className={classes.heroBody}>
            Commitmint creates NFTs (Non-fungible tokens) built for two to establish permanent tokens of commitment, friendship and love. It takes two to "mint" (create) a toke and two to "burn" (reject) a token.
          </Typography>
          <Button
            variant="contained"
            className={classes.ctaButton2}
            component={Link}
            to="/friendship"
            disableElevation
          >
            Token of Friendship
          </Button>

          <Box component="div" sx={{ display: 'inline', paddingX: '2rem' }}>
           OR
          </Box>

          <Button
            variant="contained"
            className={classes.ctaButton1}
            component={Link}
            to="/love"
            disableElevation
          >
            Token of Love
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
