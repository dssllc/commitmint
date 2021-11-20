import {
  Container,
  makeStyles,
  Grid,
} from "@material-ui/core";

import ConnectWallet from "../components/ConnectWallet";
import MetadataForm from "../components/MetadataForm";
import UserAccountPanel from "../components/UserAccountPanel";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  }
}));

export default function TokenOfLove() {
  const classes = useStyles();

  const isWeb3Wallet = true;

  if (!isWeb3Wallet) {
    return <ConnectWallet />
  }

  return (
    <Container maxWidth="md" className={classes.container}>
      <Grid container item justify="center" spacing={3}>
        <MetadataForm />
        <UserAccountPanel />
      </Grid>
    </Container>
  );
}
