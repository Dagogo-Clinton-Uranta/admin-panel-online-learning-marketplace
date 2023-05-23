
import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Paper, Button, Stack, Skeleton } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress'
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import HomeBox from '../components/home/home-box';
import PublicCoolerRowCard from 'src/components/public-cooler/public-cooler-card';
import { fetchAllCategories } from 'src/redux/actions/group.action';
import { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fCurrency } from '../utils/formatNumber';

import CategoriesRowCard from 'src/components/categories/categories-row-card';
import CustomSearchBar from 'src/components/global/CustomSearchBar';



export default function CategoriesVideoPage() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { allCategories } = useSelector((state) => state.group);
   console.log("CATEGORIES ARE:",allCategories)
 
   const dummyData = [
    {id: 1, imageUrl: '', title: "Finance", body: "lorem ard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompani"},
    {id: 2, imageUrl: '', title: "Legal", body: "lorem ard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompani"},
    {id: 3, imageUrl: '', title: "Insurance", body: "lorem ard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompani"}
]
 
 
 
 
 
   const [data,setData] = useState([])




useEffect(()=>{
  dispatch(fetchAllCategories())

  setData(allCategories)

 // setTimeout(()=>{setData(allCategories)},1300)
},[])

useEffect(()=>{
setData(allCategories)
},[allCategories])



const allIncubatorVideos = data?.length ? (
    data.map(dt => {
    return (
      <CategoriesRowCard 
      id={dt.id}
      title={dt.title} 
      body={dt.body}
      img={dt.imageUrl}
      />
    )
  })
) : 
<>
{/*<div className="container">
      <center><p className="center">No Video Categories yet</p></center>
</div>*/}
         <center>
         <CircularProgress />
         </center>
</>


  return (
    <>
      <Helmet>
        <title> Incubator | Videos </title>
      </Helmet>
      <Container maxWidth="xl">
        
         {/*I USE THE DIV TO REGULATE STYLE AND POSITIONING OF THE  SEARCH BAR */}
        <div style={{width:"35%",marginBottom:"40px"}}>
        <CustomSearchBar/>
        </div>

      <h1 style={{position:"relative",left:"15px",fontWeight:"bold",marginBottom:"40px",fontSize:"30px"}}>VIDEOS</h1>
      {/* <SearchBox style={{ width: '100%' }} /> */}
      <br/>
      {/* <Grid  container direction="row" justifyContent="flex-end" alignItems="flex-end">
      <Button variant="contained" style={{backgroundColor: "#348AED", paddingTop: '10px', paddingBottom: '10px',  paddingRight: '30px', paddingLeft: '30px'}}>
      FILTER
    </Button>
    </Grid>
      <br/> */}

        {data.length === 0 ?
       
        
        <center>
         <CircularProgress />
         </center> 
         :
        allIncubatorVideos
        }
  </Container>
      
     
    </>
  );
}