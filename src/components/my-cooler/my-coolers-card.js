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
import RectangleIMG from '../../assets/images/cooler-img.png';
import { useNavigate } from 'react-router-dom';


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

  


function MyCoolersRowCard ({ groupId, name, fee, count, status, img, startDate, members, isMember}) {
    const [isOpen, setIsOpen] = useState(false);
    const classes = useStyles();
    const classes2 = useStyles2();
    const [time, setTime] = useState('time');
    const [date, setDate] = useState(null);
    const [uid, setUid] = useState(null)
    let today = new Date().toISOString().slice(0, 10);
    const [nTime, setnTime] = useState(null);
    const navigate = useNavigate();
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
            pt: 2,
            pb: 2,
            margin: 'auto',
            // maxWidth: 500,
            border: '1px solid black',
            flexGrow: 1,
            backgroundColor: (theme) =>
              theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
          }}
        >
          <Grid container spacing={2}>
            <Grid item>
            {/* <Avatar alt="Profile Pic" src={EmptyAvatar} style={{ width: '120px', height: '120px'}} /> */}
              <ButtonBase sx={{ width: 108, height: 108 }}>
              <Img alt="complex" src={img ? img : RectangleIMG} />
              </ButtonBase>
            </Grid>
            <Grid item xs={12} sm container spacing={2}>
              <Grid item xs container direction="column" spacing={0}>
                <Grid item xs>
                  <div style={{display: 'flex', border: '0px solid red', marginBottom: '-20px'}}>
                  <h2 style={{ fontSize: '18px'}}><b>NAME: </b></h2>
                    &nbsp; &nbsp;
                  <p style={{ fontSize: '16px'}}>{name.toUpperCase()}</p>
                  </div>
                  <div style={{display: 'flex', marginBottom: '-20px'}}>
                  <h2 style={{ fontSize: '18px'}}><b>FEE: </b></h2>
                    &nbsp; &nbsp;
                  <p style={{ fontSize: '16px'}}>{fee}</p>
                  </div>
                  <div style={{display: 'flex' }}>
                  <h2 style={{ fontSize: '18px'}}><b>COUNT: </b></h2>
                    &nbsp; &nbsp;
                  <p style={{ fontSize: '16px'}}>{count}</p>
                  </div>
                </Grid>
              </Grid>
              
              <Grid item xs direction="column" spacing={2}>
              <Box display="flex" alignItems="center" className={classes.box}>
              <Grid item xs={6} sm container spacing={1} justifyContent="flex-end" alignItems="center">
              <Grid item justifyContent="flex-end" alignItems="center" sx={{mt: 5}}>
              <Button variant="contained" style={{minHeight: '45px', minWidth: '125px', backgroundColor: '#348AED', }}
              onClick={() => {
                const groupData = {groupId, name, fee, count, img, startDate, members}
                navigate('/dashboard/members', { state: { groupData } })
              }}>
                VIEW
            </Button>
              </Grid>
              </Grid>

              </Box>
                <br/>
                  <Grid container justify="center">
                  </Grid>

              </Grid>
            </Grid>
          </Grid>
        </Paper>
        <br/>

        </>

      );
}

export default MyCoolersRowCard