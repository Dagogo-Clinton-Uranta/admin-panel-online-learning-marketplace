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
import IncubatorRowCard2 from 'src/components/incubator/incubator-row-card2';
import CustomSearchBar from 'src/components/global/CustomSearchBar';


export default function OperationsVideoPage() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

const data = [
    {id: 1, imageUrl: '', title: "General", val: "lorem ard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompani"},
    {id: 2, imageUrl: '', title: "Psychology", val: "lorem ard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompani"},
    {id: 3, imageUrl: '', title: "Communication", val: "lorem ard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompani"},
    {id: 4, imageUrl: '', title: "Certifications (MBE & WBE)", val: "lorem ard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompani"}
]


const allIncubatorVideos = data?.length ? (
    data.map((dt,i) => {
    return (
      <IncubatorRowCard2 
      id={dt.id}
      title={dt.title} 
      val={dt.val}
      img={dt.imageUrl}
      position={i+1 ===data.length?'last':'not last'}
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
      <h1 style={{position:"relative",fontWeight:"bold",marginLeft:"30px",marginBottom:"20px",paddingTop:"30px",fontSize:"30px"}}>Videos - Organization</h1>

        {/*I USE THE DIV TO REGULATE STYLE AND POSITIONING OF THE  SEARCH BAR */}
        <div style={{width:"50%",marginBottom:"40px",marginLeft:"30px"}}>
        <CustomSearchBar/> 
       </div>
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