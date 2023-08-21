import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LockIcon from '@mui/icons-material/Lock';
import { Divider, Chip, Grid, Paper, Typography, Box, Avatar, Button, ButtonBase, Stack, 
  ToggleButton, ToggleButtonGroup, Hidden  } from '@mui/material';
import { useDispatch,useSelector } from 'react-redux';

import { fetchQuizInfo,deleteQuiz } from 'src/redux/actions/group.action';
import { useNavigate } from 'react-router-dom';





import {SlideDown} from 'react-slidedown'
import 'react-slidedown/lib/slidedown.css'




const useStyles = makeStyles((theme) => ({
  row: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor:'#fefcec',
    border:'1px solid lightgrey',
    borderRadius:'5px',
    width: '90%',
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(10),
  },
  buttonSpacer: {
    display: 'flex',
    flexDirection:'column',
    alignItems: 'center',
    justifyContent:'center',
    gap:'20px'
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

const SessionQuizletCard = ({data,index}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const [wait,setWait] =useState(false)
  
  const [deleting,setDeleting] =useState(false)

  const removeQuiz = (uid)=>{

    if (window.confirm("Are you sure you want to delete this Quiz?")){
  
       setDeleting(true)
       dispatch(deleteQuiz(uid))
    }
  }


  const populateEditQuiz = (identity)=>{

    setWait(true)
    dispatch(fetchQuizInfo(identity))

   setTimeout(()=> {navigate('/dashboard/edit-quiz',{state:{uid:identity}})}, 1000)
  }






  return (
    <>
    <div className={classes.row}>
      <div className={classes.text}>
        <div style={{ color: 'black' }}>
          <b>{ `${data.lessonNumber}.) `/*data.id*/} {data && data.title} </b>
        </div>{' '}
        <span style={{ marginLeft: '20px' }}>{data && data.body}</span>
      </div>
     
         <div style={{display:"flex",justifyContent:"center",marginLeft:"0.5rem",gap:"1rem"}}>
            <Button variant="contained" style={{minHeight: '45px', minWidth: '145px', backgroundColor: 'black', }}
              onClick={() => {
               
                populateEditQuiz(data.uid)
              }}>
                {wait?"Please wait...":"Edit"}
            </Button>
          
            <Button variant="contained" style={{minHeight: '45px', minWidth: '145px', backgroundColor: 'black', }}
              onClick={() => {
               
                removeQuiz(data.uid)
              }}>
                {deleting?"Deleting...":"Delete"}
            </Button>
         </div>  
           
    </div>
    
      
   

     </>
  );
};

export default SessionQuizletCard;