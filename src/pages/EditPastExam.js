import { Container,Grid, TextField, Typography, TextareaAutosize, Button, Paper,Divider,Box} from '@mui/material';
import { useRef, useState,useEffect} from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import UPLOADIMG from '../assets/images/upload.png';
import { addLesson,updateLesson, updatePastExam} from 'src/redux/actions/group.action';

import { useDispatch, useSelector } from 'react-redux';
import { notifyErrorFxn } from 'src/utils/toast-fxn';
import users from 'src/_mock/user';

function EditPastExam() {
  const navigate = useNavigate();
  const location = useLocation()
 
 
  const dispatch = useDispatch();

  const [newPassword,setNewPassword] =useState('')
  const [confirmPassword,setConfirmPassword] =useState('')
  const [companySize,setCompanySize] =useState('')

  const [loading,setLoading] =useState(false)

  const {pastExamInfo} = useSelector((state) => state.group)
  const { user } = useSelector((state) => state.auth);
 
  

  const [title,setTitle] =useState(pastExamInfo && pastExamInfo.examName ?pastExamInfo.examName:" ")
  const [body,setBody] =useState(pastExamInfo && pastExamInfo.body ?pastExamInfo.body:" ")
  

  const [subject,setsubject] =useState(pastExamInfo && pastExamInfo.subject ?pastExamInfo.subject:" ")
 

  const [category,setCategory] = useState(pastExamInfo && pastExamInfo.category ?pastExamInfo.category:" ")
  const [examUrl,setexamUrl] = useState(pastExamInfo && pastExamInfo.examUrl ?pastExamInfo.examUrl:" ")
  const [duration,setDuration] = useState(pastExamInfo && pastExamInfo.duration ?pastExamInfo.duration:" ")

  
  
  useEffect(()=>{

    console.log("INFO FOR THE SELECTED LESSON IS ACTUALLY",pastExamInfo)
 
   },[])


  const updateObject ={
    examName:title,
   
    sectionId:pastExamInfo && pastExamInfo.sectionId,
    category:pastExamInfo && pastExamInfo.category,
    subject:pastExamInfo && pastExamInfo.subject,
    
    examUrl:examUrl,
    
  }


  const updateThisLesson= (uid,updateObject) => {
    setLoading(true)
    dispatch(updatePastExam(uid,updateObject))

    setTimeout(()=>{setLoading(false)},1000)
   // setTimeout(()=>{},1000)
   
  }





 


  return (
    <>
    <Container maxWidth="xl">



    <div style={{display:"flex",justifyContent:"space-between",marginBottom:"6rem"}}>
       
      
       </div>



    <h1 style={{position:"relative",fontWeight:"bold",marginBottom:"40px",fontSize:"30px"}}>EDIT LESSON</h1>

    <Grid item xs={12} sx={{ display: 'flex' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant="h4" component="p">
              EDIT DETAILS BELOW
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
           disabled={true}
            
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
            disabled={true}
            
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
             EXAM  URL
             </div>
      
            </Typography>
          
          </Grid>

          <Grid item xs={7}>
            <TextField
            fullWidth
            placeholder="e,g www.amazons3.com/video.mp4 "
            variant="outlined"
            multiline
            value= {examUrl}
            onChange = {(e)=>{setexamUrl(e.target.value)}}
            
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
 
  <Button  onClick={() => { updateThisLesson(pastExamInfo.uid,updateObject)}} variant="contained" 
  style={{ backgroundColor: "#000000"/*"#F97D0B"*/, paddingTop: '10px', paddingBottom: '10px', 
  paddingRight: '30px', paddingLeft: '30px'}}
>
    {loading?"loading...":"SUBMIT"}
  </Button>
</div>
</Container>
    </>
  );
}

export default EditPastExam;