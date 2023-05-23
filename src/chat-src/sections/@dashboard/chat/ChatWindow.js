import { useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Box, Divider, Grid, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fCurrency } from 'src/utils/formatNumber';


export default function ChatWindow() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { inboxDetails } = useSelector((state) => state.inbox);
  console.log("inboxDetails are:",inboxDetails)

  const randomMessage = () =>{
    const messageArray = ['Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an ','unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.','life changing seminar at 5pm on tuesday, dont miss out !']
 
   const randomSelector =  Math.floor(Math.random() * 3)
 
    return  messageArray[randomSelector]
  }

  return (
    <Stack sx={{ flexGrow: 1, minWidth: '1px' }}>
      <Divider />

      <Box sx={{ flexGrow: 1, display: 'flex', overflow: 'hidden' }}>
        <Stack sx={{ flexGrow: 1 }}>
          {/* <ChatMessageList conversation={conversation} /> */}
          <center><h4>{inboxDetails ? 'Message From:'+ inboxDetails:"No message selected"}</h4></center>
          <Divider />
          <Grid
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          sx={{pl: 4, pt: 5}}
        >
          {inboxDetails?
          <p style={{fontSize: '20px', margin: '10px 0'}}>Title:<span style={{color:"red"}}>{' '}{inboxDetails}</span> </p>
          :
          <p style={{fontSize: '20px', margin: '10px 0'}}>Click a message to View </p>
          }
         
         {inboxDetails &&
           <>
          <p style={{fontSize: '20px', margin: '10px 0'}}>Message Body: </p>
          <p style={{fontSize: '20px', margin: '10px 0'}}>{randomMessage()} </p>
          </>
          }
        </Grid>
          
        </Stack>

       {/* <h4>Chat Room</h4> */}
      </Box>
    </Stack>
  );
}
