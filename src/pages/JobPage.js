import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { getJobs } from "../redux/actions/job.action";
import {Skeleton, Box} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import CJobList from "src/components/job/c-job-list";


export default function JobPage() {
    const dispatch = useDispatch();
    const { jobs } = useSelector((state) => state.jobs);
    const [jobArr, setJobArr] = useState(jobs);
    useEffect(() => {
     dispatch(getJobs());  
     setJobArr(jobs);
    }, [jobs])
  
    console.log('jobArr: ', jobArr);
  

  return (
    <>
      <Helmet>
        <title> CMC | Company Panel </title>
      </Helmet>

      <Container maxWidth="xl">
        {jobArr.length ?
           <CJobList jobs={jobs}/>
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
    </>
  );
}
