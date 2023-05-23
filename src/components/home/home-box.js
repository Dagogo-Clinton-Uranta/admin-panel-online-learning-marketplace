import * as React from 'react';
import Typography from '@mui/material/Typography';
// import Title from './title';
import { Divider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'




export default function HomeBox({type, BoxIcon, url}) {
 const navigate = useNavigate();
  return (
    <>
      {/* <Title>...........................<span className='wave'>💸</span></Title> */}
      <Divider />
      <br/><br/>
      <center>
      <BoxIcon />
      <br/><br/>
      <Link color="primary" to={url} state={{type: type}}>
        <Typography
            color="textPrimary"
            variant="h6"
            component="p"
          >
        <b>{type}</b> 
      </Typography>
      </Link>
      </center>
      {/* <div>
        <Link color="primary" to="/transactions" onClick={preventDefault}>
          View
        </Link>
      </div> */}
    </>
  );
}