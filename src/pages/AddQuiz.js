import { Container,Grid, TextField, Typography, TextareaAutosize, Button, Paper,Divider,Box} from '@mui/material';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UPLOADIMG from '../assets/images/upload.png';
import { fetchGroups, fetchMyGroups, uploadUserSettings} from 'src/redux/actions/group.action';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { useDispatch, useSelector } from 'react-redux';
import { notifyErrorFxn } from 'src/utils/toast-fxn';
import users from 'src/_mock/user';


function AddQuiz() {
  const navigate = useNavigate();
  const [file, setFile] = useState();
  const [file2, setFile2] = useState();
  const [fileSize, setFileSize] = useState();
  const [fileSize2, setFileSize2] = useState();
  const [selectedFile, setSelectedFile] = useState({selectedFile: [], selectedFileName: []});
  const [selectedFile2, setSelectedFile2] = useState({selectedFile2: [], selectedFileName2: []});

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

  /*const [releaseDate,setReleaseDate] =useState('')
  const [director,setDirector] =useState('')
  const [cast,setCast] =useState([])
  const [description,setDescription] =useState('')
  const [trivia,setTrivia] =useState('')*/
  
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

<Container maxWidth="xl" sx={{posiiton:"relative"}}>

<h1 style={{position:"relative",fontWeight:"bold",marginBottom:"40px",fontSize:"30px"}}>ADD QUIZ</h1>


 <Grid container spacing={2}>
    
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
        placeholder=" confirm password"
        variant="outlined"
        multiline
        maxRows={2}
        value= {"CHEMIE TSE/TSM"}
        onChange = {(e)=>{setConfirmPassword(e.target.value)}}
        
        />
        
        
      </Grid>
    </Grid>


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
        placeholder=" confirm password"
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

</Container>


    <Container maxWidth="xl" sx={{posiiton:"relative"}}>

    

    <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'row',justifyContent:"space-between"}}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="h4" component="p">
              ADD CHAPTER
              </Typography>

            
            </Box>
           
          </Grid>
   
          <div style={{height:"2px", width:"90%",borderBottom:"1px solid black",position:"absolute",left:"4rem",top:"26rem"}}></div>
     <br/> <br/> <br/>

     <Grid container spacing={2}>
         <Grid container item xs={12} spacing={2}>
          <Grid item xs={3}>
            <Typography  style={{display:"flex",alignItems:"center",justifyContent:"center"}}variant="p" component="p">
             <div >
             CHAPTER NAME
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
            value= {"6E ANNEE"}
            onChange = {(e)=>{setConfirmPassword(e.target.value)}}
            
            />
            
            
          </Grid>
        </Grid>



       
       <Grid container item xs={12} spacing={2}>
          <Grid item xs={3}>
            <Typography  style={{display:"flex",alignItems:"center",justifyContent:"center"}}variant="p" component="p">
             <div >
             PDF URL
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
            value= {"CHEMIE TSE/TSM"}
            onChange = {(e)=>{setConfirmPassword(e.target.value)}}
            
            />
            
            
          </Grid>
        </Grid>
 
      </Grid>
     <br/>

</Container>





<Container maxWidth="xl" sx={{position:"relative"}}>

<div style={{height:"2px", width:"95%",borderBottom:"1px solid black",position:"absolute",left:"0rem",top:"7rem"}}></div>
     <br/> <br/> <br/>


<Grid item xs={12} sx={{ display: 'flex', flexDirection: 'row',justifyContent:"space-between", marginBottom:"3rem"}}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h4" component="p">
          ADD QUIZ
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
        placeholder=" confirm password"
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
        placeholder=" confirm password"
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
        placeholder=" confirm password"
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
<Button  onClick={() => { uploadMovie(groupData,selectedFile.selectedFile,navigate)}} variant="contained" 
style={{ backgroundColor: "#000000"/*"#F97D0B"*/, paddingTop: '10px', paddingBottom: '10px', 
paddingRight: '30px', paddingLeft: '30px'}}
>
ADD
</Button>
</div>
</Container>

<br/><br/><br/><br/>
<div style={{ display: 'flex', justifyContent: 'center' }}>
<Button  onClick={() => { uploadMovie(groupData,selectedFile.selectedFile,navigate)}} variant="contained" 
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