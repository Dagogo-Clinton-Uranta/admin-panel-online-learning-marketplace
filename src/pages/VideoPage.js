import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Paper, Button, Stack, Skeleton } from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import HomeBox from '../components/home/home-box';
import PublicCoolerRowCard from 'src/components/public-cooler/public-cooler-card';
import { fetchGroups, fetchPublicGroup } from 'src/redux/actions/group.action';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fCurrency } from '../utils/formatNumber';
import CoolerRowCard from 'src/components/coolers/cooler-row-card';
import { fetchUserData } from 'src/redux/actions/auth.action';
import VideosRowCard from 'src/components/video/video-row-card';
import Pagination from 'src/components/pagination-component/Pagination';



export default function VideoPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setpostPerPage] = useState(3);
  const theme = useTheme();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { allGroups, publicGroups, isLoading } = useSelector((state) => state.group);

  // useEffect(() => {
  //   dispatch(fetchGroups(user.employeerID));
  // }, [])
  
  // useEffect(() => {
  //   dispatch(fetchUserData(user.id));
  // }, [])

const videosData = [
    {id: 1, title: 'FINANCE', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do iusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet.', tags: 'Psychology, Communication etc'},
    {id: 2, title: 'INSURANCE', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do iusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet.', tags: 'Psychology, Communication etc'},
    {id: 3, title: 'HR', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do iusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet.', tags: 'Psychology, Communication etc'},
]


const lastPostIndex = currentPage * postPerPage;
const firstPostIndex = lastPostIndex - postPerPage;
const currentVideosData = videosData?.slice(firstPostIndex, lastPostIndex);


const allVideosData = currentVideosData?.length ? (
    currentVideosData.map(video => (
      <VideosRowCard 
        videoId={video.id}
        title={video.title} 
        desc={video.desc}
        tags={video.tags}
      />
    ))
  ) : (
    <div className="container">
      <center><p className="center">No videos yet</p></center>
    </div>
  );
  

  return (
    <>
      <Helmet>
        <title> CMC | VIDEOS </title>
      </Helmet>
      <Container maxWidth="xl">
      {/* <SearchBox style={{ width: '100%' }} /> */}
      <br/>
      <Grid  container direction="row" justifyContent="flex-end" alignItems="flex-end">
      <Button variant="contained" style={{backgroundColor: "white", color: 'black', border: '1px solid black', paddingTop: '10px', paddingBottom: '10px',  paddingRight: '30px', paddingLeft: '30px'}}>
      FILTER
    </Button>
    </Grid>
      <br/>
      {
        // isLoading ?
        // <Stack>
        // <Skeleton />
        // <Skeleton animation="wave" />
        // <Skeleton animation={false} />
        // </Stack>
        // :
        <>
        {allVideosData}
        <Pagination 
        totalPosts={videosData?.length} 
        postsPerPage={postPerPage} 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}/> 
        </>
      }
  </Container>
      
     
    </>
  );
}