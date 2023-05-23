import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LockIcon from '@mui/icons-material/Lock';
import { Button } from '@mui/material';
import { useDispatch,useSelector } from 'react-redux';
import {updateVideoAndUserWatchlists} from 'src/redux/actions/group.action'

const useStyles = makeStyles((theme) => ({
  row: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor:'#F8FFEECC',
    border:'1px solid lightgrey',
    borderRadius:'5pxyyy',
    width: '100%',
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  text: {
    width: '80%',
    color: 'grey',
  },
  button: {
    width: '20%',
    marginLeft: 'auto',
  },
}));

const ListRowCard = ({data,index,user}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  console.log("THE VIDEO ID IS",data.uid)

  const sendToWatchList = (userId,videoId)=>{
    //console.log("this function is under construction")
    dispatch(updateVideoAndUserWatchlists(userId,videoId))
  }

  return (
    <div className={classes.row}>
      <div className={classes.text}>
        <div style={{ color: 'black' }}>
          <b>{ `${index + 1}.) `/*data.id*/} {data && data.title} --</b>
        </div>{' '}
        <span style={{ marginLeft: '20px' }}>{data && data.details}</span>
      </div>
<Button variant="contained" style={{minHeight: '45px', minWidth: '145px', backgroundColor: 'black', }}>
              &nbsp;&nbsp;
              <b onClick={()=>{sendToWatchList(user,data.uid)}}><span>Watch</span></b> 
            <LockIcon />
     </Button>
    </div>
  );
};

export default ListRowCard;
