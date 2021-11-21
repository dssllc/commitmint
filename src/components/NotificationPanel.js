import React from 'react'
import {
    Typography,
    makeStyles,
    Grid,
    Box,
  } from "@material-ui/core";

import partyPopper from "../assets/party-popper.png";


const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4),
    },
    notificationPanel: {
        backgroundColor: "#2F80ED",
        borderRadius: "12px",
        color: "#fff",
        border: "none",
        padding: theme.spacing(2),
        display: "flex",
        alignItems: "center",
        marginBottom: theme.spacing(3),
    },
    notificationSubHeading: {
        fontSize: ".75rem",
        fontWeight: "500",
        textTransform: "uppercase",
        lineHeight: "100%",
        letterSpacing: 0,
        marginBottom: theme.spacing(1),
        color: "#fff",
    },
    notificationHeading: {
        color: "#fff",
        fontSize: "1.75rem",
        fontWeight: "700"
    },
    notificationIcon: {
        width: "3.5rem",
        marginRight: "5%"
    },
    notificationBody: {
        fontSize: "1.1rem",
        fontWeight: "400",
        color: "#fff",
        lineHeight: "150%",
        letterSpacing: 0,
        overflowWrap: 'anywhere',
    },
}));

function NotificationPanel({action}) {
    const classes = useStyles();

    return (
            <Grid container item direction="row" className={classes.notificationPanel}>
                <Box width="65px" >
              <img src={partyPopper} alt="" className={classes.notificationIcon}/>
              </Box>
              {/* 🎉 */}
              <Box width="80%">
                <Typography variant="h6" component="h3" className={`${classes.notificationSubHeading}`}>
                  Update
                </Typography>

                <Typography variant="h5" component="h3" className={`${classes.notificationHeading}`}>
                 {action === 'send token' ? `Offer Sent!!!` : `Offer Accepted!!!`}
                </Typography>
                {action === 'send token' ?
                    <Typography variant="h5" component="h3" className={`${classes.notificationBody} ${classes.notificationHeading}`}>
                        Check your wallet for the transaction status and token ID.
                    </Typography> 
                    : null
                }
              </Box>
            </Grid>
    )
}

export default NotificationPanel
