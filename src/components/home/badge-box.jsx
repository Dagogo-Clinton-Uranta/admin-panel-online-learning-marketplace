import * as React from 'react';
import Typography from '@mui/material/Typography';
// import Title from './title';
import { Button, Divider, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
//import { fCurrency } from 'src/utils/formatNumber';
import { makeStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";

import badge from 'src/assets/images/badge.gif'


const useStyles = makeStyles((theme) => ({
  circle: {
    width: "200px",
    height: "200px",
    //borderRadius: "50%",
   // border: '1px solid black',
    // backgroundColor: 'white',
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: 'black',
    fontWeight: "regular",
    fontSize: "6rem",
  },

  badges: {
    width: "40px",
    height: "40px",
    //borderRadius: "50%",
   // border: '1px solid black',
    // backgroundColor: 'white',
    display: "flex",
    justifyContent: "center",
    gap:"0.2rem",
    alignItems: "center",
  
  },
}));

export default function BadgeBox() {
  const classes = useStyles();
  /*const { user } = useSelector((state) => state.auth);*/

  return (
    <>
      <Typography
            color="textPrimary"
            variant="h6"
            component="p"
          >
        <b>BADGE</b>
      </Typography>
      <Divider />
      <br/>
        <center>
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }} justifyContent="flex-start" alignItems="center" position="relative" top="-10%">
   
    <Grid item xs={2}>
    <div elevation={3} className={classes.circle}>
    <img src={badge} />
    </div>
    </Grid>

   {/* THIS IS COMMENTED OUT FOR USE IN THE FUTURE  - SAVED 30/03/2023
    <Grid item xs={2}>
    <div elevation={3} className={classes.circle}>
     h  i
    </div>
    </Grid>

    <Grid item xs={2}>
    <div elevation={3} className={classes.circle}>
    <img src={line} />
    </div>
  </Grid>*/}

    </Grid>
    </center>
   
    <p style={{fontStyle:"1.2rem",fontWeight:"bold"}}>You have Recieved <span style={{color:"brown"}}> 1</span> out of 5 badges! </p>
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: '10px' }}>
    <div></div>
      <Button
        variant="contained"
        style={{
          minHeight: "35px",
          minWidth: "100px",
          backgroundColor: "black",
          border: "1px solid black",
        }}
      >
        UPDATE
      </Button>
    </div>
        </>
    );
    }