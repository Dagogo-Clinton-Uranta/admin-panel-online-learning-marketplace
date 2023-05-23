import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, Grid, Button, Avatar } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../iconify';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { signup, uploadImage } from 'src/redux/actions/auth.action';
import { notifySuccessFxn } from 'src/utils/toast-fxn';


const schema = Yup.object().shape({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().required('Required')
  });


export default function RegisterForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [fname, setFName] = useState('');
  const [lname, setLName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [employeer, setEmployeer] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedFile, setSelectedFile] = useState({selectedFile: [], selectedFileName: []});
  const [file, setFile] = useState();

  const handleselectedFile = event => {
    setSelectedFile({
        selectedFile: event.target.files[0],
        selectedFileName: event.target.files[0].name
    });
    setFile(URL.createObjectURL(event.target.files[0]));
};
  

  const userSignup = (e) => {
    e.preventDefault();
    setLoading(true);
    const user = {fname, lname, email, employeer, password};
    console.log("USER: ", user);
    dispatch(signup(user, navigate, setLoading)); 
  }


  // const userSignup = (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   const user = {fname, lname, email, password};
  //   dispatch(uploadImage(user, selectedFile.selectedFile, navigate, setLoading)); 
  // }

  return (
    <>
      <form onSubmit={userSignup}>
      <Stack spacing={3}>
        <TextField name="fname" required label="First Name" value={fname} onChange={(e) => setFName(e.target.value)}/>
        <TextField name="lname" required label="Last Name" value={lname} onChange={(e) => setLName(e.target.value)}/>
        <TextField name="email" required label="Email address" type="email" onChange={(e) => setEmail(e.target.value)}/>
        <TextField name="employeer" required label="Employeer No." type="number" onChange={(e) => setEmployeer(e.target.value)}/>

        <TextField
          name="password"
          label="Password"
          required
          type={showPassword ? 'text' : 'password'}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
          {/* <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
          >
          <Avatar
              alt="Profile Picture"
              src={file}
              sx={{ width: 56, height: 56 }}
            />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <center>
              <Button
              // fullWidth
              variant="contained"
              component="label"
              style={{backgroundColor: 'black', height:"40px", width: '100%',  fontSize:"15px"}}
            >
              UPLOAD PROFILE PIC
              <input
              type="file"
              style={{ display: 'none' }}
              // hidden
              required
              onChange={handleselectedFile}
              />
            </Button>
            <p>{selectedFile?.selectedFileName}</p>
            </center>
          </Grid> */}
        
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" disabled={loading}>
        {loading ? "Loading..." : "Register"}
      </LoadingButton>
      </form>
    </>
  );
}
