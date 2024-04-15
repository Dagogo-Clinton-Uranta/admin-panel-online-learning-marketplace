import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LockIcon from '@mui/icons-material/Lock';
import { Divider, Chip, Grid, Paper, Typography, Box, Avatar, Button, ButtonBase, Stack, 
  ToggleButton, ToggleButtonGroup, Hidden  } from '@mui/material';
import { useDispatch,useSelector } from 'react-redux';
import {fetchSubjectChapters, updateVideoAndUserWatchlists,fetchSubjectInfo} from 'src/redux/actions/group.action'

import { useNavigate } from 'react-router-dom';

import { setRequestedSection,savePresentOpenChapter } from 'src/redux/reducers/group.slice';

import PFP from 'src/assets/images/recruiter-pfp.jpeg'


import {SlideDown} from 'react-slidedown'
import 'react-slidedown/lib/slidedown.css'

import ChapterCard from   'src/components/chapters/chapter-card';
import ExamCard from   'src/components/chapters/exam-card';
import { populate } from 'react-redux-firebase';
import QuizCard from '../chapters/quiz-card';
import PastExamCard from '../chapters/pastExam-card';


const useStyles = makeStyles((theme) => ({
  row: {
    display: 'flex',
    flexDirection:"column",
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor:'light grey',
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
  buttonSpacer: {
    display: 'flex',
    flexDirection:'row',
    alignItems: 'center',
    justifyContent:'center',
    gap:'20px',
    
  },
  button: {
    width: '20%',
    marginLeft: 'auto',
  },
}));

const BlogCard = ({data,index}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { allSectionVideos,requestedSection } = useSelector((state) => state.group);
    const { categoryChapters,presentOpenChapter,subjectPastExams} = useSelector((state) => state.group);
 


  const dummyData = [
    {uid: 1, title: "General (16 mins)", desc: "Lorem ipsum dolor sit amet consectetur tesdsjk. Eget cursus..."},
    {uid: 2, title: "Public (11 mins)", desc: "Tetsla ipsum dolor sit amet consectetur tesdsjk. Eget cursus..."},
    {uid: 3, title: "Future (39 mins)", desc: "Lorem ipsum dolor sit amet consectetur tesdsjk. Eget cursus..."},
];

  
  const [loading,setLoading] =useState(false)
  const [wait,setWait] =useState(false)
  const [dropDown, setDropDown] = useState(false);
  const [categoryData,setCategoryData] = useState(categoryChapters?categoryChapters:dummyData) 

  //console.log("THE VIDEO ID IS",dummyData[0].uid)
  console.log(" SUBJECT CARD  CHECK !!!!- - -",data)
  

  useEffect(()=>{ 
    //this code is responsible for the right section appearing in the dropdown
    if(presentOpenChapter !== data.uid){setTimeout(()=>{setDropDown(false)},300)}
   
       setTimeout(()=>{setCategoryData(categoryChapters)},600)

    },[categoryChapters,presentOpenChapter])


    const fetchChaptersAndDropDown  = (id)=> {
      console.log("ID BEING PASSED IN IS",id)
 if(!dropDown){
      setLoading(true)
      dispatch(fetchSubjectChapters(id))
      dispatch(savePresentOpenChapter(id))
      console.log("I WANNA SEE CATEGORY CAHPTERS", categoryData)
     setTimeout(()=>{setLoading(false);setDropDown(true)},600)
     }
     else{
       setDropDown(false)
     }


    }

    const populateEditSubject = (identity)=>{

      setWait(true)
      dispatch(fetchSubjectInfo(identity))

     setTimeout(()=> {navigate('/dashboard/edit-subject',{state:{uid:identity}})}, 1500)
    }



  return (
    <>
    <div className={classes.row}>
      <div className={classes.text}>
        <div style={{ color: 'black' }}>
          <h2 style={{ fontSize: '2rem' }}> {data && data.title} </h2>
        </div>{' '}
        <span style={{ marginLeft: '20px' }}>{data && data.body}</span>
      </div>

   <div style={{display:"flex",justifyContent:"flex-end",alignItems:"flex-end",width:"100%"}}>
      <div className={classes.buttonSpacer} >
      <img src={PFP} alt="company logo" style={{borderRadius:"50%",height:"45px"}}/>

          <div style={{display:"flex",flexDirection:"column"}}>
           <div>Malcolm John</div>
           <div>Added on 03/04/2024 </div>
          </div>
       </div>
      </div> 

    </div>



     </>
  );
};

export default BlogCard;
