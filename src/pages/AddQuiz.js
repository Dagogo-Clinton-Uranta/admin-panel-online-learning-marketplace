import { Container,Grid, TextField, Typography, TextareaAutosize, Button, Paper,Divider,Box} from '@mui/material';
import { useRef, useState } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import UPLOADIMG from '../assets/images/upload.png';
import { fetchGroups, fetchMyGroups, uploadUserSettings} from 'src/redux/actions/group.action';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { useDispatch, useSelector } from 'react-redux';
import { notifyErrorFxn } from 'src/utils/toast-fxn';
import users from 'src/_mock/user';

import { addLesson} from 'src/redux/actions/group.action';


function AddQuiz() {
  const navigate = useNavigate();
  const location = useLocation();
  const [file, setFile] = useState();

  const [fileSize, setFileSize] = useState();


  const [optionFill,setOptionFill] = useState('');

  const [optionA, setOptionA] = useState(null);
  const [optionB, setOptionB] = useState(null);
  const [optionC, setOptionC] = useState(null);
  const [optionD, setOptionD] = useState(null);

  const dispatch = useDispatch();

  const [age, setAge] = useState('');

  const [newPassword,setNewPassword] =useState('')
  const [confirmPassword,setConfirmPassword] =useState('')
  const [companySize,setCompanySize] =useState('')

  const { user } = useSelector((state) => state.auth);
  console.log("user details are:",user)




  const [loading,setLoading] =useState(false)

  const [title,setTitle] = useState('')
  const [category,setCategory] = useState(location.state.category)
  const [body,setBody] = useState('')
  const [subject,setSubject] = useState(location.state.subject)
  const [lessonUrl,setLessonUrl] = useState('')
  const [lessonNumber,setLessonNumber] = useState('')
  const [duration,setDuration] = useState('')
  



 


  const addObject ={
    title,
    body,
    chapterId:location.state.chapterId,
    category:location.state.category,
    subject:location.state.subject,
    duration:duration,
    lessonUrl:lessonUrl,
    lessonNumber:lessonNumber
  }




  const addThisLesson = async(addObject) => {
  
  if(!title || !body ||!category || !lessonUrl||!subject ||!duration ||!location.state.chapterId||!lessonNumber){
    notifyErrorFxn("Please make sure to fill in all fields.")
  }
  else{
    setLoading(true)
    dispatch(addLesson(addObject))
   
    // console.log("identity is",identity)
    // console.log("update this subject is updating.........")
    setTimeout(()=>{setLoading(false)},1800)
   }
  }




const uploadMovie = (movieData = 0,image = 0,) => {
if(!companySize.length && !newPassword.length &&  file === undefined ){
  console.log("THE EMPTY FIELDS ARE:",file)
  notifyErrorFxn("Please fill in the field(s) you want to update!")
}else{
 if( fileSize  > 300000){
  notifyErrorFxn("Image size too large! please upload a smaller picture.")
 }
 /*else if( fileSize2  > 20000000){
  notifyErrorFxn("Video size too large! please upload a smaller video.")
 }*/else{
  dispatch(uploadUserSettings(movieData,image))
 }
}
}


const addOption =(option) => {



  if(!optionA){
  setOptionA(option) 
  setOptionFill('')
  return
 }
 else if(optionA && !optionB){
  setOptionB(option) 
  setOptionFill('')
  return
 }
 else if(optionA && optionB && !optionC){
  setOptionC(option) 
  setOptionFill('')
  return
 }
 else if(optionA && optionB && optionC && !optionD){
  setOptionD(option) 
  setOptionFill('')
  return
 }

 setOptionFill(null)

}

  return (
    <>

<Container maxWidth="xl">



    <div style={{display:"flex",justifyContent:"space-between",marginBottom:"6rem"}}>
       
      
       </div>



    <h1 style={{position:"relative",fontWeight:"bold",marginBottom:"40px",fontSize:"30px"}}>NEW QUIZ</h1>

    <Grid item xs={12} sx={{ display: 'flex' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant="h4" component="p">
              ADD DETAILS BELOW
              </Typography>
              <div style={{height:"2px", width:"80%",borderBottom:"1px solid black",position:"absolute",left:"20rem",top:"18rem"}}></div>
            </Box>
            <br/> <br/> <br/>
        </Grid>
   

     <Grid container spacing={2}>

    
     <Grid container item xs={12} spacing={2}>
          <Grid item xs={3}>
            <Typography  style={{display:"flex",alignItems:"center",justifyContent:"center"}}variant="p" component="p">
             <div >
             SUBJECT
             </div>
      
            </Typography>
          
          </Grid>

          <Grid item xs={7}>
            <TextField
            fullWidth
            placeholder=" Mathematique,Francais, etc."
            variant="outlined"
            multiline
            maxRows={2}
            value= {subject}
           
            
            />
            
            
          </Grid>
        </Grid>





         <Grid container item xs={12} spacing={2}>
          <Grid item xs={3}>
            <Typography  style={{display:"flex",alignItems:"center",justifyContent:"center"}}variant="p" component="p">
             <div >
             LEVEL
             </div>
      
            </Typography>
          
          </Grid>

          <Grid item xs={7}>
            <TextField
            fullWidth
            placeholder=" 6eme Annee, 10eme Annee, etc."
            variant="outlined"
            multiline
            maxRows={2}
            value= {category}
            
            
            />
            
            
          </Grid>
        </Grid>



       
       <Grid container item xs={12} spacing={2}>
          <Grid item xs={3}>
            <Typography  style={{display:"flex",alignItems:"center",justifyContent:"center"}}variant="p" component="p">
             <div >
             TITLE
             </div>
      
            </Typography>
          
          </Grid>

          <Grid item xs={7}>
            <TextField
            fullWidth
            placeholder=" e.g  Dissociation."
            variant="outlined"
            multiline
            maxRows={2}
            value= {title}
            onChange = {(e)=>{setTitle(e.target.value)}}
            />
            
            
          </Grid>
        </Grid>



        <Grid container item xs={12} spacing={2}>
          <Grid item xs={3}>
            <Typography  style={{display:"flex",alignItems:"center",justifyContent:"center"}}variant="p" component="p">
             <div >
             LESSON(QUIZ) NUMBER
             </div>
      
            </Typography>
          
          </Grid>

          <Grid item xs={7}>
            <TextField
            type="number"
            fullWidth
            placeholder="follow the order of the lessons previously added"
            variant="outlined"
            multiline
            maxRows={2}
            value= {lessonNumber}
            onChange = {(e)=>{setLessonNumber(e.target.value)}}
            
            />
            
            
          </Grid>
        </Grid>



        <Grid container item xs={12} spacing={2}>
          <Grid item xs={3}>
            <Typography  style={{display:"flex",alignItems:"center",justifyContent:"center"}}variant="p" component="p">
             <div >
             DESCRIPTION
             </div>
      
            </Typography>
          
          </Grid>

          <Grid item xs={7}>
            <TextField
            fullWidth
            placeholder=" enter description"
            variant="outlined"
            multiline
            rows={8}
            value= {body}
            onChange = {(e)=>{setBody(e.target.value)}}
            
            />
            
            
          </Grid>
        </Grid>



        <Grid container item xs={12} spacing={2}>
          <Grid item xs={3}>
            <Typography  style={{display:"flex",alignItems:"center",justifyContent:"center"}}variant="p" component="p">
             <div >
             DURATION
             </div>
      
            </Typography>
          
          </Grid>

          <Grid item xs={7}>
            <TextField
            fullWidth
            placeholder="e.g 08:55"
            variant="outlined"
            multiline
            
            value= {duration}
            onChange = {(e)=>{setDuration(e.target.value)}}
            
            />
            
            
          </Grid>
        </Grid>


        <Grid container item xs={12} spacing={2}>
          <Grid item xs={3}>
            <Typography  style={{display:"flex",alignItems:"center",justifyContent:"center"}}variant="p" component="p">
             <div >
             LESSON FILE URL
             </div>
      
            </Typography>
          
          </Grid>

          <Grid item xs={7}>
            <TextField
            fullWidth
            placeholder="e,g www.amazons3.com/video.mp4 "
            variant="outlined"
            multiline
            value= {lessonUrl}
            onChange = {(e)=>{setLessonUrl(e.target.value)}}
            
            />
            
            
          </Grid>
        </Grid>

      





      
      </Grid>
      <br/><br/><br/><br/>
  <div style={{ display: 'flex', justifyContent: 'center',gap:"1rem" }}>
 
  <Button  onClick={() => {navigate(-1) }} variant="contained" 
  style={{ backgroundColor: "#000000"/*"#F97D0B"*/, paddingTop: '10px', paddingBottom: '10px', 
  paddingRight: '30px', paddingLeft: '30px'}}
>
    CANCEL
  </Button>
 
  <Button  onClick={() => { addThisLesson(addObject)}} variant="contained" 
  style={{ backgroundColor: "#000000"/*"#F97D0B"*/, paddingTop: '10px', paddingBottom: '10px', 
  paddingRight: '30px', paddingLeft: '30px'}}
>
    {loading?"loading...":"SUBMIT"}
  </Button>
</div>
</Container>





<Container maxWidth="xl" sx={{position:"relative"}}>

<div style={{height:"2px", width:"95%",borderBottom:"1px solid black",position:"absolute",left:"0rem",top:"7rem"}}></div>
     <br/> <br/> <br/>


<Grid item xs={12} sx={{ display: 'flex', flexDirection: 'row',justifyContent:"space-between", marginBottom:"3rem"}}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h4" component="p">
          ADD QUESTION
          </Typography>

        
        </Box>
       
      </Grid>

 

 <Grid container spacing={2}>
     <Grid container item xs={12} spacing={2}>
      <Grid item xs={3}>
        <Typography  style={{display:"flex",alignItems:"center",justifyContent:"center"}}variant="p" component="p">
         <div >
        QUESTION
         </div>
  
        </Typography>
      
      </Grid>

      <Grid item xs={7}>
        <TextField
        fullWidth
        placeholder=" enter question"
        variant="outlined"
        multiline
        maxRows={2}
        value= {"6E ANNEE"}
        onChange = {(e)=>{setConfirmPassword(e.target.value)}}
        
        />
        
        
      </Grid>
    </Grid>



   
   <Grid container item xs={12} spacing={2}>
      <Grid item xs={3}>
        <Typography  style={{display:"flex",alignItems:"center",justifyContent:"center"}}variant="p" component="p">
         <div >
        ANSWER OPTIONS
         </div>
  
        </Typography>
      
      </Grid>

      <Grid item xs={7} sx={{display:"flex",justifyContent:"center",gap:"20px"}} >
        <TextField
        sx={{width:"90%"}}
        placeholder=" enter answer"
        variant="outlined"
        multiline
        maxRows={2}
        value= {optionFill}
        onChange = {(e)=>{setOptionFill(e.target.value)}}
        
        />

<div style={{ display: 'flex', justifyContent: 'center' }}>
<Button  onClick={() => { addOption(optionFill)}} variant="contained" 
style={{ backgroundColor: "#000000"/*"#F97D0B"*/, paddingTop: '10px', paddingBottom: '10px', 
paddingRight: '30px', paddingLeft: '30px'}}
>
ADD
</Button>
</div>
        
        
      </Grid>
    </Grid>


    <Grid container item xs={12} sx={{paddingTop:"4rem"}} spacing={2}>
      <Grid item xs={3}>
        <Typography  style={{display:"flex",alignItems:"center",justifyContent:"center"}}variant="p" component="p">
         <div >
        ANSWERS ADDED
         </div>
  
        </Typography>
      
      </Grid>

      <Grid item xs={7} sx={{display:"flex",  flexDirection:"column",justifyContent:"flex-start",gap:"20px"}} >
       <p>A.){" "}{optionA && optionA}</p>
       <p>B.){" "}{optionB && optionB}</p>
       <p>C.){" "}{optionC && optionC}</p>
       <p>D.){" "}{optionD && optionD}</p> 
        
      </Grid>
    </Grid>



    <Grid container item xs={12} spacing={2}>
      <Grid item xs={3}>
        <Typography  style={{display:"flex",alignItems:"center",justifyContent:"center"}}variant="p" component="p">
         <div >
         CORRECT ANSWER
         </div>
  
        </Typography>
      
      </Grid>

      <Grid item xs={7}>
        <TextField
        fullWidth
        placeholder=" enter answer"
        variant="outlined"
        multiline
        maxRows={2}
        value= {"CHEMIE TSE/TSM"}
        onChange = {(e)=>{setConfirmPassword(e.target.value)}}
        
        />
        
        
      </Grid>
    </Grid>


   

  

  
  </Grid>
  <br/><br/>
<div style={{ display: 'flex', justifyContent: 'center' }}>
<Button   variant="contained" 
style={{ backgroundColor: "#000000"/*"#F97D0B"*/, paddingTop: '10px', paddingBottom: '10px', 
paddingRight: '30px', paddingLeft: '30px'}}
>
ADD
</Button>
</div>
</Container>

<br/><br/><br/><br/>
<div style={{ display: 'flex', justifyContent: 'center',gap:"1rem" }}>

<Button  onClick={() => { navigate(-1)}} variant="contained" 
style={{ backgroundColor: "#000000"/*"#F97D0B"*/, paddingTop: '10px', paddingBottom: '10px', 
paddingRight: '30px', paddingLeft: '30px'}}
>
CANCEL
</Button>


<Button variant="contained" 
style={{ backgroundColor: "#000000"/*"#F97D0B"*/, paddingTop: '10px', paddingBottom: '10px', 
paddingRight: '30px', paddingLeft: '30px'}}
>
SUBMIT
</Button>
</div>
    </>
  );
}

export default AddQuiz;