import { Container,Grid, TextField, Typography, TextareaAutosize, Button, Paper,Divider,Box} from '@mui/material';
import { useRef, useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UPLOADIMG from '../assets/images/upload.png';
import { fetchGroups, fetchMyGroups, uploadUserSettings,updateLesson} from 'src/redux/actions/group.action';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { useDispatch, useSelector } from 'react-redux';
import { notifyErrorFxn,notifySuccessFxn } from 'src/utils/toast-fxn';
import users from 'src/_mock/user';


function AddLesson() {
  const navigate = useNavigate();
  const [file, setFile] = useState();
  const [file2, setFile2] = useState();
  const [fileSize, setFileSize] = useState();
  const [fileSize2, setFileSize2] = useState();
  const [selectedFile, setSelectedFile] = useState({selectedFile: [], selectedFileName: []});
  const [selectedFile2, setSelectedFile2] = useState({selectedFile2: [], selectedFileName2: []});
  const dispatch = useDispatch();

  const [age, setAge] = useState('');

  const [newPassword,setNewPassword] =useState('')
  const [confirmPassword,setConfirmPassword] =useState('')
  const [companySize,setCompanySize] =useState('')
  const [loading,setLoading] = useState(false)

  const {lessonInfo} = useSelector((state) => state.group)
  const { user } = useSelector((state) => state.auth);
 
  

  /*const [releaseDate,setReleaseDate] =useState('')
  const [director,setDirector] =useState('')
  const [cast,setCast] =useState([])
  const [description,setDescription] =useState('')
  const [trivia,setTrivia] =useState('')*/

  const [title,setTitle] =useState(lessonInfo.title)
  const [body,setBody] =useState(lessonInfo.body)
  const [instructor,setInstructor] =useState([])
  const [section,setSection] =useState(lessonInfo.section)
  const [subLevel,setSubLevel] =useState(lessonInfo.uid)
  const [subject,setSubject] =useState(lessonInfo.subject)
  const [chapter,setChapter] =useState(lessonInfo.chapter)
  
  useEffect(()=>{

    console.log("INFO FOR THE SELECTED LESSON IS NOW",lessonInfo)
 
   },[])


  const updateObject ={
    chapter,
    section,
    title
  }


  const updateThisLesson= (uid,updateObject) => {
    setLoading(true)
    dispatch(updateLesson(uid,updateObject))

    setTimeout(()=>{setLoading(false)},1000)
   // setTimeout(()=>{},1000)
   
  }

  const groupData = {
    email:user.email,
    password:user.password,
    newPassword,
    companySize,
    uid:user.uid
  }


  const handleselectedFile = event => {
    console.log("these are the picture deets!",event.target.files[0])
    setSelectedFile({
        selectedFile: event.target.files[0],
        selectedFileName: event.target.files[0].name
    });
    
    setFile(URL.createObjectURL(event.target.files[0]));
    setFileSize(event.target.files[0].size)
};
 /* const handleselectedFile2 = event => {
    console.log("these are the video deets!",event.target.files[0])
    setSelectedFile2({
        selectedFile2: event.target.files[0],
        selectedFileName2: event.target.files[0].name
    });
    setFile2(URL.createObjectURL(event.target.files[0]));
    setFileSize2(event.target.files[0].size)
};*/



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

  return (
    <>
    <Container maxWidth="xl" sx={{posiiton:"relative"}}>

    <h1 style={{position:"relative",fontWeight:"bold",marginBottom:"40px",fontSize:"30px"}}>LESSONS</h1>

    <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'row',justifyContent:"space-between"}}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="h4" component="p">
              ADD LESSON
              </Typography>

            
            </Box>
           
          </Grid>
   
          <div style={{height:"2px", width:"90%",borderBottom:"1px solid black",position:"absolute",left:"4rem",top:"15rem"}}></div>
     <br/> <br/> <br/>

     <Grid container spacing={2}>
         <Grid container item xs={12} spacing={2}>
          <Grid item xs={3}>
            <Typography  style={{display:"flex",alignItems:"center",justifyContent:"center"}}variant="p" component="p">
             <div >
             CHAPTER
             </div>
      
            </Typography>
          
          </Grid>

          <Grid item xs={7}>
            <TextField
            fullWidth
            placeholder=" confirm password"
            variant="outlined"
            multiline
            maxRows={2}
            value= {chapter}
            onChange = {(e)=>{setChapter(e.target.value)}}
            
            />
            
            
          </Grid>
        </Grid>



       
       <Grid container item xs={12} spacing={2}>
          <Grid item xs={3}>
            <Typography  style={{display:"flex",alignItems:"center",justifyContent:"center"}}variant="p" component="p">
             <div >
             NUMBER
             </div>
      
            </Typography>
          
          </Grid>

          <Grid item xs={7}>
            <TextField
            fullWidth
            placeholder=" confirm password"
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
             COURSE
             </div>
      
            </Typography>
          
          </Grid>

          <Grid item xs={7}>
            <TextField
            fullWidth
            placeholder=" confirm password"
            variant="outlined"
            multiline
            maxRows={2}
            value= {section}
            onChange = {(e)=>{setSection(e.target.value)}}
            
            />
            
            
          </Grid>
        </Grid>


        <Grid container item xs={12} spacing={2}>
          <Grid item xs={3}>
            <Typography  style={{display:"flex",alignItems:"center",justifyContent:"center"}}variant="p" component="p">
             <div >
             LENGTH
             </div>
      
            </Typography>
          
          </Grid>

          <Grid item xs={7}>
            <TextField
            fullWidth
            placeholder=" confirm password"
            variant="outlined"
            multiline
            maxRows={2}
            value= {"cant update for now, no corresponding field in database"}
            onChange = {(e)=>{}}
            
            />
            
            
          </Grid>
        </Grid>

        

      
      </Grid>
      <br/><br/>
  <div style={{ display: 'flex', justifyContent: 'center' }}>
  <Button  onClick={() => { updateThisLesson(lessonInfo.uid,updateObject)}} variant="contained" 
  style={{ backgroundColor: "#000000"/*"#F97D0B"*/, paddingTop: '10px', paddingBottom: '10px', 
  paddingRight: '30px', paddingLeft: '30px'}}
>
    SUBMIT
  </Button>
</div>
</Container>





<Container maxWidth="xl" sx={{position:"relative"}}>

<div style={{height:"2px", width:"95%",borderBottom:"1px solid black",position:"absolute",left:"0rem",top:"7rem"}}></div>
     <br/> <br/> <br/>


<Grid item xs={12} sx={{ display: 'flex', flexDirection: 'row',justifyContent:"space-between", marginBottom:"3rem"}}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h4" component="p">
          EDIT LESSON
          </Typography>

        
        </Box>
       
      </Grid>

 

 <Grid container spacing={2}>
     <Grid container item xs={12} spacing={2}>
      <Grid item xs={3}>
        <Typography  style={{display:"flex",alignItems:"center",justifyContent:"center"}}variant="p" component="p">
         <div >
         CHAPTER
         </div>
  
        </Typography>
      
      </Grid>

      <Grid item xs={7}>
        <TextField
        fullWidth
        placeholder=" confirm password"
        variant="outlined"
        multiline
        maxRows={2}
        value= {chapter}
        onChange = {(e)=>{setChapter(e.target.value)}}
        
        />
        
        
      </Grid>
    </Grid>



   
   <Grid container item xs={12} spacing={2}>
      <Grid item xs={3}>
        <Typography  style={{display:"flex",alignItems:"center",justifyContent:"center"}}variant="p" component="p">
         <div >
         NUMBER
         </div>
  
        </Typography>
      
      </Grid>

      <Grid item xs={7}>
        <TextField
        fullWidth
        placeholder=" confirm password"
        variant="outlined"
        multiline
        maxRows={2}
        value= {"cant update for now, no corresponding field in database"}
        onChange = {(e)=>{}}
        
        />
        
        
      </Grid>
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
        <TextField
        fullWidth
        placeholder=" confirm password"
        variant="outlined"
        multiline
        maxRows={2}
        value= {"cant update for now, no corresponding field in database"}
        onChange = {(e)=>{}}
        
        />
        
        
      </Grid>
    </Grid>


    <Grid container item xs={12} spacing={2}>
      <Grid item xs={3}>
        <Typography  style={{display:"flex",alignItems:"center",justifyContent:"center"}}variant="p" component="p">
         <div >
         LENGTH
         </div>
  
        </Typography>
      
      </Grid>

      <Grid item xs={7}>
        <TextField
        fullWidth
        placeholder=" confirm password"
        variant="outlined"
        multiline
        maxRows={2}
        value= {"cant update for now, no corresponding field in database"}
        onChange = {(e)=>{}}
        
        />
        
        
      </Grid>
    </Grid>

    



   

  
  </Grid>
  <br/><br/><br/><br/>
<div style={{ display: 'flex', justifyContent: 'center' }}>
<Button  onClick={() => { updateThisLesson(lessonInfo.uid,updateObject)}} variant="contained" 
style={{ backgroundColor: "#000000"/*"#F97D0B"*/, paddingTop: '10px', paddingBottom: '10px', 
paddingRight: '30px', paddingLeft: '30px'}}
>
UPDATE
</Button>
</div>
</Container>


<Container maxWidth="xl" sx={{position:"relative",marginTop:"5rem"}}>

<Grid container item xs={12} spacing={2}>
      <Grid container item xs={6}>

      <Grid item xs={5} md={5} lg={5}>
      <br/>
      <Typography variant="p" component="p">
      ADD PDF
       </Typography>
      <Divider variant="fullWidth" sx={{backgroundColor:"#000000"}}  /> 
      <br/><br/>

      
      <Paper
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          height: 200,
          border: '1px solid grey'
        }}
      >
        <center>
        <Typography
            color="textPrimary"
            variant="h3"
            component="p"
          >
          <Button component="label" style={{backgroundColor: 'white' }}>
         <img src={UPLOADIMG} width='120px' />
         <input
            type="file"
            style={{ display: 'none' }}
            onChange={handleselectedFile}
            />
            </Button>
      </Typography>
      <Typography
            color="textPrimary"
            variant="p"
            component="p"
          >
        Browse for PDF
      </Typography>
      </center>
      </Paper>
      <p>{selectedFile?.selectedFileName}</p>
    </Grid>

    <Grid xs={6} style={{ display: 'flex',flexDirection:"column", justifyContent: 'center',alignItems:"center" }}>
      
           <Button  variant="contained" style={{ backgroundColor: "#000000", paddingTop: '10px', paddingBottom: '10px', paddingRight: '30px', paddingLeft: '30px'}} >
           SUBMIT
           </Button>
     
    </Grid>
  </Grid>

  <Grid container item xs={6}>

<Grid item xs={5} md={5} lg={5}>
<br/>

<Typography variant="p" component="p">
EDIT PDF
 </Typography>
<Divider variant="fullWidth"  sx={{backgroundColor:"#000000"}} /> 
<br/><br/>


<Paper
  sx={{
    p: 2,
    display: 'flex',
    flexDirection: 'column',
    height: 200,
    border: '1px solid grey'
  }}
>
  <center>
  <Typography
      color="textPrimary"
      variant="h3"
      component="p"
    >
    <Button component="label" style={{backgroundColor: 'white' }}>
   <img src={UPLOADIMG} width='120px' />
   <input
      type="file"
      style={{ display: 'none' }}
      onChange={handleselectedFile}
      />
      </Button>
</Typography>
<Typography
      color="textPrimary"
      variant="p"
      component="p"
    >
  Browse for PDF
</Typography>
</center>
</Paper>
<p>{selectedFile?.selectedFileName}</p>
</Grid>

<Grid xs={6} style={{ display: 'flex',flexDirection:"column", justifyContent: 'center',alignItems:"center" }}>

     <Button  variant="contained" style={{ backgroundColor: "#000000", paddingTop: '10px', paddingBottom: '10px', paddingRight: '30px', paddingLeft: '30px'}} >
     SUBMIT
     </Button>

</Grid>
</Grid>
  </Grid>
  
  
  
  <br/><br/><br/>
  <Divider variant="fullWidth"  sx={{backgroundColor:"#000000"}} /> 

</Container>


    </>
  );
}

export default AddLesson;