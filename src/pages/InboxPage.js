import { Helmet } from 'react-helmet-async';
import { Grid, Container, Typography, Paper, Button, Stack, Skeleton } from '@mui/material';

// components
// import Settings from '../chat-src/components/settings';
import RtlLayout from '../chat-src/components/RtlLayout';
import NotistackProvider from '../chat-src/components/NotistackProvider';
import ThemeColorPresets from '../chat-src/components/ThemeColorPresets';
import ThemeLocalization from '../chat-src/components/ThemeLocalization';
import MotionLazyContainer from '../chat-src/components/animate/MotionLazyContainer';
import Chat from './Chat';


export default function InboxPage() {
  return (
    <>
      <Helmet>
        <title> CMC | INBOX </title>
      </Helmet>

      <Container maxWidth="xl">
      {/* <ThemeProvider>
      <ThemeColorPresets>
        <ThemeLocalization>
          <RtlLayout>
            <NotistackProvider>
              <MotionLazyContainer> */}
      <Chat />
      {/* </MotionLazyContainer>
            </NotistackProvider>
          </RtlLayout>
        </ThemeLocalization>
      </ThemeColorPresets>
    </ThemeProvider> */}
      </Container>
    </>
  );
}
