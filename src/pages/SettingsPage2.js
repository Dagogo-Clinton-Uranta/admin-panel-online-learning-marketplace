import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTheme } from '@mui/material/styles';
// import { Grid, Container, Typography, Paper, Button } from '@mui/material';
import { Button, TextField } from '@mui/material';
import {Box,Icon,Typography,CardMedia,CssBaseline,Grid,Container,FormControlLabel, Checkbox, makeStyles} from '@material-ui/core';
import { usePaystackPayment, PaystackButton, PaystackConsumer } from 'react-paystack';
import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import DEFAULTIMG from '../assets/images/rec.png';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { notifyErrorFxn } from 'src/utils/toast-fxn';
import { updateProfile, uploadImage, uploadProfileImage } from 'src/redux/actions/auth.action';


const useStyles = makeStyles((theme) => ({
  textField: {
  padding: '8px',
   border: '0px solid grey',
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

export default function SettingsPage() {
  const classes = useStyles();
    const dispatch = useDispatch(); 
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useSelector((state) => state.auth);
    let today = new Date().toISOString().slice(0, 10);
    let nextMonth = new Date(today);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    let nextMonthDate = nextMonth.toISOString().slice(0, 10);

    const type = location?.state?.type;
    const [loading, setLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState({selectedFile: [], selectedFileName: []});
    const [file, setFile] = useState();
     const [state, setState] = useState({
      paymentLink: user?.paymentLink ? user?.paymentLink : "",
      password: "",
      imageUrl: user?.imageUrl ? user?.imageUrl : "",
    })

    const handleChange = (e) => {
      const value = e.target.value;
      setState({
        ...state,
        [e.target.name]: value
      });
    }

    const handleselectedFile = event => {
      setSelectedFile({
          selectedFile: event.target.files[0],
          selectedFileName: event.target.files[0].name
      });
      setFile(URL.createObjectURL(event.target.files[0]));
  };

    const settingsUpdate = (e) => {
      e.preventDefault();
    //   console.log("OLD SATE: ",state);
      state.paymentLink = state.paymentLink == "" ? user?.paymentLink : state.paymentLink;
    //   state.imageUrl = selectedFile.selectedFile == "" ? user?.imageUrl : selectedFile.selectedFile;
    //   return;
      setLoading(true);
      const id = user.id;
      const imageUrl = user.imageUrl;
      if(selectedFile.selectedFile.length == 0){
        // notifyErrorFxn("You have not uploaded Image");
        dispatch(updateProfile(state, id, '', navigate, setLoading, imageUrl));
      }else{
        dispatch(uploadProfileImage(state, selectedFile.selectedFile, id, navigate, setLoading));
      }
     
    }
   
  return (
    <>
      <Helmet>
        <title> Cooler | Settings </title>
      </Helmet>

      <Container maxWidth="xl">
      <CssBaseline/> 
       <>
       <form onSubmit={settingsUpdate}>
        <Grid container spacing={2} justify="center" style={{marginTop:"2rem", marginBottom:"2rem"}}>
       
        <Grid item xs={6}>
        {/* <center>
        <Typography variant="h4">
         <b>SETTINGS</b>
        </Typography>
        </center>
        <br/> */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CardMedia
            style={{ border: '0.2px solid black', backgroundColor: '#fff', width: '240px' }}
            component="img"
            height="140"
            width="540"
            image={file ? file : state.imageUrl !== "" ? state.imageUrl : DEFAULTIMG}
            alt="IMG"
        />
        </div>
          <center>
          <Button component="label" variant="contained" style={{minHeight: '45px', minWidth: '145px', backgroundColor: '#348AED', marginTop: '15px' }}>
            <b>UPLOAD</b>
            <input
            type="file"
            style={{ display: 'none' }}
            onChange={handleselectedFile}
            />
          </Button>
          </center>

              <br/>      
    </Grid>
       

      </Grid>

      <Grid item xs container direction="column" spacing={6} style={{paddingLeft: '100px', paddingRight: '100px'}}>
                <Grid item xs>
                  <div style={{display: 'flex', marginBottom: '-20px'}}>
                  <h2 style={{ fontSize: '19px', width: '40%'}}><b>PAYMENT LINK: </b></h2>
                    &nbsp; &nbsp;
                    <TextField id="outlined-basic" fullWidth label="Enter Payment Link" variant="outlined" 
                    name="paymentLink"
                    value={state.paymentLink}
                    onChange={handleChange}
                    />
                  </div>
                  <br/><br/>
                  <div style={{display: 'flex', marginBottom: '-20px'}}>
                  <h2 style={{ fontSize: '19px', width: '40%'}}><b>PASSWORD: </b></h2>
                    &nbsp; &nbsp;
                    <TextField id="outlined-basic" fullWidth label="Enter Password" variant="outlined" 
                    name="password"
                    value={state.password}
                    onChange={handleChange}
                    />
                  </div>
                  <br/>

                </Grid>
                <div style={{border: '1px solid grey', width: '100%'}}></div>
                <br/>
                 <center>
                <Button type="submit" disabled={loading} variant="contained" style={{minHeight: '45px', maxWidth: '100px', backgroundColor: '#348AED'}}>
                    <b>{loading ? "Loading..." : "UPDATE"}</b> 
                </Button>
                 </center>
              </Grid>
            </form>
    </>
      </Container>
    </>
  );
}
