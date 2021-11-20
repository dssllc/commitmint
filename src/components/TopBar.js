import {
  AppBar,
  Toolbar,
  // Typography,
  makeStyles,
  Button,
  Box
} from "@material-ui/core";
import { Link } from 'react-router-dom';
// import TollIcon from "@material-ui/icons/Toll";
import InfoIcon from "@material-ui/icons/Info";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PeopleIcon from "@material-ui/icons/People";

import logo from '../logo-full.png'

const useStyles = makeStyles((theme) => ({
  appBar: {
    background: "transparent",
    boxShadow: "none",
    paddingTop: '1.4rem',
    paddingBottom: '1rem',
  },
  root: {
    flexGrow: 1,
  },
  icon: {
    marginRight: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
    textDecoration: "none"
  },
  logo: {
    [theme.breakpoints.down("sm")]: {
      width: '160px',
    },
    width: '205px'
  },
  button: {
    [theme.breakpoints.down("sm")]: {
      minWidth: 32,
      paddingLeft: 8,
      paddingRight: 8,
      "& .MuiButton-startIcon": {
        margin: 0
      }
    },
    color: '#828282'
  },
  buttonText: {
    [theme.breakpoints.down("sm")]: {
      display: "none"
    },
    color: '#4F4F4F',
    fontWeight: '500'
  }
}));

export default function TopBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" color="transparent" className={classes.appBar} elevation={0}>
        <Toolbar>

          <Box
            className={classes.title}
            component={Link}
            to="/"
          >
            <img src={logo} alt="commitmint logo" className={classes.logo} />
          </Box>
          
          {/* <TollIcon className={classes.icon} />
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
            component={Link}
            to="/"
          >
            commitmint
          </Typography> */}
          <Button
            color="inherit"
            startIcon={<InfoIcon />}
            className={classes.button}
            component={Link}
            to="/about"
          >
            <span className={classes.buttonText}>About</span>
          </Button>
          <Button
            color="inherit"
            startIcon={<FavoriteIcon />}
            className={classes.button}
            component={Link}
            to="/love"
          >
            <span className={classes.buttonText}>Token of Love</span>
          </Button>
          <Button
            color="inherit"
            startIcon={<PeopleIcon />}
            className={classes.button}
            component={Link}
            to="/friendship"
          >
            <span className={classes.buttonText}>Token of Friendship</span>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );



}
