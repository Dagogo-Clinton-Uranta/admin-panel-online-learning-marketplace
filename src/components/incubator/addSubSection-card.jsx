import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LockIcon from '@mui/icons-material/Lock';
import { Divider, Chip, Grid, Paper, Typography, Box, Avatar, Button, ButtonBase, Stack, 
  ToggleButton, ToggleButtonGroup, Hidden  } from '@mui/material';
import { useDispatch,useSelector } from 'react-redux';
import {fetchSubjectChapters, updateVideoAndUserWatchlists,fetchSubjectInfo,fetchSubjectsForAdding} from 'src/redux/actions/group.action'

import { useNavigate } from 'react-router-dom';




import {SlideDown} from 'react-slidedown'
import 'react-slidedown/lib/slidedown.css'

import ChapterCard from   'src/components/chapters/chapter-card';
import { populate } from 'react-redux-firebase';
import QuizCard from '../chapters/quiz-card';
import SubSectionCard from './subSection-card';
import AddSubjectToPackCard from './addSubjectToPackCard';


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

const AddSubSectionCard = ({topLevelName,categoryId,categoryName,subjectsInPack,packId}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { allSectionVideos,requestedSection } = useSelector((state) => state.group);
    const { categoryChapters,presentOpenChapter} = useSelector((state) => state.group);
    const { user} = useSelector((state) => state.auth);
   const { subjectsForAdding,categoryVideos,presentOpenMenu } = useSelector((state) => state.group);

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
 
  const [data,setData] = useState(subjectsForAdding?subjectsForAdding:dummyData)


  useEffect(()=>{
    
    setData(subjectsForAdding)

  },[subjectsForAdding])

      const fetchSubjectsToAddAndDropDown  = (cat) =>{

          if(!dropDown){

            setWait(true)

           

            const makeRequest = async()=>{
              dispatch(fetchSubjectsForAdding(cat))
          }
      
          makeRequest().then(()=>(setTimeout(()=>{setWait(false);setDropDown(true)},1000)))

          }else{
            setDropDown(false)
          }

      }
 

    const sendToAddSubject = (levelName="6eme Annee",identity="hi")=>{

      
      //dispatch(fetchSubjectInfo(identity))
      if(subjectsInPack && subjectsInPack.length >0){
       fetchSubjectsToAddAndDropDown(categoryName)
      }else{
        setWait(true)
     setTimeout(()=> {navigate('/dashboard/add-subject',{state:{uid:identity,levelName:levelName}})}, 1000)
      }
    
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
             
               sendToAddSubject(topLevelName,categoryId)
              }}>
                {wait?"Please Wait...":<span><b style={{fontSize:"1.5rem"}}>+</b> Add Subject{subjectsInPack && subjectsInPack.length >0 && ' To Pack'}</span> }
            </Button>
       </div>
           
    </div>

     

    <SlideDown style={{width:"100%"}}>
            {dropDown &&
        <>
        <center style={{fontSize:"1.3em"}}>SELECT A SUBJECT BELOW, TO ADD TO THIS PACK</center>
     <Grid item xs container direction="column" spacing={6} style={{marginLeft:"10px",paddingLeft: '0px', paddingRight: '0px',transition:" height 5s ease"}}>
                <br/><br/>
               {data.length?
               
               data.map(((dt,i) => {
                console.log("dt inside map is",dt)
                return (

                
                    <AddSubjectToPackCard data={dt} index={i} user={user.uid} packId={packId}/*categoryId is the same as packId */ packSubjects={subjectsInPack}/>
                )
               }))
               
               
               :
                  <>
                 <center>
                  <br/> <br/>
                  No Subjects available for this sub section.
                  </center>
              
                  </>
                  }

                     
            <center style={{fontSize:"1.3em"}}>
            
                              
            <Button variant="contained" style={{minHeight: '45px', minWidth: '145px', backgroundColor:'black' }}
              onClick={() => {
             
                setDropDown(false)
              }}>
                {<span>CANCEL &nbsp;  <b style={{fontSize:"1rem"}}>x</b> </span> }
            </Button>
            
                  </center>

                
        </Grid>
        </>
      }
        </SlideDown>

     </>
  );
};

export default AddSubSectionCard;
