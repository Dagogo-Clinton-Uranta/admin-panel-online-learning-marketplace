import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LockIcon from '@mui/icons-material/Lock';
import { Divider, Chip, Grid, Paper, Typography, Box, Avatar, Button, ButtonBase, Stack, 
  ToggleButton, ToggleButtonGroup, Hidden  } from '@mui/material';
import { useDispatch,useSelector } from 'react-redux';
import {fetchSubjectChapters, updateVideoAndUserWatchlists} from 'src/redux/actions/group.action'

import { useNavigate } from 'react-router-dom';

import { setRequestedSection,savePresentOpenChapter } from 'src/redux/reducers/group.slice';
import { fetchVideoSection } from 'src/redux/actions/group.action';


import {SlideDown} from 'react-slidedown'
import 'react-slidedown/lib/slidedown.css'

import ChapterCard from   'src/components/chapters/chapter-card';


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

  const { allSectionVideos,requestedSection } = useSelector((state) => state.group);
    const { categoryChapters,presentOpenChapter} = useSelector((state) => state.group);
   // const { user} = useSelector((state) => state.auth);


  const dummyData = [
    {uid: 1, title: "General (16 mins)", desc: "Lorem ipsum dolor sit amet consectetur tesdsjk. Eget cursus..."},
    {uid: 2, title: "Public (11 mins)", desc: "Tetsla ipsum dolor sit amet consectetur tesdsjk. Eget cursus..."},
    {uid: 3, title: "Future (39 mins)", desc: "Lorem ipsum dolor sit amet consectetur tesdsjk. Eget cursus..."},
];

  
  const [loading,setLoading] =useState(false)
  const [dropDown, setDropDown] = useState(false);
  const [categoryData,setCategoryData] = useState(categoryChapters?categoryChapters:dummyData) 

  //console.log("THE VIDEO ID IS",dummyData[0].uid)
  console.log("I AM RECEIVING from my parent",data)
  

  useEffect(()=>{ 
    //this code is responsible for the right section appearing in the dropdown
    if(presentOpenChapter !== data.uid){setTimeout(()=>{setDropDown(false)},300)}
   
    setCategoryData(categoryChapters)
    },[categoryChapters,presentOpenChapter])


    const fetchChaptersAndDropDown  = (title)=> {
      console.log("ID BEING PASSED IN IS",title)
 if(!dropDown){
      setLoading(true)
      dispatch(fetchSubjectChapters(title))
      dispatch(savePresentOpenChapter(title))
     const makeRequest = async()=>{
     
      dispatch(fetchVideoSection(title))}
  
    makeRequest().then(()=>(setTimeout(()=>{setLoading(false);setDropDown(true)},600)))
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
               
             
                fetchChaptersAndDropDown(data.uid)
              }}>
                {loading?"Loading...":"View"}
            </Button>

           
    </div>


     {/*=================THE DROPDOWN ICON =============================*/}
          
     <SlideDown style={{width:"100%"}}>
     {dropDown &&
    <Grid item xs container direction="column" spacing={6} style={{marginLeft:"10px",paddingLeft: '0px', paddingRight: '0px',transition:" height 5s ease"}}>
         <br/><br/>
        {data.length?
        data.map(((dt,i) => {
         return (

         
             <ChapterCard data={dt} index={i} user={user.uid}/>
         )
        })):
           
          <center>
           <br/> <br/>
           No Lessons available for this chapter.
           </center>
         
           }
       </Grid>
         }
       </SlideDown>
     
     {/*=================THE DROPDOWN ICON END=============================*/}

     </>
  );
};

export default SubSectionCard;
