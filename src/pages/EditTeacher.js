import { Container,Grid, TextField, Typography, TextareaAutosize, Button, Paper,Divider,Box} from '@mui/material';
import { useRef, useState,useEffect } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import UPLOADIMG from '../assets/images/upload.png';
import { uploadUserSettings,updateSubject,updateSubjectNow,updateChapter} from 'src/redux/actions/group.action';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { useDispatch, useSelector } from 'react-redux';
import { notifyErrorFxn, notifySuccessFxn } from 'src/utils/toast-fxn';
import users from 'src/_mock/user';

import { updateTeacher} from 'src/redux/actions/group.action';

function EditTeacher() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  let { uid } = location.state;
  console.log(",uid is....",uid)
  
  
  const {teacherInfo} = useSelector((state) => state.group)
  const { user } = useSelector((state) => state.auth);
  //console.log("user details are:",user)


  const [loading,setLoading] = useState(false)
  const [level,setLevel] = useState(teacherInfo && teacherInfo.level)
  const [body,setBody] = useState(teacherInfo && teacherInfo.body)
  const [firstName,setFirstName] =useState(teacherInfo && teacherInfo.firstName)
  const [lastName,setLastName] =useState(teacherInfo && teacherInfo.lastName)
  const [imageUrl,setImageUrl] =useState(teacherInfo && teacherInfo.imageUrl)


  


  useEffect(()=>{

    console.log("INFO FOR THE SELECTED TEACHER IS",teacherInfo)
 
   },[])

  const updateObject ={
    firstName,
    lastName,
    body,
    level:level,
    imageUrl
  }

  const updateThisSubject = async(identity,updateObject,navigate) => {
    setLoading(true)
    dispatch(updateTeacher(identity,updateObject,navigate))
   
    // console.log("identity is",identity)
    // console.log("update this subject is updating.........")
    setTimeout(()=>{setLoading(false)},2100)
    
  }







  return (
    <>
    <Container maxWidth="xl">

    <div style={{display:"flex",justifyContent:"space-between",marginBottom:"6rem"}}>
       


       </div>

    <h1 style={{position:"relative",fontWeight:"bold",marginBottom:"40px",fontSize:"30px"}}>TEACHER - {firstName + " " + lastName}</h1>

    <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'row',justifyContent:"space-between"}}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="h4" component="p">
              EDIT TEACHER
              </Typography>

            
            </Box>


          {/* <div style={{ display: 'flex', justifyContent: 'center', gap:'1rem'}}>
        
            <Button   variant="contained" 
          style={{ backgroundColor: "#000000", paddingTop: '10px', paddingBottom: '10px', 
          paddingRight: '30px', paddingLeft: '30px'}}   onClick={() => {  navigate('/dashboard/add-chapter')}}
          >
           ADD CHAPTER
         </Button>
        
        
          <Button   variant="contained" 
          style={{ backgroundColor: "#000000", paddingTop: '10px', paddingBottom: '10px', 
  paddingRight: '30px', paddingLeft: '30px'}}   onClick={() => {  navigate('/dashboard/add-lesson')}}
          >
           ADD LESSON
         </Button>
     
     
  </div>*/}
           
          </Grid>
   
     <div style={{height:"2px", width:"80%",borderBottom:"1px solid black",position:"absolute",left:"20rem",top:"18rem"}}></div>
     <br/> <br/> <br/>

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
            placeholder=" 6eme Annee, 10eme Annee, etc."
            variant="outlined"
            multiline
            maxRows={2}
            value= {level}
            onChange = {(e)=>{setLevel(e.target.value)}}
            
            />
            
            
          </Grid>
        </Grid>



       
        <Grid container item xs={12} spacing={2}>
          <Grid item xs={3}>
            <Typography  style={{display:"flex",alignItems:"center",justifyContent:"center"}}variant="p" component="p">
             <div >
             FIRST NAME
             </div>
      
            </Typography>
          
          </Grid>

          <Grid item xs={7}>
            <TextField
            fullWidth
            placeholder=" enter first name."
            variant="outlined"
            multiline
            maxRows={2}
            value= {firstName}
            onChange = {(e)=>{setFirstName(e.target.value)}}
            
            />
            
            
          </Grid>
        </Grid>

        <Grid container item xs={12} spacing={2}>
          <Grid item xs={3}>
            <Typography  style={{display:"flex",alignItems:"center",justifyContent:"center"}}variant="p" component="p">
             <div >
             LAST NAME
             </div>
      
            </Typography>
          
          </Grid>

          <Grid item xs={7}>
            <TextField
            fullWidth
            placeholder=" enter last name."
            variant="outlined"
            multiline
            maxRows={2}
            value= {lastName}
            onChange = {(e)=>{setLastName(e.target.value)}}
            
            />
          </Grid>
        </Grid>



        <Grid container item xs={12} spacing={2}>
          <Grid item xs={3}>
            <Typography  style={{display:"flex",alignItems:"center",justifyContent:"center"}}variant="p" component="p">
             <div >
             ABOUT
             </div>
      
            </Typography>
          
          </Grid>

          <Grid item xs={7}>
            <TextField
            fullWidth
            placeholder=" years of experience, motivation for teaching etc"
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
             IMAGE URL
             </div>
      
            </Typography>
          
          </Grid>

          <Grid item xs={7}>
            <TextField
            fullWidth
            placeholder=" e.g www.amazons3/image.jpg"
            variant="outlined"
            multiline
            maxRows={2}
            value= {imageUrl}
            onChange = {(e)=>{setImageUrl(e.target.value)}}
            
            />
          </Grid>
        </Grid>
        {/* upload section */}
        


      
      </Grid>
      <br/><br/><br/><br/>
  <div style={{ display: 'flex', justifyContent: 'center' , gap:"1rem" }}>
  <Button  onClick={() => {navigate(-1) }} variant="contained" 
  style={{ backgroundColor: "#000000"/*"#F97D0B"*/, paddingTop: '10px', paddingBottom: '10px', 
  paddingRight: '30px', paddingLeft: '30px'}}
>
    CANCEL
  </Button>
  
  
  
  
  <Button  onClick={() => {updateThisSubject(uid,updateObject,navigate)}} variant="contained"  disabled={loading}
  style={{ backgroundColor: "#000000"/*"#F97D0B"*/, paddingTop: '10px', paddingBottom: '10px', 
  paddingRight: '30px', paddingLeft: '30px'}}
>
   {loading?"Loading...": "SUBMIT"}
  </Button>
</div>
</Container>
    </>
  );
}

export default EditTeacher;