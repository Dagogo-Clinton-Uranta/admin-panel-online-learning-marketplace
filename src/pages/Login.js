import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import { darken } from '@material-ui/core/styles/colorManipulator';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link  /*,Redirect */} from 'react-router-dom';
import LoginForm from '../components/new-login/login-form';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Container } from '@mui/material';

import logo from "../assets/images/bridgetech_s.png"

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '20px 40px 0px 40px',
    background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${darken(
      theme.palette.primary.dark,
      0.5
    )} 100%)`,
    color: theme.palette.primary.contrastText,
  },
  leftSection: {},
  rightSection: {
    background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${darken(
      theme.palette.primary.dark,
      0.5
    )} 100%)`,
    color: theme.palette.primary.contrastText,
  },
}));

function Login() {
  const classes = useStyles();
  const [selectedTab, setSelectedTab] = useState(0);
  //const { isAuth } = useSelector((state) => state.login);

  function handleTabChange(event, value) {
    setSelectedTab(value);
  }

  
  /*if (isAuth) return <Redirect to={'/candidates'}/>*/
  return (
    <div
      className={clsx(
        classes.root,
        // 'flex flex-col flex-auto items-center justify-center flex-shrink-0 p-16 md:p-24'
        'flex flex-col flex-auto items-center justify-center flex-shrink-0 p-16 md:p-24'
      )}
    >
      
      <motion.div
        initial={{ opacity: 0, scale: 0.6, height: "100vh", borderLeft: '20' }}
        animate={{ opacity: 1, scale: 1, height: "100vh"}}
        // className="flex w-full max-w-400 md:max-w-3xl m-16 md:m-24 rounded-20 shadow-2xl overflow-hidden"
        // class="flex w-full max-w-400 md:max-w-3xl m-16 md:m-24 rounded-l rounded-tl rounded-bl shadow-2xl overflow-hidden"
        class="flex w-full max-w-400 md:max-w-3xl m-16 md:m-24 shadow-2xl overflow-hidden"
      >
              {/* //first flex */}
      <Card
        style={{marginBottom: '10%', border: '0px solid green'}}
          className={clsx(
            classes.leftSection,
            'flex flex-col w-full max-w-xs  items-center justify-center shadow-0 rounded-tl-20 rounded-bl-20 rounded-r-none'
            // 'flex flex-col w-full max-w-sm  items-center justify-center shadow-0 rounded-20'
          )}
          square
        >
          <CardContent className="flex flex-col items-center justify-center w-full py-96 max-w-320">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.2 } }}
            >
              <div className="flex items-center mb-48">
                <img className="logo-icon w-48 mr-4" src={logo} alt="logo" />
                <div className="border-l-1 mr-4 w-1 h-40" />
                <div>
                  <Typography className="text-24 font-semibold logo-text" color="inherit">
                    <b>CMC</b>
                  </Typography>
                  <Typography
                     className="text-16 tracking-widest -mt-8 font-bold"
                     style={{ fontFamily: 'Poppins, sans-serif' }}
                     color="textSecondary"
                  >
                    <b>NETWORK</b>
                  </Typography>
                </div>
              </div>
            </motion.div>


           <LoginForm />
          </CardContent>
            <br/>
          <div className="flex flex-col items-center justify-center pb-32">
            <div>
              <span className="font-normal mr-8">Don't have an account?</span>
              <Link className="font-normal" to="/register" style={{color: '#A9D6EE'}}>
                Register
              </Link>
            </div>
            {/* <Link className="font-normal mt-8" to="/">
              Back to Dashboard
            </Link> */}
          </div>
        </Card>


      {/* //second flex */}
        <div
         style={{border: '0px solid red', height: '80vh'}}
          className={clsx(
            classes.rightSection,
            'hidden md:flex flex-1 items-center justify-center p-64'
          )}
        >
          <div className="max-w-320">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
            >
              <Typography variant="h3" color="inherit" style={{ fontFamily: 'Poppins, Roboto, "Helvetica Neue", Arial, sans-serif;', fontWeight: 'bold' }} className="font-semibold leading-tight">
                Welcome <br />
                to <br /> 
                <div>CMC NETWORK!</div>
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.3 } }}
            >
              <Typography variant="subtitle1" style={{ fontFamily: 'Poppins, Roboto, "Helvetica Neue", Arial, sans-serif;', fontWeight: 'normal' }} color="inherit" className="mt-32">
              We're on a mission to help MBE & WBE Contractors grow.
               
                <ul style={{listStyle: "square", color:"#FFFFF", marginLeft:"40px"}}>
                <li style={{marginTop:"5px"}}>Connect with other Contractors and more in our Community.</li>
                <li style={{marginTop:"5px"}}>Apply to our Foundation Program & Project Matching.</li>
               
                
               </ul>
              </Typography>
            </motion.div>
          </div> 
        </div>
      </motion.div>
    </div>
  );
}

export default Login;
