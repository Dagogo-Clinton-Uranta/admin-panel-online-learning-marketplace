import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LockIcon from '@mui/icons-material/Lock';
import { Divider, Chip, Grid, Paper, Typography, Box, Avatar, Button, ButtonBase, Stack, 
  ToggleButton, ToggleButtonGroup, Hidden  } from '@mui/material';
import { useDispatch,useSelector } from 'react-redux';
import {fetchLessonInfo,deleteLesson} from 'src/redux/actions/group.action'

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

const SessionCard = ({data,index}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { allSectionVideos,requestedSection } = useSelector((state) => state.group);
    const { categoryChapters,presentOpenChapter} = useSelector((state) => state.group);
    const { chapterSessions,presentOpenSession} = useSelector((state) => state.group);
  console.log("the Lesson UID you're looking for is!",data.uid)


  const dummyData = [
    {uid: 1, title: "General (16 mins)", desc: "Lorem ipsum dolor sit amet consectetur tesdsjk. Eget cursus..."},
    {uid: 2, title: "Public (11 mins)", desc: "Tetsla ipsum dolor sit amet consectetur tesdsjk. Eget cursus..."},
    {uid: 3, title: "Future (39 mins)", desc: "Lorem ipsum dolor sit amet consectetur tesdsjk. Eget cursus..."},
];

  
  const [loading,setLoading] =useState(false)
  const [wait,setWait] =useState(false)
  const [deleting,setDeleting] =useState(false)
  const [dropDown, setDropDown] = useState(false);
  const [sessionsData,setSessionsData] = useState(chapterSessions?chapterSessions:dummyData) 


  const populateEditLesson = (identity)=>{

    setWait(true)
    dispatch(fetchLessonInfo(identity))

   setTimeout(()=> {navigate('/dashboard/edit-lesson',{state:{uid:identity}})}, 1000)
  }

const removeLesson = (uid)=>{

  if (window.confirm("Are you sure you want to delete this lesson?")){

     setDeleting(true)
     dispatch(deleteLesson(uid))
  }
}
  


  

  return (
    <>
    <div className={classes.row}>
      <div className={classes.text}>
        <div style={{ color: 'black' }}>
          <b>{ `${index + 1}.) `/*data.id*/} {data && data.title} </b>
        </div>{' '}
        <span style={{ marginLeft: '20px' }}>{data && data.body}</span>
      </div>
     
         <div style={{display:"flex",justifyContent:"center",marginLeft:"0.5rem",gap:"1rem"}}>
            <Button variant="contained" style={{minHeight: '45px', minWidth: '145px', backgroundColor: 'black', }}
              onClick={() => {
               
                populateEditLesson(data.uid)
              }}>
                {wait?"Please wait...":"Edit"}
            </Button>


            <Button variant="contained" style={{minHeight: '45px', minWidth: '145px', backgroundColor: 'black', }}
              onClick={() => {
               
                removeLesson(data.uid)
              }}>
                {deleting?"Deleting...":"Delete"}
            </Button>
        </div>

           
    </div>
    
      
   

     </>
  );
};

export default SessionCard;