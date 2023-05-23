import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LockIcon from '@mui/icons-material/Lock';
import { Button } from '@mui/material';
import { useDispatch,useSelector } from 'react-redux';
import {updateVideoAndUserWatchlists} from 'src/redux/actions/group.action'
import { setRequestedSection } from 'src/redux/reducers/group.slice';
import { fetchVideoSubsection } from 'src/redux/actions/group.action';
import { useNavigate } from 'react-router-dom';

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

const SubSectionCard = ({data,index,user}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading,setLoading] =useState(false)
  console.log("THE VIDEO ID IS",data.uid)

  const sendToWatchList = (userId,videoId)=>{
    //console.log("this function is under construction")
    dispatch(updateVideoAndUserWatchlists(userId,videoId))
  }

  return (
    <div className={classes.row}>
      <div className={classes.text}>
        <div style={{ color: 'black' }}>
          <b>{ `${index + 1}.) `/*data.id*/} {data && data.title} </b>
        </div>{' '}
        <span style={{ marginLeft: '20px' }}>{data && data.body}</span>
      </div>
      <Button variant="contained" style={{minHeight: '45px', minWidth: '145px', backgroundColor: 'black', }}
              onClick={() => {
                //const groupData = {id, title, body, img}
                setLoading(true)
                dispatch(setRequestedSection(data.title))
               
               dispatch(fetchVideoSubsection(data.title))
                const makeRequest = async()=>{
                  console.log("i have set the requested section as",data.title)
                  dispatch(setRequestedSection(data.title))
                  dispatch(fetchVideoSubsection(data.title))}
                //use a promise not setTimeout
                makeRequest().then(()=>(setTimeout(()=>{navigate('/dashboard/view-incubator', { state: { title:data.title } })},1300)))
              }}>
                {loading?"Loading...":"Edit"}
            </Button>
    </div>
  );
};

export default SubSectionCard;
