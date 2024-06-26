import { Container,Grid, TextField, Typography, TextareaAutosize, Button, Paper,Divider,Box} from '@mui/material';
import { useRef, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import UPLOADIMG from '../assets/images/upload.png';
import { fetchGroups, fetchMyGroups, uploadUserSettings} from 'src/redux/actions/group.action';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { useDispatch, useSelector } from 'react-redux';
import { notifyErrorFxn } from 'src/utils/toast-fxn';
import users from 'src/_mock/user';

function AddCourse() {
  const navigate = useNavigate();
  const [file, setFile] = useState();
  const [file2, setFile2] = useState();
  const [fileSize, setFileSize] = useState();
  const [fileSize2, setFileSize2] = useState();
  const [selectedFile, setSelectedFile] = useState({selectedFile: [], selectedFileName: []});
  const [selectedFile2, setSelectedFile2] = useState({selectedFile2: [], selectedFileName2: []});
  const dispatch = useDispatch();

  const [newPassword,setNewPassword] =useState('')
  const [confirmPassword,setConfirmPassword] =useState('')
  const [companySize,setCompanySize] =useState('')

  const [loading,setLoading] = useState(false)

  const [instructor,setInstructor] = useState(false)

  const { user } = useSelector((state) => state.auth);

  console.log("user details are:",user)


  const groupData = {
    email:user.email,
    password:user.password,
    newPassword,
    companySize,
    uid:user.uid
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

  return (
    <>
    <Container maxWidth="xl">



    <div style={{display:"flex",justifyContent:"space-between",marginBottom:"6rem"}}>
       
      

       </div>



    <h1 style={{position:"relative",fontWeight:"bold",marginBottom:"40px",fontSize:"30px"}}>NEW BLOG</h1>

    <Grid item xs={12} sx={{ display: 'flex' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant="h4" component="p">
              ADD BLOG
              </Typography>
              <div style={{height:"2px", width:"80%",borderBottom:"1px solid black",position:"absolute",left:"20rem",top:"18rem"}}></div>
            </Box>
            <br/> <br/> <br/>
        </Grid>
   

     <Grid container spacing={2}>


       {/*  <Grid container item xs={12} spacing={2}>
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
            placeholder=" enter level"
            variant="outlined"
            multiline
            maxRows={2}
            value= {confirmPassword}
            onChange = {(e)=>{setConfirmPassword(e.target.value)}}
            
            />
            
            
          </Grid>
         </Grid>*/}



       
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
            placeholder=" enter title"
            variant="outlined"
            multiline
            maxRows={2}
            value= {confirmPassword}
            onChange = {(e)=>{setConfirmPassword(e.target.value)}}
            
            />
            
            
          </Grid>
        </Grid>

        <Grid container item xs={12} spacing={2}>
          <Grid item xs={3}>
            <Typography  style={{display:"flex",alignItems:"center",justifyContent:"center"}}variant="p" component="p">
             <div >
             DETAILS
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
            value= {confirmPassword}
            onChange = {(e)=>{setConfirmPassword(e.target.value)}}
            
            />
            
            
          </Grid>
        </Grid>



       {/* <Grid container item xs={12} spacing={2}>
          <Grid item xs={3}>
            <Typography  style={{display:"flex",alignItems:"center",justifyContent:"center"}}variant="p" component="p">
             <div >
             OVERVIEW
             </div>
      
            </Typography>
          
          </Grid>

          <Grid item xs={7}>
            <TextField
            fullWidth
            placeholder=" enter overview"
            variant="outlined"
            multiline
            Rows={8}
            value= {confirmPassword}
            onChange = {(e)=>{setConfirmPassword(e.target.value)}}
            
            />
            
            
          </Grid>
        </Grid> */}


        {/*<Grid container item xs={12} spacing={2}>
          <Grid item xs={3}>
            <Typography  style={{display:"flex",alignItems:"center",justifyContent:"center"}}variant="p" component="p">
             <div >
             INSTRUCTOR
             </div>
      
            </Typography>
          
          </Grid>

          <Grid item xs={7}>
          
         <Select
         style={{width:"100%"}}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={instructor}
          label="Instructor"
          onChange={(event) => {
            setInstructor(event.target.value);
          }}
        >
          <MenuItem value={'Sidiki Keita - Socrate'}>Sidiki Keita - Socrate</MenuItem>
          <MenuItem value={'Alpha Amadou Diallo'}></MenuItem>
          <MenuItem value={'Souleymane Koulibaly'}>Souleymane Koulibaly</MenuItem>
          <MenuItem value={'Younoussa Camara'}>Younoussa Camara</MenuItem>
          <MenuItem value={'Marc Aurel Touré'}>Marc Aurel Touré</MenuItem>
        </Select>
            
            
          </Grid>
        </Grid>*/}



        <Grid container item xs={12} spacing={2}>
          <Grid item xs={3}>
            <Typography  style={{display:"flex",alignItems:"center",justifyContent:"center"}}variant="p" component="p">
             <div >
             TEACHER
             </div>
      
            </Typography>
          
          </Grid>

          <Grid item xs={7}>
            <TextField
            fullWidth
            placeholder=""
            variant="outlined"
            multiline
            maxRows={2}
            value= {confirmPassword}
            onChange = {(e)=>{setConfirmPassword(e.target.value)}}
            
            />
            
            
          </Grid>
        </Grid>




      {/*  <Grid container item xs={12} spacing={2}>
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
            placeholder=" the URL of the image (from S3)"
            variant="outlined"
            multiline
            maxRows={2}
            value= {confirmPassword}
            onChange = {(e)=>{setConfirmPassword(e.target.value)}}
            
            />
            
            
          </Grid>
        </Grid> */}
     


      
      </Grid>
      <br/><br/><br/><br/>
  <div style={{ display: 'flex', justifyContent: 'center',gap:"1rem" }}>
   
  <Button  onClick={() => {navigate(-1) }} variant="contained" 
  style={{ backgroundColor: "#000000"/*"#F97D0B"*/, paddingTop: '10px', paddingBottom: '10px', 
  paddingRight: '30px', paddingLeft: '30px'}}
>
    CANCEL
  </Button>
 
 
  <Button disabled={true} onClick={() => { uploadMovie(groupData,selectedFile.selectedFile,navigate)}} variant="contained" 
  style={{ backgroundColor: "#000000"/*"#F97D0B"*/, paddingTop: '10px', paddingBottom: '10px', 
  paddingRight: '30px', paddingLeft: '30px'}}
>
    SUBMIT
  </Button>
</div>
</Container>
    </>
  );
}

export default AddCourse;