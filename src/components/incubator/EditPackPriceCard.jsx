import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LockIcon from '@mui/icons-material/Lock';
import { Divider, Chip, Grid, Paper, Typography, Box, Avatar, Button, ButtonBase, Stack, 
  ToggleButton, ToggleButtonGroup, Hidden  } from '@mui/material';
import { useDispatch,useSelector } from 'react-redux';
import {fetchSubjectChapters, updateVideoAndUserWatchlists,fetchSubjectInfo,addSubjectToPack, updatePackPrice} from 'src/redux/actions/group.action'

import { useNavigate } from 'react-router-dom';

import { setRequestedSection,savePresentOpenChapter } from 'src/redux/reducers/group.slice';



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
    backgroundColor:'#b6f2fcCC',
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

const EditPackPriceCard = ({packId}) => {
  console.log("PACK ID IS --->",packId)
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { allSectionVideos,requestedSection } = useSelector((state) => state.group);
    const { categoryChapters,presentOpenChapter} = useSelector((state) => state.group);
    const { singlePack} = useSelector((state) => state.group);

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

  const [packPrice,setPackPrice] =useState(singlePack && singlePack.price)


  //console.log("THE VIDEO ID IS",dummyData[0].uid)

  

  useEffect(()=>{ 
    //this code "presentOpenChapter" is responsible for the right section appearing in the dropdown, not needed here though
    //a higher level deals with this section appearing
    //if(presentOpenChapter !== data.uid){setTimeout(()=>{setDropDown(false)},300)}
   
       setTimeout(()=>{setCategoryData(categoryChapters)},600)

    },[categoryChapters,presentOpenChapter])


    const updateThisPackPrice = (id,packPrice)=>{
    
      if(window.confirm("do you confirm that this is the new price of the pack ?")){
        dispatch(updatePackPrice(id,packPrice))
      }
    }

 


    const addThisSubjectToPack = (subjectId,packId,packSubjects)=>{
   if(window.confirm("would you like to add this subject to the pack ?")){
       dispatch(addSubjectToPack(subjectId,packId,packSubjects))
    }
    }


  return (
    <>
    <div className={classes.row}>
      <div  style={{display:"flex",justifyContent:"center", alignItems:"center", gap:"5rem"}}>
       
        <span style={{ color: 'black' }}>
          <b>{'CURRENT PRICE:'} </b>
        </span>{' '}
       
       
        <span style={{display:"flex",justifyContent:"center", alignItems:"center"}} >
        <input
        value={singlePack && packPrice}
        onChange={(e)=>{setPackPrice(e.target.value)}}
        style={{ paddingLeft: '20px',fontSize:"1.5rem", border:"1px solid lightgrey",height:"4rem",width:"16rem",borderRadius:"1rem",backgroundColor:"transparent" }}/>
         
         <span style={{fontSize:"1.8rem",color:"gray",marginLeft:"20px"}}>GNF</span>
         
        </span>

      </div>

      <div className={classes.buttonSpacer}>
      <Button variant="contained" style={{minHeight: '45px', minWidth: '145px', backgroundColor: 'black', }}
              onClick={() => {
               
                updateThisPackPrice(packId,packPrice)
              
              }}>
                {loading?"Loading...":"Submit"}
            </Button>
       </div>
           
    </div>


    

     </>
  );
};

export default EditPackPriceCard;
