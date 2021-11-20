import {
  Container,
  Typography,
  makeStyles,
  Grid,
  Button
} from "@material-ui/core";
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
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
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/friendship"
          >
            Token of Friendship
          </Button>
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            to="/love"
          >
            Token of Love
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
