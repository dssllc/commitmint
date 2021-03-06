import { Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down("sm")]: {
      position: 'static'
    },
    padding: theme.spacing(3),
    flexGrow: 1,
    position: 'absolute',
    bottom: theme.spacing(1),
    left: '40vw',
    color: '#828282'
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
