import React, { useState, useMemo, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
// import Button from '@material-ui/core/Button';
import { TextField, FormControl, FormControlLabel, RadioGroup, Radio, createMuiTheme, ThemeProvider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { styled } from '@mui/material/styles';
import { Divider, Chip, Grid, Paper, Typography, Box, Avatar, Button, ButtonBase, Stack, 
    ToggleButton, ToggleButtonGroup, Hidden  } from '@mui/material';
import { borderRadius } from '@mui/system';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import BookDevModal from './bookdev-modal';
import RectangleIMG from '../../assets/images/rectangle.png';
  


const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  });

const useStyles = makeStyles((theme) => ({
    textField: {
    padding: '8px',
     border: '1px solid grey',
    },
    paper: {
      display: "flex",
      width: "auto",
    },
    grid: {
      width: "auto",
    },
    arrow: {
      padding: theme.spacing(3),
    },
    box: {
    //   padding: theme.spacing(3),
      paddingLeft: theme.spacing(8),
    },
  }));




  const useStyles2 = makeStyles((theme) => ({
    selected: {
      "&&": {
        // backgroundColor: theme.palette.primary.main,
        backgroundColor: 'black',
        color: theme.palette.secondary.main
      }
    }
  }));

  



function EmptyRowCard ({msg}) {
    const [isOpen, setIsOpen] = useState(false);
    const classes = useStyles();
    const classes2 = useStyles2();
    const [time, setTime] = useState('time');
    const [date, setDate] = useState(null);
    const [uid, setUid] = useState(null)
    let today = new Date().toISOString().slice(0, 10);
    const [nTime, setnTime] = useState(null);
    // const { allUsers, connects, isLoading } = useSelector((state) => state.user);

    const notifyError = () => toast.error('Please select a date later than today!', {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });

    const handleChange = (event, newtime) => {

    };

    const setUser = (uid_btn, newtime) => {
     setnTime(newtime);
        if(date == null){
          notifyError();
         }else if(uid != uid_btn){
          alert('Select time from the dev date selected');
         } else{
          setIsOpen(true);
         console.log('UID: ', uid);
         console.log('Date Val: ', date);
         console.log('Selected Time is:', newtime);
         }
    };
    return (
        <>
          <Paper
          sx={{
            p: 1,
            pt: 8,
            pb: 2,
            margin: 'auto',
            minHeight: 200,
            // maxWidth: 500,
            border: '1px solid black',
            flexGrow: 1,
            backgroundColor: (theme) =>
              theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
          }}
        >
      
          <center><p style={{color: 'black'}}>{msg}</p></center>
        </Paper>
        <br/>
        </>

      );
}

export default EmptyRowCard