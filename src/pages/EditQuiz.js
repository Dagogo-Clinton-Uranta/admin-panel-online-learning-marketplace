import { Container,Grid, TextField, Typography, TextareaAutosize, Button, Paper,Divider,Box} from '@mui/material';
import { useRef, useState,useEffect } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import UPLOADIMG from '../assets/images/upload.png';
import { fetchGroups, fetchMyGroups, uploadUserSettings} from 'src/redux/actions/group.action';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { useDispatch, useSelector } from 'react-redux';
import { notifyErrorFxn } from 'src/utils/toast-fxn';
import users from 'src/_mock/user';

import { updateQuiz} from 'src/redux/actions/group.action';


function EditQuiz() {
  const navigate = useNavigate();
  const location = useLocation();
   
  const {quizInfo} = useSelector((state) => state.group)


  const [optionFill,setOptionFill] = useState('');

  const [optionA, setOptionA] = useState(quizInfo.optionsArray[0].A);
  const [optionB, setOptionB] = useState(quizInfo.optionsArray[1].B);
  const [optionC, setOptionC] = useState(quizInfo.optionsArray[2].C);
  const [optionD, setOptionD] = useState(quizInfo.optionsArray[3].D);

  const dispatch = useDispatch();

 


  const { user } = useSelector((state) => state.auth);
  console.log("what is quizInfo:",quizInfo)



  const [optionsArray,setOptionsArray] = useState(quizInfo.optionsArray)
  const [loading,setLoading] =useState(false)


  const [level,setLevel] = useState(quizInfo.level)
  const [title,setTitle] = useState(quizInfo.title)
  
  const [body,setBody] = useState(quizInfo.body)
  const [subject,setSubject] = useState(quizInfo.subject)
  const [quizFileUrl,setQuizFileUrl] = useState(quizInfo.quizFileUrl)
  const [lessonNumber,setLessonNumber] = useState(quizInfo.lessonNumber)
 

  const [question,setQuestion] = useState(quizInfo.question)
  const [correctAnswer,setCorrectAnswer] = useState(quizInfo.correctAnswer)

 


  const updateObject ={
    title,
    body,
    chapterId:quizInfo.chapterId,
    level:level,
    subject:quizInfo.subject,
   
    quizFileUrl:quizFileUrl,
    lessonNumber:lessonNumber,
    question,
    correctAnswer,
    optionsArray
  }




  const updateThisQuiz = async(id,updateObject) => {
  

    setLoading(true)
    dispatch(updateQuiz(id,updateObject))
   
    // console.log("identity is",identity)
    // console.log("update this subject is updating.........")
    setTimeout(()=>{setLoading(false)},1800)
   }
  



   useEffect(()=>{

    setOptionsArray([{A:optionA},{B:optionB},{C:optionC},{D:optionD}])
    
    },[optionA,optionB,optionC,optionD])
    



  return (
    <>

<Container maxWidth="xl">



    <div style={{display:"flex",justifyContent:"space-between",marginBottom:"6rem"}}>
       
      
       </div>



    <h1 style={{position:"relative",fontWeight:"bold",marginBottom:"40px",fontSize:"30px"}}>UPDATE QUIZ</h1>

    <Grid item xs={12} sx={{ display: 'flex' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant="h4" component="p">
              CHANGE DETAILS BELOW
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
            value= {level}
            
            
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
             QUIZ FILE URL
             </div>
      
            </Typography>
          
          </Grid>

          <Grid item xs={7}>
            <TextField
            fullWidth
            placeholder="e,g www.amazons3.com/video.mp4 "
            variant="outlined"
            multiline
            value= {quizFileUrl}
            onChange = {(e)=>{setQuizFileUrl(e.target.value)}}
            
            />
            
            
          </Grid>
        </Grid>

      





      
      </Grid>
   
</Container>





<Container maxWidth="xl" sx={{position:"relative"}}>

<div style={{height:"2px", width:"95%",borderBottom:"1px solid black",position:"absolute",left:"0rem",top:"7rem"}}></div>
     <br/> <br/> <br/>


<Grid item xs={12} sx={{ display: 'flex', flexDirection: 'row',justifyContent:"space-between", marginBottom:"3rem"}}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h4" component="p">
          UPDATE QUESTION
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
        value= {question}
        onChange = {(e)=>{setQuestion(e.target.value)}}
        
        />
        
        
      </Grid>
    </Grid>




    <Grid container item xs={12} spacing={2}>
      <Grid item xs={3}>
        <Typography  style={{display:"flex",alignItems:"center",justifyContent:"center"}}variant="p" component="p">
         <div >
        OPTION A
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
        value= {optionA}
        onChange = {(e)=>{setOptionA(e.target.value)}}
        
        />
        
        
      </Grid>
    </Grid>



    
    <Grid container item xs={12} spacing={2}>
      <Grid item xs={3}>
        <Typography  style={{display:"flex",alignItems:"center",justifyContent:"center"}}variant="p" component="p">
         <div >
        OPTION B
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
        value= {optionB}
        onChange = {(e)=>{setOptionB(e.target.value)}}
        
        />
        
        
      </Grid>
    </Grid>



    
    <Grid container item xs={12} spacing={2}>
      <Grid item xs={3}>
        <Typography  style={{display:"flex",alignItems:"center",justifyContent:"center"}}variant="p" component="p">
         <div >
        OPTION C
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
        value= {optionC}
        onChange = {(e)=>{setOptionC(e.target.value)}}
        
        />
        
        
      </Grid>
    </Grid>





    <Grid container item xs={12} spacing={2}>
      <Grid item xs={3}>
        <Typography  style={{display:"flex",alignItems:"center",justifyContent:"center"}}variant="p" component="p">
         <div >
        OPTION D
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
        value= {optionD}
        onChange = {(e)=>{setOptionD(e.target.value)}}
        
        />
        
        
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
        value= {correctAnswer}
        onChange = {(e)=>{setCorrectAnswer(e.target.value)}}
        
        />
        
        
      </Grid>
    </Grid>


   

  

  
  </Grid>
  <br/><br/>

{/*<div style={{ display: 'flex', justifyContent: 'center' }}>
<Button   variant="contained" 
style={{ backgroundColor: "#000000", paddingTop: '10px', paddingBottom: '10px', 
paddingRight: '30px', paddingLeft: '30px'}}
>
ADD
</Button>
</div>*/}


</Container>

<br/><br/><br/><br/>
  <div style={{ display: 'flex', justifyContent: 'center',gap:"1rem" }}>
 
  <Button  onClick={() => {navigate(-1) }} variant="contained" 
  style={{ backgroundColor: "#000000"/*"#F97D0B"*/, paddingTop: '10px', paddingBottom: '10px', 
  paddingRight: '30px', paddingLeft: '30px'}}
>
    CANCEL
  </Button>
 
  <Button  onClick={() => { updateThisQuiz(quizInfo.uid,updateObject)}} variant="contained" disabled={loading}
  style={{ backgroundColor: "#000000"/*"#F97D0B"*/, paddingTop: '10px', paddingBottom: '10px', 
  paddingRight: '30px', paddingLeft: '30px'}}
>
    {loading?"loading...":"SUBMIT"}
  </Button>
</div>
    </>
  );
}

export default EditQuiz;