import * as React from 'react';
import Typography from '@mui/material/Typography';
// import Title from './title';
import { Button, Divider, Grid } from '@mui/material';
import { Avatar,  ButtonBase, Paper  } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
//import { fCurrency } from 'src/utils/formatNumber';
import CMCgraph from 'src/assets/images/CMC-graph.png';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  width: '150%',
  maxHeight: '80%',
  position:"relative",
  top:"-20%",
 
});

export default function BoxOne() {
  //const { user } = useSelector((state) => state.auth);

  return (
      <>
    
     <p style={{fontSize:"12px",}}><strong>PRE-QUALIFICATION:</strong> (3+ THIS MONTH)</p>
    
    <Grid container spacing={3} sx={{mt: 1}}>
    <Grid item xs container direction="column" spacing={0} sx={{pl: 2, pr: 2}}>
        <ButtonBase sx={{ width: '100%', height: 0.8, marginBottom: '1rem' }}>
        <Img alt="demo-graph"   src={CMCgraph} />
        </ButtonBase>
        </Grid> 

     {/* <Grid item xs={6}>
      <center>
      <Typography
            color="textPrimary"
            variant="h6"
            component="p"
          >
        <b>VIDEOS</b>
      </Typography>
      </center>
      <br/>
      <center>
        <Typography
            color="textPrimary"
            variant="h1"
            component="p"
          >
        <b>11</b>
      </Typography></center>
      </Grid>
      <Grid item xs={6}>
      <center>
      <Typography
            color="textPrimary"
            variant="h6"
            component="p"
          >
        <b>CONTRACTS</b>
      </Typography>
      </center>
      <br/>
      <center>
        <Typography
            color="textPrimary"
            variant="h1"
            component="p"
          >
        <b>3</b>
      </Typography></center>
  </Grid>*/}
    </Grid>
    </>
  );
}