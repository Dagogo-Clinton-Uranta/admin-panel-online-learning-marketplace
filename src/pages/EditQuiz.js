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



function EditQuiz() {

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



    <h1 style={{position:"relative",fontWeight:"bold",marginBottom:"40px",fontSize:"30px"}}>EDIT QUIZ</h1>

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
        ANSWERS ADDED
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

   

    <div style={{ position:"relative",display: 'flex',flexDirection:editable !== index?"row":"column", width:"32%", justifyContent: 'center',margin:"0 auto",gap:"1rem" ,marginBottom:"6rem"}}>
 

 <Button  onClick={() => {if (editable !== index){ 
                      setEditable(index)
                     setCorrectAnswerInFocus(item.correctAnswer);
                     setOptionADescInFocus(item.optionA.optionDesc);
                     setOptionBDescInFocus(item.optionB.optionDesc);
                     setOptionCDescInFocus(item.optionC.optionDesc);
                     setOptionDDescInFocus(item.optionD.optionDesc);
                     setQuestionInFocus(item.question);
                    }
                      else{setEditable("none")
                      setCorrectAnswerInFocus("none");
                      setOptionADescInFocus("none");
                      setOptionBDescInFocus("none");
                      setOptionCDescInFocus("none");
                      setOptionDDescInFocus("none");
                      setQuestionInFocus("none"); 
                     } 
                       }} 

variant="contained" 
 style={{ backgroundColor: "#000000"/*"#F97D0B"*/, paddingTop: '10px', paddingBottom: '10px',  marginTop:"1rem",
 paddingRight: '30px', paddingLeft: '30px'}}
>
 { editable === index ? "STOP EDIT":"EDIT QUESTION" }
 </Button>



 {editable !== index && 

<Button  onClick={() => {deleteQuestion(index) }} variant="contained" 
style={{ backgroundColor: "#000000"/*"#F97D0B"*/, paddingTop: '10px', paddingBottom: '10px', marginTop:"1rem",
paddingRight: '30px', paddingLeft: '30px'}}
>
  DELETE QUESTION
</Button>
}

{editable === index && 

 <Button  onClick={() => {editQuestion(updateSingleQuestion,index) }} variant="contained" 
 style={{ backgroundColor: "#000000"/*"#F97D0B"*/, paddingTop: '10px', paddingBottom: '10px', marginTop:"1rem",
 paddingRight: '30px', paddingLeft: '30px'}}
>
   UPDATE QUESTION
 </Button>
 }


</div>



     
   
    <div style={{height:"2px", width:"95%",borderBottom:"1px solid black",position:"absolute",left:"0rem",top:editable === index ?"42rem":"28rem"}}></div>
  

  </Grid> 
   <br/><br/><br/>
   </>
  ))
  
  
  
  }

 
<br/>
 

<br/><br/>
</Container>


<Grid container style={{position:"relative"}} spacing={2}>

<Grid container item xs={12} spacing={2}>
     <Grid item xs={12}>
       <Typography  style={{display:"flex",alignItems:"center",justifyContent:"center"}}variant="p" component="p">
        <div style={{fontSize:"1.5rem"}} >
        ADD NEW QUESTION
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
 
  <Button  onClick={() => { updateThisQuiz(addObject,quizInfo.uid)}} variant="contained" disabled={loading}
  style={{ backgroundColor: "#000000"/*"#F97D0B"*/, paddingTop: '10px', paddingBottom: '10px', 
  paddingRight: '30px', paddingLeft: '30px'}}
>
    {loading?"loading...":"UPDATE QUIZ"}
  </Button>
</div>
    </>
  );
}

export default EditQuiz;