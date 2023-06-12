import { Helmet } from 'react-helmet-async';
import { Grid, Container} from '@mui/material';
import Post from '../components/feed/post'
import FeedList from './FeedList';

export default function FeedPage() {
  return (
    <>
      <Helmet>
        <title> CMC | FEED </title>
      </Helmet>
    
      <Container maxWidth="xl">
      <h1 style={{position:"relative",fontWeight:"bold",left:"6%",marginBottom:"40px",fontSize:"30px"}}>Feed</h1>
  <Grid container spacing={2} style={{display:"flex",justifyContent:"center",alignItems:"center", border: '0px solid red',width:"1300px", paddingLeft: '40px', paddingRight: '40px'}}>
 
    <Post />
    <FeedList />
    </Grid>


      </Container>
    </>
  );
}
