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

export default function TokenOfLove() {
  const classes = useStyles();

  return (
    <Container maxWidth="md" className={classes.container}>
      <Typography variant="body1" paragraph>
        Token of Love
      </Typography>
    </Container>
  );
}
