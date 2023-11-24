import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from '@mui/material/Container';
//import Layout from "../components/layout";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Grid, Box, Typography, Paper, Button, Stack } from '@mui/material';
import { useNavigate,Link } from 'react-router-dom';
import OrdersList from "../components/home/orders-list";
import { getOrders, getTeachers } from "../redux/actions/job.action";
import {Skeleton} from '@mui/material';
import ReactApexChart from 'react-apexcharts';


const theme = createTheme();



export default function OrdersPage() {
  const dispatch = useDispatch();
  const { teachers, purchasedCourses, loading } = useSelector((state) => state.jobs);
  const [teacherArr, setTeacherArr] = useState([]);
  const [coursesData, setCoursesData] = useState([]);

  const navigate = useNavigate()

 
 useEffect(() => {
  if(!(purchasedCourses.length > 0)){
   dispatch(getOrders());  
   console.log("purchasedCourses___", purchasedCourses);
   setCoursesData(purchasedCourses);
  }

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
      

       {!loading ?
           
           <OrdersList ordersData={coursesData.purchasedCourses
           } />
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
