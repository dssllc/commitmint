import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  Button,
} from '@material-ui/core';
import TollIcon from '@material-ui/icons/Toll';
import InfoIcon from '@material-ui/icons/Info';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PeopleIcon from '@material-ui/icons/People';

const useStyles = makeStyles((theme) => ({
  customAppBar: {
    background: 'transparent',
    boxShadow: 'none'
  },
  root: {
    flexGrow: 1,
  },
  icon: {
    marginRight: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
  },
  button: {
    [theme.breakpoints.down("sm")]: {
      minWidth: 32,
      paddingLeft: 8,
      paddingRight: 8,
      "& .MuiButton-startIcon": {
        margin: 0
      }
    }
  },
  buttonText: {
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  }
}));

export default function TopBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" color="transparent" className={classes.appBar} elevation={0}>
        <Toolbar>
          <TollIcon className={classes.icon} />
          <Typography variant="h6" color="inherit" noWrap className={classes.title}>
            commitmint
          </Typography>
          <Button 
            color="inherit" 
            startIcon={<InfoIcon />}
            className={classes.button}
          >
            <span className={classes.buttonText}>About</span>
          </Button>
          <Button 
            color="inherit" 
            startIcon={<FavoriteIcon />}
            className={classes.button}
          >
            <span className={classes.buttonText}>Token of Love</span>
          </Button>
          <Button 
            color="inherit" 
            startIcon={<PeopleIcon />}
            className={classes.button}
          >
            <span className={classes.buttonText}>Token of Friendship</span>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );


  
}
