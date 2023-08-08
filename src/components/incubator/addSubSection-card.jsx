import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LockIcon from '@mui/icons-material/Lock';
import { Divider, Chip, Grid, Paper, Typography, Box, Avatar, Button, ButtonBase, Stack, 
  ToggleButton, ToggleButtonGroup, Hidden  } from '@mui/material';
import { useDispatch,useSelector } from 'react-redux';
import {fetchSubjectChapters, updateVideoAndUserWatchlists,fetchSubjectInfo} from 'src/redux/actions/group.action'

import { useNavigate } from 'react-router-dom';

import { setRequestedSection,savePresentOpenChapter } from 'src/redux/reducers/group.slice';
import { fetchVideoSection } from 'src/redux/actions/group.action';


import {SlideDown} from 'react-slidedown'
import 'react-slidedown/lib/slidedown.css'

import ChapterCard from   'src/components/chapters/chapter-card';
import { populate } from 'react-redux-firebase';
import QuizCard from '../chapters/quiz-card';


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
  buttonSpacer: {
    display: 'flex',
    flexDirection:'column',
    alignItems: 'center',
    justifyContent:'center',
    gap:'20px'
  },
  button: {
    width: '20%',
    marginLeft: 'auto',
  },
}));

const AddSubSectionCard = ({data,index,user}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { allSectionVideos,requestedSection } = useSelector((state) => state.group);
    const { categoryChapters,presentOpenChapter} = useSelector((state) => state.group);
   // const { user} = useSelector((state) => state.auth);


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
  console.log("I AM RECEIVING from my parent AS - - -",data)
  

 

    const sendToEditSubject = (identity)=>{

      setWait(true)
      //dispatch(fetchSubjectInfo(identity))

     setTimeout(()=> {navigate('/dashboard/edit-course',{state:{uid:identity}})}, 1000)
    }



  return (
    <>
    <div className={classes.row}>
      <div className={classes.text}>
        <div style={{ color: 'black' }}>
          <b> {/*data && data.title*/} </b>
        </div>{' '}
        <b style={{ marginLeft: '20px',color: 'black' }}>{"Add a new subject here"}</b>
      </div>

      <div className={classes.buttonSpacer}>
     

            <Button variant="contained" style={{minHeight: '45px', minWidth: '145px', backgroundColor:'black' }}
              onClick={() => {
             
               sendToEditSubject(data.uid)
              }}>
                {wait?"Please Wait...":<span><b style={{fontSize:"1.5rem"}}>+</b> Add Subject</span> }
            </Button>
       </div>
           
    </div>


     </>
  );
};

export default AddSubSectionCard;
