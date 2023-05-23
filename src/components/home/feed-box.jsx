import * as React from 'react';
import { Avatar, Button, Divider, FormControlLabel, Grid, Paper, Typography,  } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
//import { fCurrency } from 'src/utils/formatNumber';
import AvatarIcon from 'src/assets/images/rec.png';



import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
      borderTop: `1px solid black`,
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

export default function FeedBox(feed) {
  //const { user } = useSelector((state) => state.auth);
  //const { transactions } = useSelector((state) => state.transaction);
  const classes = useStyles();
   console.log("feed is :",feed)

 

  const rowData = [
    { img: '21-01-2023', title: '2B Socket Wrench', time: '4:00PM' },
    { img: '21-01-2023', title: 'Networking Event', time: '2:00PM' },
    { img: '21-01-2023', title: 'Manhattan Project ', time: '10:20AM'},
    { img: '21-01-2023', title: 'Window Sponsorship ', time: '4:30PM' },
    { img: '21-01-2023', title: 'Eft Equipment Building ', time: '8:00AM' },

   /* feed?feed.feed.map((item)=>{
      return( { img: '21-01-2023', title:item.title, time: '4:00PM' })
    }):
    { img: '21-01-2023', title: '2B Socket Wrench', time: '4:00PM' },
    { img: '21-01-2023', title: 'Networking Event', time: '2:00PM' },
    { img: '21-01-2023', title: 'Manhattan Project ', time: '10:20AM'},
    { img: '21-01-2023', title: 'Window Sponsorship ', time: '4:30PM' },
    { img: '21-01-2023', title: 'Eft Equipment Building ', time: '8:00AM' }*/
  ];

  return (
    <>
      <Grid container alignItems="center" spacing={2}>
        <Grid item xs={6}>
          <Typography color="textPrimary" variant="h6" component="p" sx={{pl: 2, pr: 2}}>
            <b>FEED</b>
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Button
            variant="contained"
            style={{
              minHeight: '35px',
              minWidth: '100px',
              backgroundColor: 'white',
              color: 'black',
              border: '1px solid black',
            }}
          >
            ADMIN
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button
            variant="contained"
            style={{
              minHeight: '35px',
              minWidth: '100px',
              backgroundColor: 'black',
              color: 'white',
              border: '1px solid black',
            }}
          >
            ALL
          </Button>
        </Grid>
      </Grid>
      <br/>
      <Grid container spacing={1} className={classes.container}>
      {rowData.map((row,i) => (
        <Grid item xs={12} key={row.title}>
          <Row title={feed.feed?feed.feed[feed.feed.length-(i+1)].title:row.title} avatarSrc={AvatarIcon} time={row.time} />
        </Grid>
      ))}
    </Grid>
    <div style={{borderTop: '1px solid black'}}></div>
    <div style={{ display: "flex", justifyContent: "space-between", marginTop: '10px' }}>
      <div></div>
      <Button
        variant="contained"
        style={{
          minHeight: "35px",
          minWidth: "100px",
          backgroundColor: "black",
          border: "1px solid black",
          marginRight: '10px'
        }}
      >
        FEED
      </Button>
    </div>
    </>
  );
}
