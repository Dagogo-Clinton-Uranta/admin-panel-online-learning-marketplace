import * as React from 'react';
import { Avatar, Button, Divider, FormControlLabel, Grid, Paper, Typography,  } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fCurrency } from 'src/utils/formatNumber';
import AvatarIcon from '../../assets/images/icon-avatar.png';
import { makeStyles } from '@material-ui/core/styles';
import LockIcon from '@mui/icons-material/Lock';

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
  
  function Row({ title, avatarSrc, type }) {
    const classes = useStyles();
    return (
      <Paper className={classes.paper} square>
      {/* <Avatar className={classes.avatar} src={avatarSrc} /> */}
      <Typography variant="h6" style={{ flex: 1, fontWeight: 'lighter' }}>{title}</Typography>
      <Typography variant="h6" style={{ textAlign: "right", marginRight: '10px', fontWeight: 'lighter' }}>
      <Button
            variant="contained"
            style={{
              minHeight: '40px',
              maxWidth: '100px',
              backgroundColor: type ? 'white' : 'black',
              color: type ? 'black' : 'white',
              border: '1px solid black',
            }}
          >
           {type ? 'RESUME' : <>WATCH<LockIcon sx={{fontSize: '20px'}}/></>}
          </Button>
      </Typography>
    </Paper>
    );
  }

export default function VideoDetailsBox() {
  const { user } = useSelector((state) => state.auth);
  const { transactions } = useSelector((state) => state.transaction);
  const classes = useStyles();

  const rowData = [
    { img: '21-01-2023', title: '1. Intro to Psyc (16 mins)  Lorem ipsum dolor sit amet', type: false },
    { img: '21-01-2023', title: '2. Equality (16 mins)  Lorem ipsum dolor sit amet', type: false },
    { img: '21-01-2023', title: '3. Equality (16 mins)  Lorem ipsum dolor sit amet', type: true},
    { img: '21-01-2023', title: '4. Communication (16 mins)  Lorem ipsum dolor sit amet', type: true },
    { img: '21-01-2023', title: '5. Disposition  (16 mins)  Lorem ipsum dolor sit amet', type: false},
  ];

  return (
    <>
      <Grid container spacing={1} className={classes.container}>
      {rowData.map((row) => (
        <Grid item xs={12} key={row.title}>
          <Row title={row.title} avatarSrc={AvatarIcon} time={row.time} type={row.type}/>
        </Grid>
      ))}
    </Grid>
    </>
  );
}
