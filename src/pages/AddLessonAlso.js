import { Container,Grid, TextField, Typography, TextareaAutosize, Button, Paper,Divider,Box} from '@mui/material';
import { useRef, useState} from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import UPLOADIMG from '../assets/images/upload.png';
import { addLesson} from 'src/redux/actions/group.action';

import { useDispatch, useSelector } from 'react-redux';
import { notifyErrorFxn } from 'src/utils/toast-fxn';
import users from 'src/_mock/user';

function AddLesson() {
  const navigate = useNavigate();
  const location = useLocation()
  console.log("location state is",location.state)



 
  const dispatch = useDispatch();


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



  return (
    <>
    <Container maxWidth="xl">



    <div style={{display:"flex",justifyContent:"space-between",marginBottom:"6rem"}}>
       
      
       </div>



    <h1 style={{position:"relative",fontWeight:"bold",marginBottom:"40px",fontSize:"30px"}}>NEW LESSON/SESSION</h1>

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
             LESSON NUMBER
             </div>
      
            </Typography>
          
          </Grid>

          <Grid item xs={7}>
            <TextField
            type="number"
            fullWidth
            placeholder="please input only a number e.g 1,2,17 etc "
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
    </>
  );
}

export default AddLesson;