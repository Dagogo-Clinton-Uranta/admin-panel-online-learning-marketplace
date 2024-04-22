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

import { addQuiz,updateQuiz} from 'src/redux/actions/group.action';



function ViewQuizBreakdown() {

  const {quizInfo} = useSelector((state) => state.group)


  const navigate = useNavigate();
  const location = useLocation();
  console.log("location state is->",location.state)
  console.log("what is quizInfo--->:",quizInfo)
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

 //const studentAnswersForThisQuiz = user.quizzesTaken && user.quizzesTaken.filter((item)=>(item.quizId === quizInfo.uid ))

const studentAnswersForThisQuiz = location.state.studentAnswers && location.state.studentAnswers.sort((a,b)=>(a.questionNumber - b.questionNumber))

console.log("sorted student answers for this quiz!-->",studentAnswersForThisQuiz)


const[answersWrong,setAnswersWrong] = useState(0)
const[answersCorrect,setAnswersCorrect] = useState(0)

useEffect(()=>{

quizInfo.questionsArray.forEach((item,index)=>{


if(studentAnswersForThisQuiz[index] && studentAnswersForThisQuiz[index].chosenAnswer.optionLeter === item.correctAnswer){
  setAnswersCorrect(answersCorrect+1)}
  
  else if(studentAnswersForThisQuiz[index] && studentAnswersForThisQuiz[index].chosenAnswer.optionLeter !== item.correctAnswer){
  setAnswersWrong(answersWrong+1)
  }

})
}
,[location,quizInfo])

  const [loading,setLoading] =useState(false)

  const [title,setTitle] = useState(quizInfo && quizInfo.title)
  const [category,setCategory] = useState(quizInfo && quizInfo.level)
  const [body,setBody] = useState(quizInfo && quizInfo.body)
  const [subject,setSubject] = useState(quizInfo && quizInfo.subject)
  const [quizFileUrl,setQuizFileUrl] = useState(quizInfo && quizInfo.quizFileUrl)
  const [lessonNumber,setLessonNumber] = useState(quizInfo && quizInfo.lessonNumber)
 

 
 


  const [question,setQuestion] = useState('')
  const [correctAnswer,setCorrectAnswer] = useState('')
  const [editable,setEditable] = useState('none')
  

  const [correctAnswerInFocus,setCorrectAnswerInFocus] = useState('')
  const [questionInFocus,setQuestionInFocus] = useState('')
  const [optionADescInFocus,setOptionADescInFocus] = useState('')
  const [optionBDescInFocus,setOptionBDescInFocus] = useState('')
  const [optionCDescInFocus,setOptionCDescInFocus] = useState('')
  const [optionDDescInFocus,setOptionDDescInFocus] = useState('')

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


  const [questionsArray,setQuestionsArray] = useState(quizInfo && quizInfo.questionsArray)
  
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

  const deleteQuestion = (index) =>{

    if(window.confirm("Are you sure you want to delete this question ?")){

if(questionsArray.length > 0){
 let questionsArrayShrunk = [...questionsArray]
  questionsArrayShrunk.splice(index,1)

    setQuestionsArray(questionsArrayShrunk)
  }
    else{
      notifyErrorFxn("You must have at least 1 question !")
    }
  
  
  }
  
  
  }

  const editQuestion = (newQuestion,index) =>{
    if(questionsArray.length > 0){
     let questionsArrayEdited = [...questionsArray]
      questionsArrayEdited[index] = newQuestion
    
        setQuestionsArray(questionsArrayEdited)
        setEditable("none")
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
    chapterId:quizInfo && quizInfo.chapterId,
    level:category,
    subject:subject,
   
    quizFileUrl:quizFileUrl,
    lessonNumber:lessonNumber,
    questionsArray:questionsArray
    
  }

  const updateSingleQuestion = {
    
    correctAnswer:correctAnswerInFocus,
    question:questionInFocus,
    optionA:{optionLeter:"A", optionDesc:optionADescInFocus},
    optionB:{optionLeter:"B", optionDesc:optionBDescInFocus},
    optionC:{optionLeter:"C", optionDesc:optionCDescInFocus},
    optionD:{optionLeter:"D", optionDesc:optionDDescInFocus},


  }




  const updateThisQuiz = async(addObject,quizId) => {
  
  if(!title || !body ||!category || !quizFileUrl||!subject 
   /*||!location.state.chapterId*/||!lessonNumber
    ){
    notifyErrorFxn("Please make sure to fill in all fields.")
  }else if(questionsArray.length<1){
    notifyErrorFxn("You must have at least 1 question in your quiz.")
  }
  else{
    setLoading(true)
    dispatch(updateQuiz(addObject,quizId))
   
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



    <h1 style={{position:"relative",fontWeight:"bold",marginBottom:"40px",fontSize:"30px"}}>STUDENT QUIZ BREAKDOWN</h1>

    <Grid item xs={12} sx={{ display: 'flex' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant="h4" component="p">
              VIEW THEIR ANSWERS BELOW:
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
            value= {quizInfo && quizInfo.subject}
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
            value= {quizInfo && quizInfo.level}
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
            disabled={true}
            onChange = {(e)=>{setTitle(e.target.value)}}
            />
            
            
          </Grid>
        </Grid>


       {/*
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
       */}


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
      </Grid> */}



       

       {/* <Grid container item xs={12} spacing={2}>
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
       </Grid> */}

    
      
      </Grid>
    


</Container>





<Container maxWidth="xl" sx={{position:"relative"}}>

<div style={{height:"2px", width:"95%",borderBottom:"1px solid black",position:"absolute",left:"0rem",top:"7rem"}}></div>
     <br/> <br/> <br/>


<Grid item xs={12} sx={{ display: 'flex', flexDirection: 'row',justifyContent:"space-between", marginBottom:"3rem"}}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h4" component="p">
          ALL QUESTIONS
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
        value= {editable === index?questionInFocus :item.question}
         onChange = {(e)=>{setQuestionInFocus(e.target.value)}}
        disabled={editable === index?false:true}
        />
        
        
      </Grid>
    </Grid>



 


    <Grid container item xs={12} sx={{paddingTop:"4rem"}} spacing={2}>
      <Grid item xs={3}>
        <Typography  style={{display:"flex",alignItems:"center",justifyContent:"center"}}variant="p" component="p">
         <div >
        OPTIONS
         </div>
  
        </Typography>
      
      </Grid>

      <Grid item xs={7} sx={{display:"flex",  flexDirection:"column",justifyContent:"flex-start",gap:"20px"}} >
     <div style={{display:"flex",gap:"1rem",alignItems:"center"}}> <span>A.)</span>  <span>{ editable === index ?<TextField style={{width:"50%"}} value={item.optionA && optionADescInFocus}   onChange = {(e)=>{setOptionADescInFocus(e.target.value)}}/> :  item.optionA && item.optionA.optionDesc   && item.optionA.optionDesc}</span> </div>
       
       
     <div style={{display:"flex",gap:"1rem",alignItems:"center"}}>     <span>B.)</span>  <span>{editable === index ? <TextField style={{width:"50%"}} value={item.optionB && optionBDescInFocus}  onChange = {(e)=>{setOptionBDescInFocus(e.target.value)}} />  :  item.optionB && item.optionB.optionDesc   && item.optionB.optionDesc}</span> </div>
       
       
     <div style={{display:"flex",gap:"1rem",alignItems:"center"}}>     <span>C.)</span>  <span> {editable === index ?<TextField style={{width:"50%"}} value={item.optionC && optionCDescInFocus}  onChange = {(e)=>{setOptionCDescInFocus(e.target.value)}} />  : item.optionC && item.optionC.optionDesc   && item.optionC.optionDesc}</span>  </div>
      
      
     <div style={{display:"flex",gap:"1rem",alignItems:"center"}}>    <span>D.)</span>  <span> {editable === index ?<TextField style={{width:"50%"}} value={item.optionD && optionDDescInFocus}  onChange = {(e)=>{setOptionDDescInFocus(e.target.value)}}/>  : item.optionD && item.optionD.optionDesc   && item.optionD.optionDesc}</span>  </div> 
      
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
        value= {editable ===index ? correctAnswerInFocus: item.correctAnswer}
        onChange = {(e)=>{setCorrectAnswerInFocus(e.target.value)}}
        disabled={editable === index ?false:true}
        />
        
        
      </Grid>
    </Grid>


    <Grid container item xs={12} spacing={2}>
      <Grid item xs={3}>
        <Typography  style={{display:"flex",alignItems:"center",justifyContent:"center"}}variant="p" component="p">
         <div >
         CHOSEN ANSWER
         </div>
  
        </Typography>
      
      </Grid>

      <Grid item xs={7}>
        <TextField
        fullWidth
        placeholder=" letters A,B,C or D"
        variant="outlined"
        multiline
        maxRows={2}
        value= {studentAnswersForThisQuiz && studentAnswersForThisQuiz[index] &&  studentAnswersForThisQuiz[index].chosenAnswer.optionLeter}
        
        disabled={true}
        />
        
        
      </Grid>
    </Grid>

   

    <div style={{ position:"relative",backgroundColor:studentAnswersForThisQuiz[index] && studentAnswersForThisQuiz[index].chosenAnswer.optionLeter !== item.correctAnswer?"rgba(255, 0, 0, 0.5)":studentAnswersForThisQuiz[index] && studentAnswersForThisQuiz[index].chosenAnswer.optionLeter == item.correctAnswer?"rgba(50, 168, 0, 0.5)":"none",display: 'flex',flexDirection:"row", width:"100%", justifyContent: 'center',alignItems:"center",margin:"0 auto",gap:"1rem",marginTop:"2rem" ,marginBottom:"6rem",borderRadius:"0.4rem",height:"2rem"}}>
 

 <p>{studentAnswersForThisQuiz[index] && studentAnswersForThisQuiz[index].chosenAnswer.optionLeter === item.correctAnswer?
 "CORRECT":studentAnswersForThisQuiz[index] && studentAnswersForThisQuiz[index].chosenAnswer.optionLeter !== item.correctAnswer?"WRONG":"" }</p>


</div>



     
   
    <div style={{height:"2px", width:"95%",borderBottom:"1px solid black",position:"absolute",left:"0rem",top:editable === index ?"42rem":"28rem"}}></div>
  

  </Grid> 
 
   </>
  ))
  
  
  
  }

 

</Container>


  
  <Container maxWidth="xl">

  <Grid container item xs={12} spacing={2}>
      <Grid item xs={3}>
        <Typography  style={{display:"flex",alignItems:"center",justifyContent:"center"}}variant="p" component="p">
         <div >
         TOTAL QUESTIONS :
         </div>
  
        </Typography>
      
      </Grid>

      <Grid item xs={7}>
      <Typography  style={{display:"flex",alignItems:"center",justifyContent:"flex-start"}}variant="p" component="p">
         <div >
         {answersCorrect + answersWrong}
         </div>
  
        </Typography>
      </Grid>
      
    </Grid>



    <Grid container item xs={12} spacing={2}>
      <Grid item xs={3}>
        <Typography  style={{display:"flex",alignItems:"center",justifyContent:"center"}}variant="p" component="p">
         <div >
         CORRECT QUESTIONS :
         </div>
  
        </Typography>
       
      </Grid>

      <Grid item xs={7}>
      <Typography  style={{display:"flex",alignItems:"center",justifyContent:"flex-start"}}variant="p" component="p">
         <div >
        {answersCorrect}
         </div>
  
        </Typography>
      </Grid>
    </Grid>




    <Grid container item xs={12} spacing={2}>
      <Grid item xs={3}>
        <Typography  style={{display:"flex",alignItems:"center",justifyContent:"center"}}variant="p" component="p">
         <div >
         WRONG QUESTIONS :
         </div>
  
        </Typography>


       
      </Grid>

      <Grid item xs={7}>
      <Typography  style={{display:"flex",alignItems:"center",justifyContent:"flex-start"}}variant="p" component="p">
         <div >
        {answersWrong}
         </div>
  
        </Typography>
       
      </Grid>
    </Grid>



    <Grid container item xs={12} spacing={2}>
      <Grid item xs={3}>
        <Typography  style={{display:"flex",alignItems:"center",justifyContent:"center"}}variant="p" component="p">
         <div >
         PERCENTAGE :
         </div>
  
        </Typography>
        
      </Grid>

      <Grid item xs={7}>
      
       <Typography  style={{display:"flex",alignItems:"center",justifyContent:"flex-start"}}variant="p" component="p">
         <div >
         {((answersCorrect*100)/(answersCorrect + answersWrong)).toFixed(0) + ' %'}
         </div>
  
        </Typography>

      
      
      </Grid>
    </Grid>



  </Container>



<br/>
  <div style={{ display: 'flex', justifyContent: 'center',gap:"1rem" }}>
 
  <Button  onClick={() => {navigate(-1) }} variant="contained" 
  style={{ backgroundColor: "#000000"/*"#F97D0B"*/, paddingTop: '10px', paddingBottom: '10px', 
  paddingRight: '30px', paddingLeft: '30px'}}
>
    GO BACK
  </Button>
 
 
</div>
    </>
  );
}

export default ViewQuizBreakdown;