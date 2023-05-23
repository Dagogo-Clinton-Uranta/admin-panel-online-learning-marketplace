import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTheme } from '@mui/material/styles';
// import { Grid, Container, Typography, Paper, Button } from '@mui/material';
import { Button } from '@mui/material';
import {Box,Icon,Typography,CardMedia,CssBaseline,Grid,Container,FormControlLabel, Checkbox} from '@material-ui/core';
import { usePaystackPayment, PaystackButton, PaystackConsumer } from 'react-paystack';
import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate} from 'react-router-dom';
// import CoolerBoxIMG from '../assets/images/cooler-box.png';
import CoolerBoxIMG from '../assets/images/save-money.png';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { joinGroup, joinPublicGroup } from 'src/redux/actions/group.action';
import { fetchUserData } from 'src/redux/actions/auth.action';
import { notifyErrorFxn } from 'src/utils/toast-fxn';


export default function JoinCoolerPage() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const dispatch = useDispatch(); 
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useSelector((state) => state.auth);
    const { isLoading } = useSelector((state) => state.group);
    const groupData = location.state?.groupData;
    const publicKey = 'pk_test_41be8d2866325ed0e9bcf8734f6d31706640d968';
    // let amount = 100000;
    let subZero = "00";
    let amount = parseInt(groupData.fee.replace(/[^\d.]/g, '') + subZero);
    let name = user.firstName + " " + user.lastName;

    const componentProps = {
      email: user.email,
      amount: amount,
      metadata: {
        name,
      },
      publicKey,
      text: "Pay Now",
      onSuccess: () => {
        handleSubmit();
      },
      onClose: () => alert("Wait! Don't leave :("),
    }
    console.log(user.coolers, "USER");
      const handleSubmit = () => {
        let today = new Date().toLocaleDateString()
         dispatch(joinGroup(groupData?.groupId, user, today, navigate));
      }

    const validatePayment = (initializePayment) => {
      initializePayment();
     }
     const makePayment = () => {
      if(user?.walletBalance >= groupData?.feeInNum){
        let today = new Date().toLocaleDateString()
        dispatch(joinGroup(groupData?.groupId, user, today, navigate, user?.walletBalance, groupData?.feeInNum, groupData?.accountBal, groupData?.name, user?.accruedBalance ));
     }else{
      notifyErrorFxn("You do not have enough balance")
     }
     }

useEffect(() => {
  console.log("GroupData: ", groupData);
  if(location.state == null){
   return navigate("/dashboard/cooler");
  }
}, [location.state])

useEffect(() => {
  dispatch(fetchUserData(user.id));
}, [])


  return (
    <>
      <Helmet>
        <title> CMC | CMC</title>
      </Helmet>

      <Container maxWidth="xl">
      <CssBaseline/> 

       {/* <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}> */}
       <Grid container spacing={3}>
        <Grid item xs={3}>
        <Button variant="contained" style={{minHeight: '45px', minWidth: '55px', backgroundColor: '#348AED', }}
              onClick={() => {
                navigate(-1);
              }}>
                <ArrowBackIcon />
                Back
            </Button>
        </Grid>
      </Grid>
       <>
        <Grid container spacing={2} justify="center" style={{marginTop:"2rem", marginBottom:"2rem"}}>
       
       
        <Grid item xs={6}>
      <CardMedia
       style={{border: '1px solid black', backgroundColor: '#fff', paddingLeft: '30px', paddingRight: '30px'}}
        component="img"
        height="250"
        image={groupData?.img ? groupData.img : CoolerBoxIMG}
        alt="Paella dish"
      />

           <Grid item xs container direction="column" spacing={0} justifyContent="center" alignItems="center">
                <Grid item xs>
                  <div style={{display: 'flex', border: '0px solid red', marginBottom: '-20px'}}>
                  <h2 style={{ fontSize: '19px'}}><b>NAME: </b></h2>
                    &nbsp; &nbsp;
                  <p style={{ fontSize: '17px'}}>{groupData?.name.toUpperCase()}</p>
                  </div>
                  <div style={{display: 'flex', marginBottom: '-20px'}}>
                  <h2 style={{ fontSize: '19px'}}><b>FEE: </b></h2>
                    &nbsp; &nbsp;
                  <p style={{ fontSize: '17px'}}>{groupData?.fee}</p>
                  </div>
                  
                  <div style={{display: 'flex', marginBottom: '-10px' }}>
                  <h2 style={{ fontSize: '19px'}}><b>COUNT: </b></h2>
                    &nbsp; &nbsp;
                  <p style={{ fontSize: '17px'}}>{groupData?.count}</p>
                  </div>

                  <div style={{display: 'flex' }}>
                  <h2 style={{ fontSize: '19px'}}><b>START: </b></h2>
                    &nbsp; &nbsp;
                  <p style={{ fontSize: '17px'}}>{groupData?.startDate}</p>
                  </div>
                </Grid>
                <div style={{border: '1px solid grey', width: '100%'}}></div>
                <br/>
            {/* <PaystackConsumer {...componentProps} >
                {({initializePayment}) => 
                 <Button disabled={isLoading} variant="contained" style={{minHeight: '45px', minWidth: '145px', backgroundColor: '#348AED', }}
                 onClick={() => {validatePayment(initializePayment)}} 
                 >
                    <b>{isLoading ? "Loading..." : "PAY"}</b> 
                </Button>
                }
            </PaystackConsumer>   */}
             <Button disabled={isLoading} variant="contained" style={{minHeight: '45px', minWidth: '145px', backgroundColor: '#348AED', }}
                 onClick={() => makePayment()} 
                 >
                    <b>{isLoading ? "Loading..." : "PAY"}</b> 
                </Button>
              </Grid>
      
    </Grid>
       

      </Grid>
    </>
      </Container>
    </>
  );
}
