import { Container,Grid, TextField, Typography, TextareaAutosize, Button, Paper,Divider,Box} from '@mui/material';
import { useRef, useState,useEffect} from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import UPLOADIMG from '../assets/images/upload.png';
import { addTeacher, fetchSubjectsForAdding,fetchSubjectsBasedOnStudent, updatePurchasedCourses, clearSubjectsBasedOnStudent} from 'src/redux/actions/group.action';

import { useDispatch, useSelector } from 'react-redux';
import { notifyErrorFxn } from 'src/utils/toast-fxn';
import users from 'src/_mock/user';

import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Chip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { saveSubjectsForAdding } from 'src/redux/reducers/group.slice';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '4rem',
    paddingRight: '4rem',
    color:"black"
  },
  searchInput: {
    background: '#FFFFFF',
   
    border: '1px solid #00000026',
    padding: '10px',
    borderRadius: '8px',
    cursor: 'pointer',
    // marginRight: theme.spacing(2),
    width: '100%',
    minWidth: '100%',
    '& .MuiInputBase-input': {
      color: 'grey',
    },
    '& .MuiInputBase-input::placeholder': {
      color: 'grey',
    },
    '& .MuiInput-underline:before': {
      borderBottomColor: 'grey',
    },
    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
      borderBottomColor: 'grey',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'grey',
    },
  },

  select: {
    '&:before': {
        borderColor: "black",
    },
    '&:after': {
        borderColor: "black",
    }
  },
  icon: {
    fill: "black",
}



}));

function AddTeacher() {
  const navigate = useNavigate();
  const location = useLocation()
 // console.log("location is",location.state.levelName,location.state.uid)


  const dispatch = useDispatch();
  const classes = useStyles()
  


  const [loading,setLoading] = useState(false)
  const [wait,setWait] = useState(false)

  const [level,setLevel] = useState('')
  const [body,setBody] = useState('')
  const [studentId,setStudentId] =useState('studentId')
  const [email,setEmail] = useState('')
  const [course,setCourse] = useState([])
  const [readyList,setReadyList] = useState(false)


  const [lastName,setLastName] =useState('')
  const [imageUrl,setImageUrl] =useState('')
 

  const { user } = useSelector((state) => state.auth);
  const { subjectsForAdding} = useSelector((state) => state.group);
  const [subjectRequested,setSubjectRequested] = useState(true)
  const [subjectsForAddingId,setSubjectsForAddingId] = useState()
  const [subjectsForAddingTitle,setSubjectsForAddingTitle] = useState()
  const [changeList,setChangeList] = useState(false)


  /*useEffect(()=>{
    dispatch(clearSubjectsBasedOnStudent())
  },[])*/


   useEffect(()=>{
    setSubjectsForAddingTitle(subjectsForAdding && subjectsForAdding.map((item)=>(item.title)))

    setSubjectsForAddingId(subjectsForAdding && subjectsForAdding.map((item)=>(item.uid)))

    if(!subjectsForAdding){

      setSubjectsForAddingTitle()
      setSubjectsForAddingId()
  
    }
  },[subjectsForAdding])



  useEffect(()=>{
    setSubjectsForAddingTitle(subjectsForAdding && subjectsForAdding.map((item)=>(item.title)))

    setSubjectsForAddingId(subjectsForAdding && subjectsForAdding.map((item)=>(item.uid)))

    if(!subjectsForAdding){

      setSubjectsForAddingTitle()
      setSubjectsForAddingId()
  
    }


  },[subjectsForAdding])



  useEffect(()=>{
  if(email.length === 0 ){setCourse([])
    
    dispatch(clearSubjectsBasedOnStudent())
    setSubjectsForAddingTitle([])

    setSubjectsForAddingId([])
  
  }
},[])




  console.log("subjects for adding Title details are--->:",subjectsForAddingTitle)


  const addObject ={
    studentId,
    lastName,
    body,
    level:level,
    imageUrl
  }

  const addThisTeacher = async(addObject,navigate) => {
    
    if(!studentId||!lastName||!imageUrl || !body ||!level ){
      notifyErrorFxn("Please make sure to fill in all fields.")
    }
    else{
    
    setLoading(true)
    dispatch(addTeacher(addObject,navigate))
   
    // console.log("identity is",identity)
    // console.log("update this subject is updating.........")
    setTimeout(()=>{setLoading(false)},1800)
    }
  }


const updateCourses = ()=>{
  setChangeList(true)
  dispatch(updatePurchasedCourses(studentId,email,course,navigate))
  console.log("UPDATE-- PUCHASED COURSES HAS BEEN TRIGGERED")
}

const handleClick = ()=>{ }



  const fetchSubjectsToAdd = (cat) =>{

    if(!email){
      notifyErrorFxn("Please make sure to fill in all student fields.")
    }else{
      setSubjectRequested(!subjectRequested)
      setWait(true)

      setCourse([])

      
      const makeRequest = async()=>{
        dispatch(fetchSubjectsBasedOnStudent(studentId,email,setReadyList,setStudentId))
    }

    makeRequest().then(()=>(setTimeout(()=>{setWait(false)
      setSubjectsForAddingTitle( subjectsForAdding.map((item)=>(item.title)))

      setSubjectsForAddingId( subjectsForAdding.map((item)=>(item.uid)))
      //window.location.reload()
    
    },600)))
  }
   
}
 
const handleDelete1 = (chosenId) => {
  let placeholder =   course.filter((item)=>(item.id !== chosenId))
  


    setCourse([...placeholder])
    
};



  return (
    <>
    <Container maxWidth="xl">



    <div style={{display:"flex",justifyContent:"space-between",marginBottom:"6rem"}}>
       
      
       </div>



    <h1 style={{position:"relative",fontWeight:"bold",marginBottom:"40px",fontSize:"30px"}}>NEW ORDER</h1>

    <Grid item xs={12} sx={{ display: 'flex' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant="h4" component="p">
              ADD STUDENT AND COURSE DETAILS
              </Typography>
              <div style={{height:"2px", width:"80%",borderBottom:"1px solid black",position:"absolute",left:"20rem",top:"18rem"}}></div>
            </Box>
            <br/> <br/> <br/>
        </Grid>
   

     <Grid container spacing={2}>


        {/* <Grid container item xs={12} spacing={2}>
          <Grid item xs={3}>
            <Typography  style={{display:"flex",alignItems:"center",justifyContent:"center"}}variant="p" component="p">
             <div >
              STUDENT ID
             </div>
      
            </Typography>
          
          </Grid>

          <Grid item xs={7}>
            <TextField
            fullWidth
            placeholder="enter student's ID"
            variant="outlined"
            multiline
            maxRows={2}
            value= {studentId}
            onChange = {(e)=>{setStudentId(e.target.value)}}
            
            />
            
            
          </Grid>
        </Grid> */}



       
       <Grid container item xs={12} spacing={2}>
          <Grid item xs={3}>
            <Typography  style={{display:"flex",alignItems:"center",justifyContent:"center"}}variant="p" component="p">
             <div >
             EMAIL
             </div>
      
            </Typography>
          
          </Grid>

          <Grid item xs={7}>
            <TextField
            fullWidth
            placeholder=" enter student's email"
            variant="outlined"
            multiline
            maxRows={2}
            value= {email}
            onChange = {(e)=>{setEmail(e.target.value);
             
              
                setSubjectsForAddingTitle();
                setSubjectsForAddingId()
              
               }
             }
            
            />
            
            
          </Grid>
        </Grid>



        <br/><br/><br/><br/>
        <Grid container item xs={12} spacing={2} style={{ display: 'flex', justifyContent: 'center',gap:"1rem",paddingBottom:"2rem"}}>
       
       
       
        <Button  onClick={() => { fetchSubjectsToAdd()}} variant="contained" 
        style={{ backgroundColor: "#000000"/*"#F97D0B"*/, paddingTop: '10px',color:"white", paddingBottom: '10px', 
        paddingRight: '30px', paddingLeft: '30px'}}
           >
              {loading?"loading..." :"FETCH COURSES"}
             </Button>
       </Grid>
     


        <Grid container item xs={12} spacing={2}>
          <Grid item xs={3}>
            <Typography  style={{display:"flex",alignItems:"center",justifyContent:"center"}}variant="p" component="p">
             <div >
             COURSE
             </div>
      
            </Typography>
          
          </Grid>

          <Grid item xs={7}>
            
        
          <Select
          style={{backgroundColor:"#FFFFFF",borderRadius:"0.1rem",width:"100%"}}
         inputProps={{
          classes: {
              icon: classes.icon,
          },
      }}
        
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={"Select a Team"}
          label="icon"
          onChange={(event) => {
           const indexOfSeleceted =  subjectsForAddingTitle.indexOf(event.target.value)

           setCourse([...course,{id:subjectsForAdding[indexOfSeleceted].uid,
                                 price:subjectsForAdding[indexOfSeleceted].price,
                                 title:subjectsForAdding[indexOfSeleceted].title,
                             }])

          }}
        >
       
  {subjectsForAdding &&  subjectsForAddingTitle && subjectsForAddingTitle.length >0 ? subjectsForAddingTitle.map((kiwi,index)=>(
  <MenuItem style={{color:"black",width:"100%"}} value={kiwi}>{kiwi}</MenuItem>
)):
<MenuItem style={{color:"black"}}  value={null}>{"No courses listed, please click fetch courses!"}</MenuItem>
}
       
        </Select>
        
      
          </Grid>

          <Grid container item xs={12} spacing={2}>
          <Grid item xs={3}>
            <Typography  style={{display:"flex",alignItems:"center",justifyContent:"center"}}variant="p" component="p">
             <div >
             
             </div>
      
            </Typography>
          
          </Grid>


          <Grid item xs={7}>
        
          {course  && 
              <> &nbsp; 
                {course &&  course.map((item,index)=>(
             <Chip label={item.title} onClick={handleClick} onDelete={()=>{handleDelete1(item.id)}} />
             ))
            }

             </>
             }

          </Grid>
          </Grid>



        </Grid>

       


   
       





      
      </Grid>
      <br/><br/><br/><br/>
  <div style={{ display: 'flex', justifyContent: 'center',gap:"1rem" }}>
 
  <Button  onClick={() => {navigate(-1) }} variant="contained" 
  style={{ backgroundColor: "#000000"/*"#F97D0B"*/,color:"white", paddingTop: '10px', paddingBottom: '10px', 
  paddingRight: '30px', paddingLeft: '30px'}}
>
    CANCEL
  </Button>
 
  <Button  onClick={() => { updateCourses(user.uid,course,navigate)}} variant="contained" 
  style={{ backgroundColor: "#000000"/*"#F97D0B"*/,color:"white", paddingTop: '10px', paddingBottom: '10px', 
  paddingRight: '30px', paddingLeft: '30px'}}
>
   {loading?"loading..." :"SUBMIT"}
  </Button>
</div>
</Container>
    </>
  );
}

export default AddTeacher;