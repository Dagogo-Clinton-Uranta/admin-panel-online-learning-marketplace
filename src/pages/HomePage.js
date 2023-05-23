import { Helmet } from 'react-helmet-async';
import { Grid, Container, Typography, Paper, Button, Stack, Skeleton } from '@mui/material';
import { useEffect } from 'react';
import { fCurrency, fNumber } from '../utils/formatNumber';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import EmptyRowCard from 'src/components/home/empty-row-card';
import { fetchGroups, fetchMyGroups } from 'src/redux/actions/group.action';
import MyCoolersRowCard from 'src/components/my-cooler/my-coolers-card';
import { fetchUserData } from 'src/redux/actions/auth.action';

import merge from 'lodash/merge';
import ReactApexChart from 'react-apexcharts';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import { BaseOptionChart } from 'src/components/chart2';
import RecentTransaction from 'src/components/home/recent-transaction';
import { fetchMyTransactions } from 'src/redux/actions/transaction.action';
import BoxOne from 'src/components/home/box-one';
import FeedBox from 'src/components/home/feed-box';
import SeessionBox from 'src/components/home/session-box';
import BadgeBox from 'src/components/home/badge-box';


const CHART_HEIGHT = 392;
const LEGEND_HEIGHT = 72;



const CHART_DATA = [50, 50];

export default function HomePage() {
  const theme = useTheme();
    
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { myGroups, isLoading } = useSelector((state) => state.group);
  const { transactions } = useSelector((state) => state.transaction);



 // useEffect(() => {
 //   if(user?.id == undefined){
 //    return navigate("/login");
 //   }
 //  }, [])

  useEffect(() => {
    dispatch(fetchMyGroups(user?.coolers));
    dispatch(fetchMyTransactions(user?.id));
    console.log("Transac Changed.");
  }, [user])

  useEffect(() => {
    dispatch(fetchUserData(user?.id));
  }, [])



const myCoolerGroups = myGroups?.length ? (
  myGroups
  .slice(0, 3)
  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  .map(group => {
    return (
      <MyCoolersRowCard 
      groupId={group.groupId}
      name={group.groupName} 
      fee={fCurrency(group.amount)}
      count={`${group.members.length} OF ${group.noOfSavers} SAVERS`}
      img={group.imageUrl}
      members={group.members}
      isMember={group.members.includes(user?.id)}
      startDate={group.startDate}
      />
    )
  })
) : 
<>
<EmptyRowCard msg={"Coolers you have joined will appear here."}/>
</>


  return (
    <>
      <Helmet>
        <title> CMC | Dashboard </title>
      </Helmet>

      <Container maxWidth="xl">

  <Grid container spacing={2} style={{border: '0px solid red'}}>
        
  <Grid item xs={12} md={8} lg={6} style={{border: '0px solid green', height: '800px'}}>
      <div style={{display: 'flex', flexDirection: 'column'}}>
      <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 240,
            border: '1px solid black'
          }}
        >
          <BoxOne />
        </Paper>
        <br/>
        <SeessionBox />
      </div>
      </Grid>
      

      <Grid item xs={12} md={8} lg={6} >
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <Paper
          sx={{
            pt: 1,
            pb: 1,
            display: 'flex',
            flexDirection: 'column',
            height: 410,
            border: '1px solid black'
          }}
        >
          <FeedBox />
        </Paper>
        <br/>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 240,
            border: '1px solid black'
          }}
        >
          <BadgeBox />
        </Paper>
        </div>
      </Grid>
          </Grid>


      </Container>
    </>
  );
}
