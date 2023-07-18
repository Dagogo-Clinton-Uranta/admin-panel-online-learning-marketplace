import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LockIcon from '@mui/icons-material/Lock';
import { Divider, Chip, Grid, Paper, Typography, Box, Avatar, Button, ButtonBase, Stack, 
  ToggleButton, ToggleButtonGroup, Hidden  } from '@mui/material';
import { useDispatch,useSelector } from 'react-redux';
import {fetchChapterSessions, fetchSubjectChapters, updateVideoAndUserWatchlists} from 'src/redux/actions/group.action'
import { fetchVideoSubsection } from 'src/redux/actions/group.action';
import { useNavigate } from 'react-router-dom';

import { setRequestedSection,savePresentOpenChapter,savePresentOpenSessions } from 'src/redux/reducers/group.slice';
import { fetchVideoSection } from 'src/redux/actions/group.action';


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

const ChapterCard = ({data,index,user}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { allSectionVideos,requestedSection } = useSelector((state) => state.group);
    const { categoryChapters,presentOpenChapter} = useSelector((state) => state.group);
    const { chapterSessions,presentOpenSession} = useSelector((state) => state.group);
   


  const dummyData = [
    {uid: 1, title: "General (16 mins)", desc: "Lorem ipsum dolor sit amet consectetur tesdsjk. Eget cursus..."},
    {uid: 2, title: "Public (11 mins)", desc: "Tetsla ipsum dolor sit amet consectetur tesdsjk. Eget cursus..."},
    {uid: 3, title: "Future (39 mins)", desc: "Lorem ipsum dolor sit amet consectetur tesdsjk. Eget cursus..."},
];

  
  const [loading,setLoading] =useState(false)
  const [dropDown, setDropDown] = useState(false);
  const [sessionsData,setSessionsData] = useState(chapterSessions?chapterSessions:dummyData) 


  console.log("THIS IS THIS CHAPTER'S INFO - - -",data)
  

  useEffect(()=>{ 
    //this code is responsible for the right section appearing in the dropdown
    if(presentOpenSession !== data.uid){setTimeout(()=>{setDropDown(false)},300)}
   
       setTimeout(()=>{setSessionsData(chapterSessions)},600)

    },[chapterSessions,presentOpenSession])


    const fetchSessionsAndDropDown  = (id)=> {
      console.log("ID BEING PASSED IN IS",id)
 if(!dropDown){
      setLoading(true)
      dispatch(fetchChapterSessions(id))
      dispatch(savePresentOpenSessions(id))
      console.log(" CHAPTER SESSIONS", sessionsData)
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
          <b>{ `${index + 1}.) `/*data.id*/} {data && data.title} </b>
        </div>{' '}
        <span style={{ marginLeft: '20px' }}>{data && data.body}</span>
      </div>
      <Button variant="contained" style={{minHeight: '45px', minWidth: '145px', backgroundColor: 'black', }}
              onClick={() => {
               
              /*  setLoading(true) 
                dispatch(setRequestedSection(data.title))
               dispatch(fetchVideoSubsection(data.title))
                const makeRequest = async()=>{
                  console.log("i have set the requested section as",data.title)
                  dispatch(setRequestedSection(data.title))
                  dispatch(fetchVideoSubsection(data.title))}
                makeRequest().then(()=>(setTimeout(()=>{navigate('/dashboard/view-incubator', { state: { title:data.title } })},1300)))*/
                //navigate('/dashboard/add-lesson')

                fetchSessionsAndDropDown(data.uid)
              }}>
                {loading?"Loading...":"View"}
            </Button>


            <Button variant="contained" style={{minHeight: '45px', minWidth: '145px', backgroundColor: 'black', }}
              onClick={() => {
               
                navigate('/dashboard/edit-chapter')
              }}>
                {loading?"Loading...":"Edit"}
            </Button>
          

           
    </div>
    
        {/*=================THE DROPDOWN ICON =============================*/}
          
        <SlideDown style={{width:"100%"}}>
            {dropDown &&
           <Grid item xs container direction="column" spacing={6} style={{marginLeft:"10px",paddingLeft: '0px', paddingRight: '0px'}}>
                <br/><br/>
               {sessionsData.length?
               sessionsData.map(((dt,i) => {
              
                return (

                
                    <SessionCard data={dt} index={i} />
                )
               })):
                  
                 <center>
                  <br/> <br/>
                  No Sessions available for this Chapter.
                  </center>
                
                  }
              </Grid>
                }
              </SlideDown>
            
            {/*=================THE DROPDOWN ICON END=============================*/}

   

     </>
  );
};

export default ChapterCard;