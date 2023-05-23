import React, { useState, useMemo, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { styled } from '@mui/material/styles';
import { Divider, Chip, Grid, Paper, Typography, Box, Avatar, Button, ButtonBase, Stack, 
    ToggleButton, ToggleButtonGroup, Hidden  } from '@mui/material';
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

  


function VideosRowCard ({ videoId, title, desc, tags, isDetail}) {
    const [isOpen, setIsOpen] = useState(false);
    const classes = useStyles();
    const [uid, setUid] = useState(null)
    let today = new Date().toISOString().slice(0, 10);
    const [nTime, setnTime] = useState(null);
    const navigate = useNavigate();
    // const { allUsers, connects, isLoading } = useSelector((state) => state.user);


    return (
        <>
          <Paper
          elevation={3}
          sx={{
            p: 1,
            pt: 2,
            pb: 2,
            margin: 'auto',
            // maxWidth: 500,
            // border: '1px solid black',
            borderTop:'1px solid lightgray',
            flexGrow: 1,
            backgroundColor: (theme) =>
              theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
          }}
        >
          <Grid container spacing={2}>
          <Grid item justifyContent="center">
          <h2 style={{ fontSize: '19px'}}><b>{title.toUpperCase()}</b></h2>
          </Grid>
         
          <Grid item container spacing={2}>
            <Grid item>
            {/* <Avatar alt="Profile Pic" src={EmptyAvatar} style={{ width: '120px', height: '120px'}} /> */}
              <ButtonBase sx={{ width: 128, height: 128 }}>
              <Img alt="complex" src={RectangleIMG} />
              </ButtonBase>
            </Grid>
            <Grid item xs={12} sm container spacing={2}>
              <Grid item xs container direction="column" spacing={0}>
                <Grid item xs>
                  <div style={{display: 'flex', border: '0px solid red', marginBottom: '-20px', marginLeft: isDetail && '150px' }}>
                  <h2 style={{ fontSize: '19px'}}><b>{title.toUpperCase()}</b></h2>
                    &nbsp; &nbsp;
                  {/* <p style={{ fontSize: '17px'}}>{title.toUpperCase()}</p> */}
                  </div>
                  <div style={{display: 'flex', marginBottom: '-20px', border: '0px solid red', marginLeft: isDetail && '10px', width: '100%'}}>
                  {/* <h2 style={{ fontSize: '19px'}}><b>FEE: </b></h2> */}
                    &nbsp; &nbsp;
                  <p style={{ fontSize: '17px'}}>{desc}</p>
                  </div>
                  {/* <div style={{display: 'flex' }}>
                  <h2 style={{ fontSize: '19px'}}><b>TAGS: </b></h2>
                    &nbsp; &nbsp;
                  <p style={{ fontSize: '17px'}}>{tags}</p>
                  </div> */}
                </Grid>
              </Grid>
              
              <Grid item xs direction="column" spacing={2}>
              <Box display="flex" alignItems="center" className={classes.box}>
              <Grid item xs={6} sm container spacing={1} justifyContent="flex-end" alignItems="center">
              <Grid item justifyContent="flex-end" alignItems="center" sx={{mt: 5}}>
             
            <Button variant="contained" style={{minHeight: '45px', minWidth: '145px', backgroundColor: 'black', }}
              onClick={() => {
                const groupData = {videoId, title, desc, tags}
                navigate('/dashboard/video-details', { state: { groupData } })
              }}>
                {"View"}
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
        </Grid>
        </Paper>
        <br/>

        </>

      );
}

export default VideosRowCard