// import { yupResolver } from '@hookform/resolvers/yup';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Alert from '@mui/material/Alert';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { useNavigate } from 'react-router-dom';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';
import * as yup from 'yup';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import PersonIcon from '@mui/icons-material/Person';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
//import { submitLogin } from 'app/auth/store/loginSlice';
import { signin, logout } from 'src/redux/actions/auth.action';


//import { logoutSuccess } from 'redux/reducers/auth.slice';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  email: yup.string().email('You must enter a valid email').required('You must enter a email'),
  password: yup
    .string()
    .required('Please enter your password.')
    .min(4, 'Password is too short - should be 4 chars minimum.'),
});

const defaultValues = {
  email: '',
  password: '',
};

function LoginForm(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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


  function onSubmit(model) {
    // dispatch(submitLogin(model));
    const email = model.email;
    const password = model.password;
    const user = { email, password };
    dispatch(signin(user, navigate));
    
  }


  return (
    <div  style={{paddingLeft: '15%', paddingRight: '15%'}}>
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

      
      <form className="flex flex-col justify-center w-full" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField  style ={{width:"100%"}}
              {...field}
              className="mb-16"
              type="text"
              error={!!errors.email}
              helperText={errors?.email?.message}
              label="Email Account*"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <PersonIcon />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
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
        <Button
          style={{ borderRadius: '0.5rem',padding:"1rem"}}
          type="submit"
          variant="contained"
          color="primary"
          className="w-full mx-auto mt-16"
          aria-label="LOG IN"
          disabled={_.isEmpty(dirtyFields) || !isValid || isLoading}
          value="legacy"
        >
           {isLoading ? 'Loading...' : 'Login'}
        </Button>
      </form>
        
    </div>
  );
}

export default LoginForm;
