//import { yupResolver } from '@hookform/resolvers/yup';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Alert from '@mui/material/Alert';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { useNavigate } from 'react-router-dom';
import InputAdornment from '@material-ui/core/InputAdornment';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigation } from 'react-router-dom';
//import { submitRegister } from 'app/auth/store/registerSlice';
import * as yup from 'yup';
import _ from 'lodash';
import { signup } from 'src/redux/actions/auth.action';
//import { db, fb } from '../../../../../config/firebase';
//import { logoutSuccess } from 'redux/reducers/auth.slice';

import PersonIcon from '@mui/icons-material/Person';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import {AiOutlineArrowRight} from 'react-icons/ai';
import {AiOutlineArrowLeft} from 'react-icons/ai';


import {MdOutlineBusinessCenter} from 'react-icons/md';
import {AiOutlineMail} from 'react-icons/ai';
import {IoPersonOutline} from 'react-icons/io';
import {AiOutlinePhone} from 'react-icons/ai';
import {GiStethoscope} from 'react-icons/gi';
import {AiOutlineFlag} from 'react-icons/ai';
import {FaCity} from 'react-icons/fa';
import {BsBuildings} from 'react-icons/bs';
import {BsPersonPlus} from 'react-icons/bs';



const schema = yup.object().shape({
  // displayName: yup.string().required('You must enter display name'),
  bName: yup.string().required('You must enter your business name'),
  fName: yup.string().required('You must enter first name'),
  lName: yup.string().required('You must enter last name'),
  phone: yup.number().required('You must enter phone number'),
  email: yup.string().email('You must enter a valid email').required('You must enter a email'),
  password: yup
    .string()
    .required('Please enter your password.')
    .min(8, 'Password is too short - should be 8 chars minimum.'),
  passwordConfirm: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
});

const defaultValues = {
  // displayName: '',
  bName:'',
  fName: '',
  lName: '',
  phone: '',
  email: '',
  password: '',
  passwordConfirm: '',
  regType:'',
  state:'',
  city:'',
  country:'',
  industry:'',
  companySize:'',
  certified:'',
};

function RegisterForm(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [advisorChecked, setAdvisorChecked] = useState(false);
  const [contractorChecked, setContractorChecked] = useState(true);
  const [regType,setRegType] = useState('contractor')
  const [certified,setCertified] =useState(false)
  const [phase1,setPhase1] = useState(true)
  const [phase2,setPhase2] = useState(false)
  const [visited,setVisited] = useState(false)

  //const dispatch = useDispatch();

  const chooseContractor  = () => {
    setContractorChecked(true)
    setAdvisorChecked(false)
 }

 const chooseAdvisor = () => {
   setContractorChecked(false)
    setAdvisorChecked(true)
   
 }


 const swapDecoyButton = () => {
   setPhase1(false)
   setPhase2(true)
   setVisited(true)
   
 }

 const changePageTo2= () => {
  setPhase1(false)
  setPhase2(true)
 }

 const changePageTo1= () => {
  setPhase1(true)
  setPhase2(false)
 }


  const { control, setValue, formState, handleSubmit, reset, trigger, setError } = useForm({
    mode: 'onChange',
    defaultValues,
    // resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  const [showPassword, setShowPassword] = useState(false);

  // const { isLoading, error } = useSelector( (state) => state.login);
  const isLoading = false;
  const error = '';


  //ONSUBMIT AND USER SIGN UP FOLLOW THE SAME MODEL

  function onSubmit(model) {
    // dispatch(submitLogin(model));
    const email = model.email;
    const password = model.password;
    const user = { email, password };
    //dispatch(signin(user, history));
    
  }

  function userSignup(model) {
    // dispatch(submitRegister(model));

    // const name = model.displayName;
    const fName = model.fName;
    const lName = model.lName;
    const bName = model.bName;
    //const regType = model.regType;
    const state = model.state;
    const city  = model.city;
    const country = model.country;
    const industry = model.industry;
    const companySize = model.companySize;
    //const certified = model.certified;

    const name = fName + ' ' + lName;
    const email = model.email;
    const phone = model.phone;
    const password = model.password;
    const user = { fName,
                  lName,
                   email,
                   phone,
                   password,
                   bName,
                   regType,
                   state,
                   city,
                   country,
                   certified,
                   industry,
                  companySize
                 };
   // navigate('/dashboard/home')
    // console.log("THIS IS USER",user)
    dispatch(signup(user, navigate));
  }


  return (
    <div  style={{paddingLeft: '15%', paddingRight: '15%' , position:"relative",top:"-5rem",scale:"0.85"}}>
       
       
       {phase2 && <span style={{ display:"flex",alignItems:"center",gap:"10px",position:"relative",top:"8rem"}} onClick={changePageTo1} ><AiOutlineArrowLeft/> Back</span>}
       {phase1 && visited &&  <span style={{ display:"flex",alignItems:"center",gap:"10px",position:"relative",top:"8rem",float:"right"}} onClick={changePageTo2} >Next <AiOutlineArrowRight/></span>}

         
        
        <h2 style={{position:"relative",top:"10rem"}}>Registration {phase2 && "(2)"}</h2>
       
       
        {error && <div><Alert
        severity="error" color="error"
        action={
          <Button color="inherit" size="small" style={{ fontSize: '15px' }} onClick={() => {/*dispatch(logoutSuccess())*/}}>
            <b>X</b>
          </Button>
        }
      >
        <p style={{ fontSize: '11px' }}><b>{error}</b></p>
      </Alert><br/></div>}

         
      <form className="flex flex-col justify-center w-full"
       style={{}}
      onSubmit={handleSubmit(userSignup)}>
    {phase1 && 
     <>
      <Controller
          name="bName"
          control={control}
          render={({ field }) => (
            <TextField style = {{width:"100%"}}
              {...field}
              // value={name}
              // onChange={(e) => setName(e.target.value)}
              className="mb-16"
              type="text"
              label="Business name"
              error={!!errors.bName}
              helperText={errors?.bName?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Icon className="text-20" color="action">
                    <MdOutlineBusinessCenter/>

                 <BsPersonPlus/>
                    </Icon>
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              required
            />
          )}
        /> 

          <br/>
         
          <Controller
          name="fName"
          control={control}
          render={({ field }) => (
            <TextField style ={{width:"100%"}}
              {...field}
              // value={name}
              // onChange={(e) => setName(e.target.value)}
              className="mb-16"
              type="text"
              label="First name"
              error={!!errors.fName}
              helperText={errors?.fName?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Icon className="text-20" color="action">
                     <BsPersonPlus/>
                    </Icon>
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              required
            />
          )}
        />
          <br/>

          <Controller
          name="lName"
          control={control}
          render={({ field }) => (
            <TextField style ={{width:"100%"}}
              {...field}
              // value={name}
              // onChange={(e) => setName(e.target.value)}
              className="mb-16"
              type="text"
              label="Last name"
              error={!!errors.lName}
              helperText={errors?.lName?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Icon className="text-20" color="action">
                     <BsPersonPlus/>
                    </Icon>
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              required
            />
          )}
        />
          <br/>

          <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField style ={{width:"100%"}}
              {...field}
              // value={email}
              // onChange={(e) => setEmail(e.target.value)}
              className="mb-16"
              type="text"
              error={!!errors.email}
              helperText={errors?.email?.message}
              label="Email"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Icon className="text-20" color="action">
                   
                   <AiOutlineMail/>

                    </Icon>
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              required
            />
          )}
        />
          <br/>

          <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <TextField style ={{width:"100%"}}
              {...field}
              // value={email}
              // onChange={(e) => setEmail(e.target.value)}
              className="mb-16"
              type="text"
              error={!!errors.phone}
              helperText={errors?.phone?.message}
              label="Phone"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Icon className="text-20" color="action">
                 <AiOutlinePhone/>
                    </Icon>
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              required
            />
          )}
        />
          <br/>

          <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField style ={{width:"100%"}}
              {...field}
              className="mb-16"
              label="Password"
              type="password"
              error={!!errors.password}
              helperText={errors?.password?.message}
              variant="outlined"
              InputProps={{
                className: 'pr-2',
                type: showPassword ? 'text' : 'password',
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      
                        {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              required
            />
          )}
        />
          <br/>

        
    
     <br/>

     <Button
    style= {{display:`${phase1?'block':'none'}`,padding:"0.9rem",borderRadius: '0.5rem',backgroundColor:"black",color:"white"}}
          type="button"
          onClick ={swapDecoyButton}
          variant="contained"
          //color="primary"
          className="w-full mx-auto mt-16"
          aria-label="REGISTER"
          /*disabled={ !isValid  || isLoading}*/
          value="legacy"
        >
          {/*isLoading ? 'Loading...' :*/ 'Register'}
        </Button>
    </>
   }
       
  {/*==================== THE SECOND PART OF THE FORM ======================= */}     
       
  { phase2 &&
  <>

<FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label"
       style={{marginBottom:"1rem"}}>
        Registration Type
        </FormLabel>

      <RadioGroup style={{marginBottom:"1rem", paddingLeft:"1rem"}}
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel value="Contractor" control={<Radio />} style={{ paddingLeft:"1rem"}} label="Contractor" checked={contractorChecked} onClick={chooseContractor}/>
        <FormControlLabel value="Advisor" control={<Radio />} style={{ paddingLeft:"1rem"}}  label="Trusted Advisor" checked={advisorChecked} onClick={chooseAdvisor}/>
       
      </RadioGroup>
   </FormControl>

  
  <Controller
          name="state"
          control={control}
          render={({ field }) => (
            <TextField style ={{width:"100%"}}
              {...field}
              // value={name}
              // onChange={(e) => setName(e.target.value)}
              className="mb-16"
              type="text"
              label="State"
              error={!!errors.state}
              helperText={errors?.state?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Icon className="text-20" color="action">
                      <BsPersonPlus/>
                    </Icon>
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              required
            />
          )}
        />

   <br/>
<Controller
          name="city"
          control={control}
          render={({ field }) => (
            <TextField  style ={{width:"100%"}}
              {...field}
              // value={name}
              // onChange={(e) => setName(e.target.value)}
              className="mb-16"
              type="text"
              label="City"
              error={!!errors.city}
              helperText={errors?.city?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Icon className="text-20" color="action">
                   

                     <FaCity/>

                    </Icon>
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              required
            />
          )}
        />

<br/>
<Controller
          name="country"
          control={control}
          render={({ field }) => (
            <TextField  style ={{width:"100%"}}
              {...field}
              // value={name}
              // onChange={(e) => setName(e.target.value)}
              className="mb-16"
              type="text"
              label="Country"
              error={!!errors.country}
              helperText={errors?.country?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Icon className="text-20" color="action">
              
                    <AiOutlineFlag/>
                    </Icon>
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              required
            />
          )}
        />

<br/>
<Controller
          name="industry"
          control={control}
          render={({ field }) => (
            <TextField  style ={{width:"100%"}}
              {...field}
              // value={name}
              // onChange={(e) => setName(e.target.value)}
              className="mb-16"
              type="text"
              label="Industry"
              error={!!errors.industry}
              helperText={errors?.industry?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Icon className="text-20" color="action">
                    
                 <GiStethoscope/>
                    </Icon>
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              required
            />
          )}
        />

     <br/>
<Controller
          name="companySize"
          control={control}
          render={({ field }) => (
            <TextField  style ={{width:"100%"}}
              {...field}
              // value={name}
              // onChange={(e) => setName(e.target.value)}
              className="mb-16"
              type="text"
              label="Company Size"
              error={!!errors.companySize}
              helperText={errors?.companySize?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Icon className="text-20" color="action">
                    

                  <BsBuildings/>

                    </Icon>
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              required
            />
          )}
        />


  <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label"
     style={{marginTop:"1rem",marginBottom:"1rem"}} >
        Are you a certified MBE/WBE?
      </FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        style={{marginBottom:"1rem", paddingLeft:"1rem"}}
      >
        <FormControlLabel value={true} style={{ paddingLeft:"1rem"}} control={<Radio />} label="Yes" onClick={() =>{setCertified(true)}}/>
        <FormControlLabel value={false} style={{ paddingLeft:"1rem"}} control={<Radio />} label="No"  onClick={() =>{setCertified(false)}} />
       
      </RadioGroup>
   </FormControl>

    <Button
         style= {{display:`${phase2?'block':'none'}`,padding:"0.9rem",borderRadius: '0.5rem',backgroundColor:"black",color:"white"}}
          type="submit"
          variant="contained"
          //color="primary"
          className="w-full mx-auto mt-16"
          aria-label="SUBMIT"
         /* disabled={_.isEmpty(dirtyFields) || !isValid  || isLoading}*/
          value="legacy"
        >
          {/*isLoading ? 'Loading...' :*/ 'Submit'}
        </Button>


</>
 }
 
      </form>
        
    </div>
  );
}

export default RegisterForm;
