import { Helmet } from 'react-helmet-async';
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Paper, Button, Stack, Skeleton } from '@mui/material';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Iconify from '../components/iconify';
import MembersRowCard from 'src/components/members/members-row-card';
import { fetchEmployeer, fetchGroupMembers } from 'src/redux/actions/group.action';
import EmptyRowCard from 'src/components/home/empty-row-card';
import VideosRowCard from 'src/components/video/video-row-card';
import DocsRowCard from 'src/components/docs/docs-box';



export default function DocsPage() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  
const videosData = [
  {id: 1, title: 'GENERAL CONTRACTORS (NEW)', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do iusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet.', tags: 'Psychology, Communication etc'},
]
const videosData2 = [
  {id: 1, title: 'GENERAL CONTRACTORS (NEW)', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do iusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet.', tags: 'Psychology, Communication etc'},
]



const allVideosData = videosData?.length ? (
  videosData.map(video => (
    <DocsRowCard 
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
const allVideosData2 = videosData2?.length ? (
  videosData2.map(video => (
    <DocsRowCard 
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
        <title> CMC | DOCS </title>
      </Helmet>
      <Container maxWidth="xl">
          {
        // isLoading ?
        // <Stack>
        // <Skeleton />
        // <Skeleton animation="wave" />
        // <Skeleton animation={false} />
        // </Stack>
        // :
        <>
        <h2 style={{fontWeight: 'normal'}}>{'LICENSE REQUIREMENTS'.toUpperCase()}</h2>
        {allVideosData}
        <h2 style={{fontWeight: 'normal'}}>{'PRE-APPROVED FORMS'.toUpperCase()}</h2>
        {allVideosData2}
        </>
      }
      </Container>
    </>
  );
}