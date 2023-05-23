import { useState,useEffect,useRef} from 'react';
import { Helmet } from 'react-helmet-async';
import { useTheme } from '@mui/material/styles';
// import { Grid, Container, Typography, Paper, Button } from '@mui/material';
import { Button, TextField } from '@mui/material';
import {Box,Icon,Typography,CardMedia,CssBaseline,Grid,Container,FormControlLabel, Checkbox, makeStyles} from '@material-ui/core';
import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import DEFAULTIMG from '../assets/images/video-player.png';
import ListRowCard from 'src/components/incubator/list-card';
import SubSectionCard from   'src/components/incubator/list-card';

import {fetchVideoSubsection} from 'src/redux/actions/group.action';



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

export default function ViewIncubatorPage() {
   const dispatch = useDispatch()
   const location = useLocation()
   const { allSectionVideos,requestedSection } = useSelector((state) => state.group);
   const { user} = useSelector((state) => state.auth);
   console.log("user's info is",user)

  
   const dummyData = [
    {id: 1, title: "General (16 mins)", desc: "Lorem ipsum dolor sit amet consectetur tesdsjk. Eget cursus..."},
    {id: 2, title: "Public (11 mins)", desc: "Tetsla ipsum dolor sit amet consectetur tesdsjk. Eget cursus..."},
    {id: 3, title: "Future (39 mins)", desc: "Lorem ipsum dolor sit amet consectetur tesdsjk. Eget cursus..."},
];


   const [subSection,setSubSection] = useState(allSectionVideos)
   const [pastRequest,setPastRequest] = useState('')
   const [data,setData] = useState(allSectionVideos?allSectionVideos:dummyData)
  
  console.log("first item of data is:",data[0])




  useEffect(()=>{
    
    //dispatch(fetchVideoSubsection(location.state.title))
     setData(allSectionVideos)
     
  },[requestedSection])
  


  return (
    <>
      <Helmet>
        <title> View | Incubator </title>
      </Helmet>

      <Container maxWidth="xl">
      <h1 style={{position:"relative",left:"90px",fontWeight:"bold",marginBottom:"40px",fontSize:"30px"}}>{data.length? (`${data[0].section.toUpperCase()} - ${data[0].subSection}`):''}</h1>
      <CssBaseline/> 
       <>
        <Grid container spacing={2} justify="center" style={{marginTop:"2rem", marginBottom:"2rem"}}>
       
        <Grid item xs={6}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CardMedia
            style={{ border: '0.2px solid black', backgroundColor: '#fff', width: '540px' }}
            component="img"
            // height="140"
            // width="540"
            image={DEFAULTIMG}
            alt="IMG"
        />
        </div>  
    </Grid>
       

      </Grid>

      <Grid item xs container direction="column" spacing={6} style={{paddingLeft: '100px', paddingRight: '100px'}}>
         <h2><b>{data.length? data[0].subSection.toUpperCase():''}</b></h2>
          <p style={{color: 'grey'}}>Lorem ipsum dolor sit amet consectetur. Eget ac risus ipsum maecenas cursus adipiscing eros. Mi viverra semper gravida pretium elementum. Pellentesque lacus ultrices luctus sit semper. Elementum tortor donec adipiscing tortor ut mollis quis. Molestie ipsum libero euismod ut eu quis.</p>
                <br/><br/>
               {data.length?
               data.map(((dt,i) => {
                return (

                    <ListRowCard data={dt} index={i} user={user.uid}/>
                )
               })):
                  
                 <center>
                  <br/> <br/>
                  No videos available for this sub section.
                  </center>
                
                  }
              </Grid>
    </>
      </Container>
    </>
  );
}
