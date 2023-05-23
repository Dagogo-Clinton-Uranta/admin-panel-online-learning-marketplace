import { useState } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton, Popover, Grid } from '@mui/material';
// mocks_
import account from '../../../_mock/account';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from 'src/redux/actions/auth.action';
import { useNavigate } from 'react-router-dom';
import randomGuy from 'src/assets/images/random-guy.jpg'

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const [open, setOpen] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar src={user?user.imageUrl:randomGuy} alt="photoURL" />
      </IconButton>
      <ArrowDropDownIcon sx={{color: 'black'}} onClick={handleOpen}/>
      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            // width: 180,
            width: 200,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <Grid sx={{mt: 1, ml: 1}}>
          <Avatar src={user?user.imageUrl:randomGuy} alt="photoURL" />
          </Grid>
          <Box sx={{ my: 1.5, px: 1 }}>
          <Typography variant="subtitle2" noWrap>
            {user?user.firstName + " " + user.lastName:"Globus Contractors"}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {user?user.email:'ut1@cmc.com'}
          </Typography>
        </Box>
        </Grid>


        <Divider sx={{ borderStyle: 'dashed' }} />

        {/* <MenuItem sx={{ pt: 1 }}>
          Accounts
        </MenuItem>
        <Divider />
        <Stack sx={{color: '#828D9F' }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem key={option.label} onClick={handleClose}>
              {option.label}
            </MenuItem>
          ))}
        </Stack> */}

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={() => dispatch(logout(navigate))} sx={{ m: 1 }} >
          Logout
        </MenuItem>
      </Popover>
    </>
  );
}
