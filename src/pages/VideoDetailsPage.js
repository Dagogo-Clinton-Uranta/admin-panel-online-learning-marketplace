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
import VideoDetailsBox from 'src/components/video/video-details-box';



export default function VideoDetailsPage() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { groupMembers, employeer, isLoading } = useSelector((state) => state.group);
  const groupData = location.state?.groupData;


  // useEffect(() => {
  //   dispatch(fetchGroupMembers(groupData?.members));
  //   dispatch(fetchEmployeer(user.employeerID));
  // }, [])

  console.log("GROUP MEMBERS: ", groupMembers);
  console.log("Employeer: ", employeer);
  const myCoolerMembers = groupMembers?.length ? (
    groupMembers.map(member => {
      console.log("MEMBER: ", member);
      const timestampInSeconds = member?.accountCreated?.seconds;
      const timestampInMilliseconds = timestampInSeconds * 1000 + Math.floor(member?.accountCreated?.nanoseconds / 1000000);
      const date = new Date(timestampInMilliseconds);
      const dateString = date.toLocaleString();
      return (
       <>
        <VideosRowCard 
        videoId={groupData.id}
        title={groupData.title} 
        desc={groupData.desc}
        tags={groupData.tags}
      />
        </>
      )
    })
  ) : 
  <EmptyRowCard msg={"No video data."}/>

  return (
    <>
      <Helmet>
        <title> CMC | VIDEO-DETAILS </title>
      </Helmet>
      <Container maxWidth="xl">
          {
              <>
              <VideosRowCard 
              videoId={groupData.id}
              title={groupData.title} 
              desc={groupData.desc}
              tags={groupData.tags}
              isDetail={true}
            />
            <VideoDetailsBox />
              </>

    //     isLoading ?
    //     <Stack>
    //     <Skeleton />
    //     <Skeleton animation="wave" />
    //     <Skeleton animation={false} />
    //     </Stack>
    //     :
    //     <VideosRowCard 
    //     videoId={groupData.id}
    //     title={groupData.title} 
    //     desc={groupData.desc}
    //     tags={groupData.tags}
    //   />
      }
      </Container>
    </>
  );
}