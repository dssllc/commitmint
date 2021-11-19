import { Container, Typography, makeStyles, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  title: {
    // fontFamily: "'Mali', cursive",
    fontSize: 72,
    letterSpacing: '-0.25rem'
  },
  container: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  }
}));

export default function Hero() {
  const classes = useStyles();

  return (
    <Container maxWidth="md" className={classes.container}>
      <Grid container>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" component="h2" gutterBottom>
            Smart Contract for Relationships
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" component="h3">
            How it works
          </Typography>
          <Typography variant="body1" paragraph>
            Commitmint creates NFTs (Non-fungible tokens) built for two to establish permanent tokens of commitment, friendship and love. It takes two to "mint" (create) a toke and two to "burn" (reject) a token.
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}
