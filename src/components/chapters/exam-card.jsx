import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LockIcon from '@mui/icons-material/Lock';
import { Divider, Chip, Grid, Paper, Typography, Box, Avatar, Button, ButtonBase, Stack, 
  ToggleButton, ToggleButtonGroup, Hidden  } from '@mui/material';
import { useDispatch,useSelector } from 'react-redux';
import {fetchChapterSessions, fetchChapterQuizzes,fetchChapterInfo, deletePastExam, fetchPastExamInfo} from 'src/redux/actions/group.action'

import { useNavigate } from 'react-router-dom';

import { setRequestedSection,savePresentOpenChapter,savePresentOpenSessions } from 'src/redux/reducers/group.slice';



import {SlideDown} from 'react-slidedown'
import 'react-slidedown/lib/slidedown.css'
import SessionCard from '../sessions/session-card';
import AddSessionCard from '../sessions/addSession-card';
import AddSessionQuizCard from '../sessions/addSessionQuiz-card';
import SessionQuizletCard from '../sessions/sessionQuizlet-card';



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

const ExamCard = ({data,index,user}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [wait,setWait] =useState(false)
  const [deleting,setDeleting] =useState(false)

 
    const { chapterQuizzes,chapterSessions,presentOpenSession} = useSelector((state) => state.group);
   
    const populateEditChapter = (identity)=>{

      setWait(true)
      dispatch(fetchChapterInfo(identity))

     setTimeout(()=> {navigate('/dashboard/edit-chapter',{state:{uid:identity}})}, 1000)
    }


    const removePastExam = (uid)=>{

      if (window.confirm("Are you sure you want to delete this exam?")){
    
         setDeleting(true)
         dispatch(deletePastExam(uid))
      }
    }


    const populateEditPastExam = (identity)=>{

      setWait(true)
      dispatch(fetchPastExamInfo(identity))
  
     setTimeout(()=> {navigate('/dashboard/edit-past-exam',{state:{uid:identity}})}, 1000)
    }

  const dummyData = [
    {uid: 1, title: "General (16 mins)", desc: "Lorem ipsum dolor sit amet consectetur tesdsjk. Eget cursus..."},
    {uid: 2, title: "Public (11 mins)", desc: "Tetsla ipsum dolor sit amet consectetur tesdsjk. Eget cursus..."},
    {uid: 3, title: "Future (39 mins)", desc: "Lorem ipsum dolor sit amet consectetur tesdsjk. Eget cursus..."},
];

  
  const [loading,setLoading] =useState(false)
  const [dropDown, setDropDown] = useState(false);
  const [sessionsData,setSessionsData] = useState(chapterSessions?chapterSessions:dummyData) 
  const [quizzesData,setQuizzesData] = useState(chapterQuizzes)

  console.log("THIS IS THE CHAPTER'S INFO U ARE LOOKING 4- - -",data)
  

  useEffect(()=>{ /*
   
    if(presentOpenSession !== data.uid){setTimeout(()=>{setDropDown(false)},300)}
   
       setTimeout(()=>{setSessionsData(chapterSessions)},600)
       setTimeout(()=>{setQuizzesData(chapterQuizzes)},600)

     if(presentOpenSession === data.uid){setTimeout(()=>{setDropDown(true)},300)}  
       
*/},[chapterSessions,chapterQuizzes,presentOpenSession])


 
    useEffect(()=>{ 

      /*setSessionsData(chapterSessions)*/
    },[chapterSessions])


    const fetchSessionsAndDropDown  = (id)=> {
      console.log("ID BEING PASSED IN IS",id)
 if(!dropDown){
      setLoading(true)
      dispatch(fetchChapterSessions(id))
      dispatch(fetchChapterQuizzes(id))
      dispatch(savePresentOpenSessions(id))
      console.log(" CHAPTER SESSIONS", sessionsData)
      console.log(" CHAPTER QUIZZES", quizzesData)
     setTimeout(()=>{setLoading(false);setDropDown(true)},600)
     }
     else{
       setDropDown(false)
     }


    }



  return (
    <>
    <div className={classes.row}>
      <div className={classes.text}>
        <div style={{ color: 'black' }}>
          <b>{ `${index + 1}.) `/*data.id*/} {data && data.examName} </b>
        </div>{' '}
        <span style={{ marginLeft: '20px' }}>{data && data.examName}</span>
      </div>
      <div style={{display:"flex",flexDirection:"row",gap:"10px"}}>
        

      <Button variant="contained" style={{minHeight: '45px', minWidth: '145px', backgroundColor: 'black', }}
              onClick={() => {
                
                populateEditPastExam(data.uid)
              }}>
                 {wait?"Please wait...":"Edit"}
            </Button>

     
      <Button variant="contained" style={{minHeight: '45px', minWidth: '145px', backgroundColor: 'black', }}
              onClick={() => {
               
            

                removePastExam(data.uid)
              }}>
                {deleting?"Loading...":"Delete"}
            </Button>


       </div> 

           
    </div>
    
        {/*=================NO DROPDOWN ICON FOR THIS COMPONENT =============================*/}
          
        {/*<SlideDown style={{width:"100%"}}>
            {dropDown &&
            <>
             
           <Grid item xs container direction="column" spacing={6} style={{marginLeft:"10px",paddingLeft: '0px', paddingRight: '0px'}}>
                <br/><br/>
               {sessionsData.length?
               sessionsData.map(((dt,i) => {
              
                return (

                
                    <SessionCard data={dt} index={i} />
                )
               }))
               
               
               :
                  
                 <center>
                  <br/> <br/>
                  No Lessons available for this Chapter.
                  </center>
                
                  }
                 
              </Grid>



              
            <Grid item xs container direction="column" spacing={6} style={{marginLeft:"10px",paddingLeft: '0px', paddingRight: '0px'}}>
          
            <br/><br/>
            <center>QUIZZES</center>
            {quizzesData && quizzesData.length >0 ?
            quizzesData.map(((dt,i) => {
            
            return (
            
                
                <SessionQuizletCard data={dt} index={i} />
            )
            }))

            :
                  
            <center>
             <br/> <br/>
             No quiz available for this Chapter.
             </center>
           
            
    
              }
              <AddSessionCard chapterId={data.uid} category={data.category} subject={data.subject}  />
              <AddSessionQuizCard chapterId={data.uid} category={data.category} subject={data.subject}  />
            </Grid>

            </>
                }
              </SlideDown>*/}
            
            {/*=================NO DROPDOWN ICON FOR THIS COMPONENT END=============================*/}

   

     </>
  );
};

export default ExamCard;