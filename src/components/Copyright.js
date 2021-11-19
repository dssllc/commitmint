import { Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    flexGrow: 1
  },
}));

export default function Copyright() {
  const classes = useStyles();

  return (
    <footer className={classes.root}>
      <Typography variant="subtitle2" align="center" component="p">
      Built in the EthGlobal Web3Jam Hackathon 2021
      </Typography>
    </footer>
  );
}
