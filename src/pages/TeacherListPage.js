import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from '@mui/material/Container';
//import Layout from "../components/layout";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Grid, Box, Typography, Paper, Button, Stack } from '@mui/material';
import { useNavigate,Link } from 'react-router-dom';
import CJobList from "../components/home/c-job-list";
import CTeacherList from "../components/home/c-teacher-list";
import { getTeachers } from "../redux/actions/job.action";
import {Skeleton} from '@mui/material';
import ReactApexChart from 'react-apexcharts';


const theme = createTheme();



export default function TeacherListPage() {
  const dispatch = useDispatch();
  const { teachers } = useSelector((state) => state.jobs);
  const [teacherArr, setTeacherArr] = useState([]/*teachers*/);
  const navigate = useNavigate()

  //const { userDetails, error,message, isLoading } = useSelector((state) => state.loggedIn);
    
   /* useEffect(() => {
      console.log(userDetails)
     if(userDetails === '' ){
       
        navigate('/login')
        
      }
       
       
    }, [])*/

    
 
 
 
 useEffect(() => {
   dispatch(getTeachers());  
   setTimeout(setTeacherArr(teachers), 1000);
  }, [])


  useEffect(() => {
    if(teacherArr.length === 0 ){
      setTeacherArr(teachers);
       }  
     }, [teachers])

  console.log('bonecole teacher data ARE: ', teacherArr);

  return (
      
        
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
       {/*<h1 style={{position:"relative",fontWeight:"bold",left:"0px",marginBottom:"40px",fontSize:"30px"}}>STUDENT DASHBOARD</h1>*/}
      

       {teacherArr && teacherArr.length ?
           
           <CTeacherList teachers={teachers} />
           :
           <center>
           <Box sx={{ width: 300 }}>
           <Skeleton />
           <Skeleton animation="wave" />
           <Skeleton animation={false} />
         </Box>
         </center>
      }
        </Container>
     
  );
}
