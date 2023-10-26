import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from '@mui/material/Container';
//import Layout from "../components/layout";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Grid, Box, Typography, Paper, Button, Stack } from '@mui/material';
import { useNavigate,Link } from 'react-router-dom';
import OrdersList from "../components/home/orders-list";
import { getTeachers } from "../redux/actions/job.action";
import {Skeleton} from '@mui/material';
import ReactApexChart from 'react-apexcharts';


const theme = createTheme();



export default function OrdersPage() {
  const dispatch = useDispatch();
  const { teachers } = useSelector((state) => state.jobs);
  const [teacherArr, setTeacherArr] = useState([]/*teachers*/);

  const navigate = useNavigate()

 
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

  const ordersData = [
    {id: 1, course: "Ongliais", email: "bolu@bon.com", purchased: "17-10-2023"},
    {id: 2, course: "6 Annee", email: "judith@bon.com", purchased: "17-10-2023"},
    {id: 3, course: "10ème Année", email: "Bangoura Bafodé", purchased: "17-10-2023"},
    {id: 4, course: "Mathématiques", email: "Curiya Muizit", purchased: "25-10-2023"},
    {id: 5, course: "Ibroq Lia", email: "Shayan@mail.com", purchased: "07-09-2023"},
    {id: 6, course: "Biologie TSE", email: "maria@ums.com", purchased: "11-7-2023"},

];

  return (
      
        
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
       {/*<h1 style={{position:"relative",fontWeight:"bold",left:"0px",marginBottom:"40px",fontSize:"30px"}}>STUDENT DASHBOARD</h1>*/}
      

       {ordersData && ordersData.length ?
           
           <OrdersList ordersData={ordersData} />
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
