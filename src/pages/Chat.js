import { useEffect } from 'react';
// @mui
import { Card, Container } from '@mui/material';


import { ChatSidebar, ChatWindow } from '../chat-src/sections/@dashboard/chat';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInbox } from 'src/redux/actions/chat.action';
import { setInboxDetails } from 'src/redux/reducers/chat.slice';
import EmptyIMAGE from '../assets/images/empty-illustration.jpg'




export default function Chat() {
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
      <Container maxWidth={'xl'}>
        <Card sx={{ height: '72vh', display: 'flex' }}>
          <ChatSidebar />
          {inboxDetails != null ? <ChatWindow /> : <span style={{margin: '5%'}}><img src={EmptyIMAGE} /></span>}
        </Card>
      </Container>
  );
}
