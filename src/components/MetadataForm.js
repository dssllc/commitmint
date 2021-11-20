import {
  makeStyles,
  Grid,
  Button,
  TextField,
  Divider
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  leftPanel: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    border: '.75px solid #BDBDBD',
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: theme.spacing(3)
  },
  ctaButton: {
    borderRadius: '50px',
    fontSize: '1rem',
    fontWeight: '500',
    color: '#ffffff',
    backgroundColor: '#2F80ED',
    width: '160px',
    '&:hover': {
      backgroundColor: '#1B69D1'
    },
  },
  input: {
    width: '100%',
    marginBottom: theme.spacing(3),
  },
  inputLast: {
    marginBottom: '0'
  },
  uploadButton: {
    width: '100%',
    marginBottom: theme.spacing(3),

  },
  divider: {
    width: '100%',
    marginBottom: theme.spacing(3),
  },
  order2: {
    [theme.breakpoints.down("sm")]: {
      order: 2
    }
  }
}));

export default function MetadataForm() {
  const classes = useStyles();

  return (
    <Grid container item xs={12} md={7} direction="column" alignItems="flex-end" className={classes.order2}>

      <Grid container item component="form" justifyContent="center" direction="column" className={classes.leftPanel}>

        <TextField label="Your name" color="primary" variant='outlined' className={classes.input} />
        {/* <TextField label="Upload Metadata (DOC, PDF, Google Doc)" color="primary" variant='outlined'  className={classes.input}/> */}
        <input
          accept="image/*"
          className={classes.input}
          style={{ display: 'none' }}
          id="raised-button-file"
          // multiple
          type="file"
        />
        <label htmlFor="raised-button-file">
          <Button variant="outlined" component="span" className={classes.uploadButton}>
            Upload Metadata (DOC, PDF, Google Doc)
          </Button>
        </label>
        <Divider className={classes.divider} />
        <TextField label="Partner’s Name" color="primary" variant='outlined' className={classes.input} />
        <TextField label="Partner’s Wallet Address" color="primary" variant='outlined' className={`${classes.input} ${classes.inputLast}`} />
      </Grid>

      <Button
        variant="contained"
        className={classes.ctaButton}
        disableElevation
      >
        Send token
      </Button>

    </Grid>
  );
}
