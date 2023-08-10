import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LockIcon from '@mui/icons-material/Lock';
import { Divider, Chip, Grid, Paper, Typography, Box, Avatar, Button, ButtonBase, Stack, 
  ToggleButton, ToggleButtonGroup, Hidden  } from '@mui/material';
import { useDispatch,useSelector } from 'react-redux';
import {fetchChapterSessions, fetchSubjectChapters, updateVideoAndUserWatchlists,fetchChapterInfo} from 'src/redux/actions/group.action'
import { fetchVideoSubsection } from 'src/redux/actions/group.action';
import { useNavigate } from 'react-router-dom';

import { setRequestedSection,savePresentOpenChapter,savePresentOpenSessions } from 'src/redux/reducers/group.slice';



import {SlideDown} from 'react-slidedown'
import 'react-slidedown/lib/slidedown.css'
import SessionCard from '../sessions/session-card';




const useStyles = makeStyles((theme) => ({
  row: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor:'#f2ecfe',
    border:'1px solid lightgrey',
    borderRadius:'5px',
    width: '90%',
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
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

const QuizCard = (subject,sectionId,category) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log("add chapter subject",subject)
 console.log("add chapter category",category)
 console.log("add chapter section id",sectionId)

  const { allSectionVideos,requestedSection } = useSelector((state) => state.group);
    const { categoryChapters,presentOpenChapter} = useSelector((state) => state.group);
    const { chapterSessions,presentOpenSession} = useSelector((state) => state.group);
   
   

  const dummyData = [
    {uid: 1, title: "Quiz ", body: "A quiz at the end of this subject. Take this to reinforce the concepts..."},
    {uid: 2, title: "Public (11 mins)", body: "Tetsla ipsum dolor sit amet consectetur tesdsjk. Eget cursus..."},
    {uid: 3, title: "Future (39 mins)", body: "Lorem ipsum dolor sit amet consectetur tesdsjk. Eget cursus..."},
];

  
  const [wait,setWait] =useState(false)
  const [dropDown, setDropDown] = useState(false);
  const [sessionsData,setSessionsData] = useState(chapterSessions?chapterSessions:dummyData) 


  //console.log("THIS IS THIS CHAPTER'S INFO - - -",data)
  

  /*useEffect(()=>{ 
    //this code is responsible for the right section appearing in the dropdown
    if(presentOpenSession !== data.uid){setTimeout(()=>{setDropDown(false)},300)}
   
       setTimeout(()=>{setSessionsData(chapterSessions)},600)

    },[chapterSessions,presentOpenSession])*/




  return (
    <>
    <div className={classes.row}>
      <div className={classes.text}>
        <div style={{ color: 'black' }}>
          <b>{/* `${dummyData[0].uid}.) `*/} {/*dummyData[0].title*/} </b>
        </div>{' '}
        <span style={{ marginLeft: '20px',color: 'black' }}>{"Add a new chapter here"}</span>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
      {/*<Button variant="contained" style={{minHeight: '45px', minWidth: '145px', backgroundColor: 'black', }}
              onClick={() => {
               
            

                fetchSessionsAndDropDown(data.uid)
              }}>
                {loading?"Loading...":"View"}
            </Button>
          */}

            <Button variant="contained" style={{minHeight: '45px', minWidth: '145px', backgroundColor: 'black', }}
              onClick={() => {
                setWait(true)
                setTimeout(()=>{
                navigate("/dashboard/add-chapter",{state:{sectionId:subject.sectionId,subject:subject.subject,category:subject.category}})
                }
                ,1000)
              }}>
                 {wait?"Please wait...":<span><b style={{fontSize:"1.5rem"}}>+</b> Add Chapter</span>}
            </Button>
       </div> 

           
    </div>
    
       
   

     </>
  );
};

export default QuizCard;