import React,{useState,useEffect} from 'react';
import { Avatar, Button, Divider, FormControlLabel, Grid, Paper, Typography,  } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setInboxDetails } from 'src/redux/reducers/chat.slice';
import {getUserProfilePic} from 'src/redux/actions/auth.action';
import { Link } from 'react-router-dom';
//import { fCurrency } from 'src/utils/formatNumber';
import AvatarIcon from 'src/assets/images/rec.png';
import logo1 from 'src/assets/images/logo1.png';
import logo2 from 'src/assets/images/logo2.png';
import logo3 from 'src/assets/images/logo3.png';
import logo4 from 'src/assets/images/logo4.png';
import logo5 from 'src/assets/images/logo5.png';
import logo6 from 'src/assets/images/logo6.png';
import logo7 from 'src/assets/images/logo7.png';
import logo8 from 'src/assets/images/logo8.png';


import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
      borderTop: `1px solid lightgray`,
      // borderBottom: `1px solid black`,
      padding: theme.spacing(0.5),
      display: 'flex',
      alignItems: 'center',
    },
    avatar: {
      marginRight: theme.spacing(2),
    },
    container: {
        display: 'flex',
        justifyContent: 'space-between',
      },
  }));
  
  function Row({ title, avatarSrc, time }) {
    const classes = useStyles();
    return (
      <Paper className={classes.paper} square>
      <Avatar className={classes.avatar} src={avatarSrc} />
      <Typography variant="h6" style={{ flex: 1, fontWeight: 'lighter' }}>{title}</Typography>
      <Typography variant="h6" style={{ textAlign: "right", marginRight: '10px', fontWeight: 'lighter' }}>
        {time}
      </Typography>
    </Paper>
    );
  }

export default function FeedMiniBox(feed) {
  //const { user } = useSelector((state) => state.auth);
  //const { transactions } = useSelector((state) => state.transaction);
  const classes = useStyles();
   console.log("feed is :",feed)

   const dispatch = useDispatch();

   const rowData = [
    { img: '21-01-2023', title: '2B Socket Wrench', time: '4:00PM' },
    { img: '21-01-2023', title: 'Networking Event', time: '2:00PM' },
    { img: '21-01-2023', title: 'Manhattan Project ', time: '10:20AM'},
    { img: '21-01-2023', title: 'Window Sponsorship ', time: '4:30PM' },
    { img: '21-01-2023', title: 'Eft Equipment Building ', time: '8:00AM' },


  ];

  const [userData,setUserData] = useState(feed && feed.feed?feed.feed:rowData)
  console.log("is there a feed going into this component",feed.feed)

  const { profileImages } = useSelector((state) => state.auth);
  const {candidates } = useSelector((state) => state.candidates);

   const setInboxData = (data) => {
    dispatch(setInboxDetails(data));   
    // console.log("DATA:", data);
  }

  const userIdArray = []

  useEffect(()=>{
    if(feed && feed.feed){
     userData.forEach((item)=>{
       userIdArray.push(item.senderId)
     })
    }
      
  },[candidates])

  useEffect(()=>{
  
    if(userIdArray.length>0){
      console.log("the user id array",userIdArray)
      dispatch(getUserProfilePic(userIdArray))
     }
    
      
  },[userIdArray,candidates])




  const imageData = [
    logo1,logo2,logo3,logo4,logo5,logo6,logo7,logo8
  ]

  return (
    <>
      <Grid container alignItems="center" spacing={2}>
       
       
      </Grid>
      <br/>
      <Grid container spacing={1} className={classes.container}>
     
    {userData.length &&
      
      userData.map((row,i) => (
        <Grid item xs={12} key={row.title} onClick={() => setInboxData(row.title)}>
          
          <Row title={row.title.slice(0,10)+"..."} avatarSrc={profileImages?profileImages[i]:AvatarIcon} time={rowData[i].time} />
          {/*<Row title={feed.feed?feed.feed[feed.feed.length-(i+1)].title:row.title} avatarSrc={imageData[imageData.length -(i+1)]} />*/}
        </Grid>
      ))}
    </Grid>
    <div style={{borderTop: '1px solid lightgray'}}></div>
    <div style={{ display: "flex", justifyContent: "space-between", marginTop: '10px' }}>
      <div></div>
      
    </div>
    </>
  );
}
