import {
  Container,
  Typography,
  makeStyles
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  }
}));

export default function About() {
  const classes = useStyles();

  return (
    <Container maxWidth="md" className={classes.container}>
      <Typography variant="body1" paragraph>
        Commitmint creates NFTs (Non-fungible tokens) built for two to establish permanent tokens of commitment, friendship and love. It takes two to "mint" (create) a toke and two to "burn" (reject) a token.
      </Typography>
    </Container>
  );
}
