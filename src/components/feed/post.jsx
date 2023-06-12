import React, { useState, useMemo, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
// import Button from '@material-ui/core/Button';
import { TextField, FormControl, FormControlLabel, RadioGroup, Radio, createMuiTheme, ThemeProvider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { styled } from '@mui/material/styles';
import { Divider, Chip, Grid, Paper, Typography, Box, Avatar, Button, ButtonBase, Stack, 
    ToggleButton, ToggleButtonGroup, Hidden  } from '@mui/material';
import { useHistory } from 'react-router-dom';
import RECTANGLELONG from '../../assets/images/rectangle-long.png';
import {addToNotices} from 'src/redux/actions/chat.action';
import { getUserProfilePic } from 'src/redux/actions/auth.action';


const useStyles = makeStyles((theme) => ({
  rectangle: {
    height: '50px',
    width: '100%',
    backgroundColor: 'blue',
  },
}));

 


function Post ({ handleConnect }) {
  const classes = useStyles();
  const {candidates } = useSelector((state) => state.candidates);
  console.log("candidates from store",candidates)

const [message,setMessage] =useState('')
const { user } = useSelector((state) => state.auth);
console.log("user id is actually:", user.uid)
  const dispatch = useDispatch();

  const postMessage = () =>{
    dispatch(addToNotices(message,user.uid));
  
    
  } 

    return (
        <>
          <Paper
          sx={{
            p: 1,
            pt: 2,
            pb: 2,
            margin: '0 auto',
            marginBottom:"4rem",
          //maxWidth: {xl:1090,lg:900,md:800,sm:650},
          maxWidth: {xl:"94%",lg:"96%",md:"94%",sm:"90%"},
            border: '1px solid lightgrey',
            flexGrow: 1,
            /*backgroundColor: (theme) =>
              theme.palette.mode === 'dark' ? '#1A2027' : '#fff',*/
              backgroundColor:"black",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs container direction="column" spacing={0}>
                <div style={{width: '100%', height: '127px', border: '1px solid lightgray'}}>
                 <textarea  style={{width: '100%', height: '100%'}} 
          value={message}  onChange ={(e)=>setMessage(e.target.value)}/>
                </div>
            </Grid>
          </Grid>
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: '10px' }}>
       
        <Button
          variant="contained"
          style={{
            minHeight: "35px",
            minWidth: "100px",
            backgroundColor: "black",
            border: "1px solid white",
            marginRight: '10px'
          }}
          onClick={()=>{postMessage(message)}}
        >
          UPLOAD
        </Button>
        <Button
          variant="contained"
          style={{
            minHeight: "35px",
            minWidth: "100px",
            backgroundColor: "white",
            color: 'black',
            border: "1px solid black",
            marginRight: '10px'
          }}
        >
          POST
        </Button>
      </div>

        </Paper>
        <br/>

        </>

      );
}

export default Post