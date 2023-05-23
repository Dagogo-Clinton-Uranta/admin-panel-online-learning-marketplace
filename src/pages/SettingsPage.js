import { Container,Grid, TextField, Typography, TextareaAutosize, Button, Paper,Divider,Box} from '@mui/material';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UPLOADIMG from '../assets/images/upload.png';
import { fetchGroups, fetchMyGroups, uploadUserSettings} from 'src/redux/actions/group.action';

import { useDispatch, useSelector } from 'react-redux';
import { notifyErrorFxn } from 'src/utils/toast-fxn';
import users from 'src/_mock/user';

function SettingsPage() {
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

  return (
    <>
    <Container maxWidth="xl">

    <h1 style={{position:"relative",fontWeight:"bold",marginBottom:"40px",fontSize:"30px"}}>SETTINGS</h1>

    <Grid item xs={12} sx={{ display: 'flex' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant="h4" component="p">
              My Profile
              </Typography>
            </Box>
            <br/> <br/> <br/>
          </Grid>
   

     <Grid container spacing={2}>
         <Grid container item xs={12} spacing={2}>
          <Grid item xs={6}>
            <Typography variant="p" component="p">
            Update Password
            </Typography>
            <TextField
            fullWidth
            placeholder="password"
            variant="outlined"
            multiline
            maxRows={4}
            value= {newPassword}
            onChange = {(e)=>{setNewPassword(e.target.value)}}
            /><br/><br/><br/>
             <Divider variant="fullWidth"/>
            <br/><br/>
            <Typography variant="p" component="p">
            Company Size
            </Typography>
            <TextField
            fullWidth
            placeholder="Enter New Company Size"
            variant="outlined"
            multiline
            maxRows={4}
            value= {companySize}
            onChange = {(e)=>{setCompanySize(e.target.value)}}
            />
          </Grid>
          <Grid item xs={6}>
          <Typography variant="p" component="p">
            Confirm Password
            </Typography>
            <TextField
            fullWidth
            placeholder=" confirm password"
            variant="outlined"
            multiline
            maxRows={4}
            value= {confirmPassword}
            onChange = {(e)=>{setConfirmPassword(e.target.value)}}
            
            />
            
            <br/><br/><br/>

            <Divider  variant="fullWidth" />
          </Grid>
        </Grid>

       
        {/*<Grid container item xs={12} spacing={2}>
          <Grid item xs={6}>
            <Typography variant="p" component="p">
            Release Date
            </Typography>
            <TextField
            fullWidth
            placeholder="Enter Release Date"
            variant="outlined"
            type="date"
            multiline
            maxRows={4}
            value= {releaseDate}
            onChange = {(e)=>{setReleaseDate(e.target.value)}}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="p" component="p">
            Film Description (max 450 characters)
            </Typography>
             <TextField
             placeholder="Enter Desciption"
                multiline
                rows={4}
                style={{ width: '100%', padding: '8px'}}
                value= {description}
                onChange = {(e)=>{setDescription(e.target.value)}}
                />
          </Grid>
        </Grid>*/}
        {/*<Grid container item xs={12} spacing={2}>
          <Grid item xs={6}>
            <Typography variant="p" component="p">
            Director
            </Typography>
            <TextField
            fullWidth
            placeholder="Enter Director"
            variant="outlined"
            multiline
            maxRows={4}
            value= {director}
            onChange = {(e)=>{setDirector(e.target.value)}}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="p" component="p">
            Trivia Fact (max 160 characters)
            </Typography>
             <TextField
             placeholder="...."
                multiline
                rows={4}
                style={{ width: '100%', padding: '8px'}}
                value= {trivia}
                onChange = {(e)=>{setTrivia(e.target.value)}}
                />
          </Grid>
        </Grid>*/}
        {/* upload section */}
        
        <Grid container item xs={12} spacing={2}>
      <Grid item xs={12} md={8} lg={6}>
      <br/>
      <Divider variant="fullWidth"  /> 
      <br/><br/>

      <Typography variant="p" component="p">
      Company Logo 
       </Typography>
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
        Browse files to upload
      </Typography>
      </center>
      </Paper>
      <p>{selectedFile?.selectedFileName}</p>
    </Grid>
    <Grid item xs={12} md={8} lg={6}>
      <br/>
     <Divider variant="fullWidth" />
   {/*<Typography variant="p" component="p">
      Video (.mp4)
       </Typography>
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
            onChange={handleselectedFile2}
            />
            </Button>
      </Typography>
      <Typography
            color="textPrimary"
            variant="p"
            component="p"
          >
        Browse your movie to upload
      </Typography>
      </center>
      </Paper>
      <p>{selectedFile2?.selectedFileName2}</p>*/}
    </Grid>
        </Grid>
      </Grid>
      <br/><br/><br/><br/>
  <div style={{ display: 'flex', justifyContent: 'center' }}>
  <Button  onClick={() => { uploadMovie(groupData,selectedFile.selectedFile,navigate)}} variant="contained" 
  style={{ backgroundColor: "#000000"/*"#F97D0B"*/, paddingTop: '10px', paddingBottom: '10px', 
  paddingRight: '30px', paddingLeft: '30px'}}
>
    SAVE CHANGES
  </Button>
</div>
</Container>
    </>
  );
}

export default SettingsPage;