import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Paper, Button, Stack, Skeleton } from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import HomeBox from '../components/home/home-box';
import PublicCoolerRowCard from 'src/components/public-cooler/public-cooler-card';
import { fetchGroups, fetchPublicGroup } from 'src/redux/actions/group.action';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fCurrency } from '../utils/formatNumber';
import IncubatorRowCard from 'src/components/incubator/incubator-row-card';




export default function IncubatorVideoPage() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

const data = [
    {id: 1, imageUrl: '', title: "Technology", val: "lorem ard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompani"},
    {id: 2, imageUrl: '', title: "Operations", val: "lorem ard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompani"},
    {id: 3, imageUrl: '', title: "Safety", val: "lorem ard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompani"}
]


const allIncubatorVideos = data?.length ? (
    data.map(dt => {
    return (
      <IncubatorRowCard 
      id={dt.id}
      title={dt.title} 
      val={dt.val}
      img={dt.imageUrl}
      />
    )
  })
) : 
<>
<div className="container">
      <center><p className="center">No incubator yet</p></center>
  </div>
</>


  return (
    <>
      <Helmet>
        <title> incubator | Videos </title>
      </Helmet>
      <Container maxWidth="xl">
      <Paper sx={{boxShadow: "-5px 5px 8px 3px rgba(0,0,0,0.24)"}}>
      {/* <SearchBox style={{ width: '100%' }} /> */}
      <br/>
      {/* <Grid  container direction="row" justifyContent="flex-end" alignItems="flex-end">
      <Button variant="contained" style={{backgroundColor: "#348AED", paddingTop: '10px', paddingBottom: '10px',  paddingRight: '30px', paddingLeft: '30px'}}>
      FILTER
    </Button>
    </Grid>
      <br/> */}

        {allIncubatorVideos}
    </Paper>
  </Container>
      
     
    </>
  );
}