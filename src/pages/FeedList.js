import { useEffect } from 'react';
// @mui
import { Card, Container } from '@mui/material';


import { ChatWindow } from '../chat-src/sections/@dashboard/chat';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInbox } from 'src/redux/actions/chat.action';
import { setInboxDetails } from 'src/redux/reducers/chat.slice';
import EmptyIMAGE from '../assets/images/empty-illustration.jpg'
import FeedSidebar from 'src/chat-src/sections/@dashboard/chat/FeedSidebar';



export default function FeedList() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { inboxDetails } = useSelector((state) => state.inbox);

  
  useEffect(() => {
    dispatch(setInboxDetails(null));
  }, [])
  

  useEffect(() => {
    dispatch(fetchInbox(user?.id))
  }, [user])

  return (
      <Container maxWidth={'lg'} >
        <Card sx={{ height: '72vh', width:"100%"/*maxWidth: {xl:1100,lg:900,md:800,sm:650}*/ ,display: 'flex',gap:"1%",margin: 'auto' }}>
          <FeedSidebar />
          { inboxDetails === null ? <ChatWindow /> :<ChatWindow /> /*<span style={{margin: '5%'}}><img src={EmptyIMAGE} /></span>*/}
        </Card>
      </Container>
  );
}
