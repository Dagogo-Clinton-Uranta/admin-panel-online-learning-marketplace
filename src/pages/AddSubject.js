import { Container,Grid, TextField, Typography, TextareaAutosize, Button, Paper,Divider,Box} from '@mui/material';
import { useRef, useState,useEffect} from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import UPLOADIMG from '../assets/images/upload.png';
import { addSubject} from 'src/redux/actions/group.action';

import { useDispatch, useSelector } from 'react-redux';
import { notifyErrorFxn } from 'src/utils/toast-fxn';
import users from 'src/_mock/user';

import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { getTeachers } from 'src/redux/actions/job.action';

function AddSubject() {
  const navigate = useNavigate();
  const location = useLocation()
  console.log("location is",location.state.levelName,location.state.uid)

  const { teachers } = useSelector((state) => state.jobs);

  const dispatch = useDispatch();


 const [teachersArr,setTeacherArr]=useState([...teachers.map((item)=>(item.firstName + " " + item.lastName))])
  const [loading,setLoading] = useState(false)
  const [title,setTitle] = useState('')
  const [level,setLevel] = useState(location.state && location.state.levelName?location.state.levelName:" cannot change this field")
  const [body,setBody] = useState('')
  const [price,setPrice] = useState('')
  const [categoryId,setCategoryId] =useState('')
  const [instructor,setInstructor]  = useState('')
  const [subjectImageUrl,setSubjectImageUrl] = useState('')

  const { user } = useSelector((state) => state.auth);

  console.log("user details are:",user)


  
 

  const addObject ={
    title,
    body,
    level:level,
    categoryId:location.state.uid,
    category:location.state.levelName,
    instructor,
    price,
    subjectImageUrl
  }

  const addThisSubject = async(addObject) => {
    
    if(!title || !body ||!level ||!location.state.levelName||!location.state.uid){
      notifyErrorFxn("Please make sure to fill in all fields.")
    }
    else{
    
    setLoading(true)
    dispatch(addSubject(addObject))
   
    // console.log("identity is",identity)
    // console.log("update this subject is updating.........")
    setTimeout(()=>{setLoading(false)},1800)
    }
  }
 

  useEffect(()=>{

    dispatch(getTeachers())

  },[])

  return (
    <>
    <Container maxWidth="xl">



    <div style={{display:"flex",justifyContent:"space-between",marginBottom:"6rem"}}>
       
      
       </div>



    <h1 style={{position:"relative",fontWeight:"bold",marginBottom:"40px",fontSize:"30px"}}>NEW SUBJECT</h1>

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
             LEVEL
             </div>
      
            </Typography>
          
          </Grid>

          <Grid item xs={7}>
            <TextField
            fullWidth
            placeholder=" "
            variant="outlined"
            multiline
            maxRows={2}
            value= {level}
            
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
            placeholder=" Physique, Histoire, etc."
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
             IMAGE URL
             </div>
      
            </Typography>
          
          </Grid>

          <Grid item xs={7}>
            <TextField
            fullWidth
            placeholder=" e.g www.amazons3/image.jpeg."
            variant="outlined"
            multiline
            maxRows={1}
            value= {subjectImageUrl}
            onChange = {(e)=>{setSubjectImageUrl(e.target.value)}}
            
            />
            
            
          </Grid>
        </Grid>


   
        <Grid container item xs={12} spacing={2}>
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
        {teachersArr.length >0  && teachersArr.map((item)=>(
            <MenuItem value={item}>{item}</MenuItem>
        ))}
       
        </Select>
            
            
          </Grid>
        </Grid>
       
  
        <Grid container item xs={12} spacing={2}>
          <Grid item xs={3}>
            <Typography  style={{display:"flex",alignItems:"center",justifyContent:"center"}}variant="p" component="p">
             <div >
             PRICE (GNF)
             </div>
      
            </Typography>
          
          </Grid>

          <Grid item xs={7}>
            <TextField
            fullWidth
            placeholder=" 20,000."
            variant="outlined"
            multiline
            maxRows={1}
            value= {price}
            onChange = {(e)=>{setPrice(e.target.value)}}
            
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
 
  <Button  onClick={() => { addThisSubject(addObject)}} variant="contained" 
  style={{ backgroundColor: "#000000"/*"#F97D0B"*/, paddingTop: '10px', paddingBottom: '10px', 
  paddingRight: '30px', paddingLeft: '30px'}}
>
   {loading?"loading..." :"SUBMIT"}
  </Button>
</div>
</Container>
    </>
  );
}

export default AddSubject;