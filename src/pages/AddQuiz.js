import { Container,Grid, TextField, Typography, TextareaAutosize, Button, Paper,Divider,Box} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import UPLOADIMG from '../assets/images/upload.png';
import { fetchGroups, fetchMyGroups, uploadUserSettings} from 'src/redux/actions/group.action';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { useDispatch, useSelector } from 'react-redux';
import { notifyErrorFxn } from 'src/utils/toast-fxn';
import users from 'src/_mock/user';

import { addQuiz} from 'src/redux/actions/group.action';


function AddQuiz() {
  const navigate = useNavigate();
  const location = useLocation();
  console.log("location state is",location.state)
  const [file, setFile] = useState();

  const [fileSize, setFileSize] = useState();


  const [optionFill,setOptionFill] = useState('');

  const [optionA, setOptionA] = useState(null);
  const [optionB, setOptionB] = useState(null);
  const [optionC, setOptionC] = useState(null);
  const [optionD, setOptionD] = useState(null);

  const [optionsArray,setOptionsArray] = useState([{A:optionA},{B:optionB},{C:optionC},{D:optionD}])

  const dispatch = useDispatch();


  const { user } = useSelector((state) => state.auth);
  console.log("user details are:",user)




  const [loading,setLoading] =useState(false)

  const [title,setTitle] = useState('')
  const [category,setCategory] = useState(location.state.category)
  const [body,setBody] = useState('')
  const [subject,setSubject] = useState(location.state.subject)
  const [quizFileUrl,setQuizFileUrl] = useState('')
  const [lessonNumber,setLessonNumber] = useState('')
 

  const [question,setQuestion] = useState('')
  const [correctAnswer,setCorrectAnswer] = useState('')
  
//I AM ONLY USING THIS TO INITIALIZE STATE,AFTERWARDS IT IS USELESS
 /* const questionsArrayHolder = [
    {
     correctAnswer:" ",
     optionA:{optionDesc:" ",optionLeter:" "},
     optionB:{optionDesc:" ",optionLeter:" "},
     optionC:{optionDesc:" ",optionLeter:" "},
     optionD:{optionDesc:" ",optionLeter:" "},
     questionNumber:1
    }
    
  ]*/


  const [questionsArray,setQuestionsArray] = useState([])
  
  const expandQuestionsArray = () =>{

     let questionsArrayHolder = [...questionsArray]

     questionsArrayHolder[questionsArrayHolder.length] = {
     
      correctAnswer:correctAnswer,
      optionA:{optionDesc:optionA,optionLeter:"A"},
      optionB:{optionDesc:optionB,optionLeter:"B"},
      optionC:{optionDesc:optionC,optionLeter:"C"},
      optionD:{optionDesc:optionD,optionLeter:"D"},
      questionNumber:questionsArray.length+1,
      question:question
     
    }

    setQuestionsArray([...questionsArrayHolder])
    setQuestion('')
    setOptionA('')
    setOptionB('')
    setOptionC('')
    setOptionD('')
   setCorrectAnswer('')
   
  }

  const clearOptions =()=>{
    setOptionA('')
    setOptionB('')
    setOptionC('')
    setOptionD('')
  }

  const shrinkQuestionsArray = () =>{
if(questionsArray.length > 1){
 let questionsArrayShrunk = [...questionsArray]
  questionsArrayShrunk.pop()

    setQuestionsArray(questionsArrayShrunk)
  }
    else{
      notifyErrorFxn("You must have at least 1 question !")
    }
  }



useEffect(()=>{

setOptionsArray([{A:optionA},{B:optionB},{C:optionC},{D:optionD}])

},[optionA,optionB,optionC,optionD])


 


  const addObject ={
    title,
    body,
    chapterId:location.state.chapterId,
    level:location.state.category,
    subject:location.state.subject,
   
    quizFileUrl:quizFileUrl,
    lessonNumber:lessonNumber,
    questionsArray:questionsArray
    
  }




  const addThisQuiz = async(addObject) => {
  
  if(!title || !body ||!category || !quizFileUrl||!subject 
   ||!location.state.chapterId||!lessonNumber
    ){
    notifyErrorFxn("Please make sure to fill in all fields.")
  }else if(questionsArray.length<1){
    notifyErrorFxn("You must have at least 1 question in your quiz.")
  }
  else{
    setLoading(true)
    dispatch(addQuiz(addObject))
   
    // console.log("identity is",identity)
    // console.log("update this subject is updating.........")
    setTimeout(()=>{setLoading(false)},2800)
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

<Container maxWidth="xl">



    <div style={{display:"flex",justifyContent:"space-between",marginBottom:"6rem"}}>
       
      
       </div>



    <h1 style={{position:"relative",fontWeight:"bold",marginBottom:"40px",fontSize:"30px"}}>NEW QUIZ</h1>

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
            placeholder=" e.g  QCM chapitre 5."
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
          ADD QUESTION(S)
          </Typography>

        
        </Box>
       
      </Grid>

 

 { questionsArray.map((item,index)=> (
  <>
  <Grid style={{position:"relative"}} container spacing={2}>

 <Grid container item xs={12} spacing={2}>
      <Grid item xs={12}>
        <Typography  style={{display:"flex",alignItems:"center",justifyContent:"center"}}variant="p" component="p">
         <div style={{fontSize:"1.5rem"}} >
        QUESTION  {index+1}
         </div>
  
        </Typography>
      
      </Grid>

     
    </Grid>


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
        value= {item.question}
        //onChange = {(e)=>{setQuestion(e.target.value)}}
        disabled={true}
        />
        
        
      </Grid>
    </Grid>



   
   {/*<Grid container item xs={12} spacing={2}>
      <Grid item xs={3}>
        <Typography  style={{display:"flex",alignItems:"center",justifyContent:"center"}}variant="p" component="p">
         <div>
        ANSWER OPTIONS
         </div>
  
        </Typography>
      
      </Grid>

      <Grid item xs={7} sx={{display:"flex",justifyContent:"center",gap:"20px"}} >
        <TextField
        sx={{width:"90%"}}
        placeholder=" enter answer"
        variant="outlined"
        multiline
        maxRows={2}
        value= {optionFill}
        onChange = {(e)=>{setOptionFill(e.target.value)}}
        
        />

<div style={{ display: 'flex', justifyContent: 'center' }}>
<Button  onClick={() => { addOption(optionFill)}} variant="contained" 
style={{ backgroundColor: "#000000", paddingTop: '10px', paddingBottom: '10px', 
paddingRight: '30px', paddingLeft: '30px'}}
>
ADD
</Button>
</div>
        
        
      </Grid>
 </Grid>*/}


    <Grid container item xs={12} sx={{paddingTop:"4rem"}} spacing={2}>
      <Grid item xs={3}>
        <Typography  style={{display:"flex",alignItems:"center",justifyContent:"center"}}variant="p" component="p">
         <div >
        ANSWERS ADDED
         </div>
  
        </Typography>
      
      </Grid>

      <Grid item xs={7} sx={{display:"flex",  flexDirection:"column",justifyContent:"flex-start",gap:"20px"}} >
       <p>A.){" "}{item.optionA && item.optionA.optionDesc   && item.optionA.optionDesc}</p>
       <p>B.){" "}{item.optionB && item.optionB.optionDesc   && item.optionB.optionDesc}</p>
       <p>C.){" "}{item.optionC && item.optionC.optionDesc   && item.optionC.optionDesc}</p>
       <p>D.){" "}{item.optionD && item.optionD.optionDesc   && item.optionD.optionDesc}</p> 
        
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
        placeholder=" enter only letters A,B,C or D"
        variant="outlined"
        multiline
        maxRows={2}
        value= {item.correctAnswer}
        //onChange = {(e)=>{setCorrectAnswer(e.target.value)}}
        disabled={true}
        />
        
        
      </Grid>
    </Grid>


   
    <div style={{height:"2px", width:"95%",borderBottom:"1px solid black",position:"absolute",left:"0rem",top:"26rem"}}></div>
  

  </Grid> 
   <br/><br/><br/>
   </>
  ))}

 
<br/>
  <div style={{ position:"relative",display: 'flex',flexDirection:"column", width:"16%", justifyContent: 'center',margin:"0 auto",gap:"1rem" ,marginBottom:"6rem"}}>
 

  <Button  onClick={() => {shrinkQuestionsArray() }} variant="contained" 
  style={{ backgroundColor: "#000000"/*"#F97D0B"*/, paddingTop: '10px', paddingBottom: '10px', 
  paddingRight: '30px', paddingLeft: '30px'}}
>
    DELETE LAST QUESTION
  </Button>
 
  <div style={{height:"2px", width:"95%",borderBottom:"1px solid black",position:"absolute",left:"0rem",top:"4rem",marginBottom:"6rem"}}></div>
</div>

<br/><br/>
</Container>


<Grid container style={{position:"relative"}} spacing={2}>

<Grid container item xs={12} spacing={2}>
     <Grid item xs={12}>
       <Typography  style={{display:"flex",alignItems:"center",justifyContent:"center"}}variant="p" component="p">
        <div style={{fontSize:"1.5rem"}} >
       QUESTION TO ADD
        </div>
 
       </Typography>
     
     </Grid>

    
   </Grid>


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
        <div>
       ANSWER OPTIONS
        </div>
 
       </Typography>
     
     </Grid>

     <Grid item xs={7} sx={{display:"flex",justifyContent:"center",gap:"20px"}} >
       <TextField
       sx={{width:"90%"}}
       placeholder=" enter answer"
       variant="outlined"
       multiline
       maxRows={2}
       value= {optionFill}
       onChange = {(e)=>{setOptionFill(e.target.value)}}
       
       />

<div style={{ display: 'flex', justifyContent: 'center' }}>
<Button  onClick={() => { addOption(optionFill)}} variant="contained" 
style={{ backgroundColor: "#000000", paddingTop: '10px', paddingBottom: '10px', 
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


    
   <br/><br/>
  <div style={{ display: 'flex',flexDirection:"column", width:"16%", justifyContent: 'center',margin:"0 auto",gap:"1rem" }}>
 

 <Button  onClick={() => {clearOptions() }} variant="contained" 
 style={{ backgroundColor: "#000000"/*"#F97D0B"*/, paddingTop: '10px', paddingBottom: '10px', 
 paddingRight: '30px', paddingLeft: '30px'}}
>
   CLEAR OPTIONS
 </Button>
 
</div>

<br/><br/><br/><br/><br/><br/>


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
       placeholder=" enter only letters A,B,C or D"
       variant="outlined"
       multiline
       maxRows={2}
       value= {correctAnswer}
       onChange = {(e)=>{setCorrectAnswer(e.target.value)}}
       
       />
       
       
     </Grid>
   </Grid>


  

   <div style={{height:"2px", width:"95%",borderBottom:"1px solid black",position:"absolute",left:"0rem",top:"47rem",marginBottom:"2rem"}}></div>

  
 </Grid> 
 


<br/><br/><br/>
  <div style={{ display: 'flex',flexDirection:"column", width:"16%", justifyContent: 'center',margin:"0 auto",gap:"1rem" }}>
 

  <Button  onClick={() => {expandQuestionsArray() }} variant="contained" 
  style={{ backgroundColor: "#000000"/*"#F97D0B"*/, paddingTop: '10px', paddingBottom: '10px', 
  paddingRight: '30px', paddingLeft: '30px'}}
>
    ADD THIS QUESTION
  </Button>
 
</div>

<br/><br/><br/><br/>
  <div style={{ display: 'flex', justifyContent: 'center',gap:"1rem" }}>
 
  <Button  onClick={() => {navigate(-1) }} variant="contained" 
  style={{ backgroundColor: "#000000"/*"#F97D0B"*/, paddingTop: '10px', paddingBottom: '10px', 
  paddingRight: '30px', paddingLeft: '30px'}}
>
    CANCEL
  </Button>
 
  <Button  onClick={() => { addThisQuiz(addObject)}} variant="contained" disabled={loading}
  style={{ backgroundColor: "#000000"/*"#F97D0B"*/, paddingTop: '10px', paddingBottom: '10px', 
  paddingRight: '30px', paddingLeft: '30px'}}
>
    {loading?"loading...":"SUBMIT QUIZ"}
  </Button>
</div>
    </>
  );
}

export default AddQuiz;