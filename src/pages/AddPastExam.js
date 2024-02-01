import { Container,Grid, TextField, Typography, TextareaAutosize, Button, Paper,Divider,Box} from '@mui/material';
import { useRef, useState} from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import UPLOADIMG from '../assets/images/upload.png';
import { addChapter,addPastExam} from 'src/redux/actions/group.action';

import { useDispatch, useSelector } from 'react-redux';
import { notifyErrorFxn } from 'src/utils/toast-fxn';
import users from 'src/_mock/user';

function AddPastExam() {
  const navigate = useNavigate();
  const location = useLocation()
  console.log("location state is",location.state)



 
  const dispatch = useDispatch();

  const [newPassword,setNewPassword] =useState('')
  const [confirmPassword,setConfirmPassword] =useState('')
  const [companySize,setCompanySize] =useState('')

  const [loading,setLoading] =useState(false)

  const [name,setName] = useState('')
  const [category,setCategory] = useState(location.state.category)
  const [body,setBody] = useState('')
  const [subject,setSubject] = useState(location.state.subject)
  const [mediaUrl,setMediaUrl] = useState('')
  

  const { user } = useSelector((state) => state.auth);

 
 


  const addObject ={
    name,
    mediaUrl,
    sectionId:location.state.sectionId,
    category:location.state.category,
    subject:location.state.subject
  }




  const addThisChapter = async(addObject) => {
   
    if(!name  ||!mediaUrl||!subject||!location.state.sectionId){
      notifyErrorFxn("Please make sure to fill in all fields.")
    }
    else{
   
    setLoading(true)
    dispatch(addPastExam(addObject))
   
    // console.log("identity is",identity)
    // console.log("update this subject is updating.........")
    setTimeout(()=>{setLoading(false)},1800)
    }
  }

console.log("whala")

  return (
    <>
    <Container maxWidth="xl">



    <div style={{display:"flex",justifyContent:"space-between",marginBottom:"6rem"}}>
       
      
       </div>



    <h1 style={{position:"relative",fontWeight:"bold",marginBottom:"40px",fontSize:"30px"}}>NEW PAST EXAM</h1>

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


<Divider style={{width:"100%",marginTop:"2rem",marginBottom:"2rem"}}/>
       
       <Grid container item xs={12} spacing={2}>
          <Grid item xs={3}>
            <Typography  style={{display:"flex",alignItems:"center",justifyContent:"center"}}variant="p" component="p">
             <div >
             EXAM NAME
             </div>
      
            </Typography>
          
          </Grid>

          <Grid item xs={7}>
            <TextField
            fullWidth
            placeholder=" e.g  2016 Past Exams."
            variant="outlined"
            multiline
            maxRows={2}
            value= {name}
            onChange = {(e)=>{setName(e.target.value)}}
            
            />
            
            
          </Grid>
        </Grid>


        <Grid container item xs={12} spacing={2}>
          <Grid item xs={3}>
            <Typography  style={{display:"flex",alignItems:"center",justifyContent:"center"}}variant="p" component="p">
             <div >
             MEDIA URL(S3)
             </div>
      
            </Typography>
          
          </Grid>

          <Grid item xs={7}>
            <TextField
            type="number"
            fullWidth
            placeholder="e.g https://amazons3.com/ ... "
            variant="outlined"
            multiline
            maxRows={2}
            value= {mediaUrl}
            onChange = {(e)=>{setMediaUrl(e.target.value)}}
            
            />
            
            
          </Grid>
        </Grid>

       {/* <Grid container item xs={12} spacing={2}>
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
  </Grid>*/}


       

      





      
      </Grid>
      <br/><br/><br/><br/>
  <div style={{ display: 'flex', justifyContent: 'center',gap:"1rem" }}>
 
  <Button  onClick={() => {navigate(-1) }} variant="contained" 
  style={{ backgroundColor: "#000000"/*"#F97D0B"*/, paddingTop: '10px', paddingBottom: '10px', 
  paddingRight: '30px', paddingLeft: '30px'}}
>
    CANCEL
  </Button>
 
  <Button  onClick={() => { addThisChapter(addObject)}} variant="contained" 
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

export default AddPastExam;