import PropTypes from 'prop-types';
import { NavLink as RouterLink } from 'react-router-dom';
// @mui
import { Box, List, ListItemText } from '@mui/material';
//
import { StyledNavItem, StyledNavItemIcon } from './styles';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import SavingsIcon from '@mui/icons-material/Savings';
import MessageIcon from '@mui/icons-material/Message';
import SettingsIcon from '@mui/icons-material/Settings';
// ----------------------------------------------------------------------

NavSection.propTypes = {
  data: PropTypes.array,
};

export default function NavSection({ data = [], ...other }) {
  return (
    <Box {...other}>
      <List disablePadding sx={{ p: 1 }}>
        {data.map((item) => (
          <>
          <NavItem key={item.title} item={item}/>
           {
             item?.children?.map((c) => (
              <SubNavItem key={c.title} item={c}/>
            ))
           }
          </>
        ))}
      </List>
    </Box>
  );
}

// ----------------------------------------------------------------------

NavItem.propTypes = {
  item: PropTypes.object,
};

function NavItem({ item }) {
  const { title, path, icon, iconLabel, info } = item;

  return (
    <StyledNavItem
      component={RouterLink}
      to={path}
      sx={{
        '&.active': {
          color: 'black',
          // bgcolor: '#66000000',
          backgroundColor: path != '#' && 'black',
          fontWeight: 'fontWeightBold',
        },
      }}
    >
      {iconLabel != 'msg' && iconLabel != 'settings' && <StyledNavItemIcon sx={{color: 'white', fontSize: '20px' ,
       '&.active': { color: 'black', backgroundColor: 'white',fontWeight: 'fontWeightBold' },}}>
    {icon && icon}</StyledNavItemIcon>}
      {iconLabel === 'msg' && <StyledNavItemIcon sx={{color: 'black', fontSize: '20px'}}><MessageIcon /></StyledNavItemIcon>}
      {iconLabel === 'settings' && <StyledNavItemIcon sx={{color: 'black', fontSize: '20px'}}><SettingsIcon /></StyledNavItemIcon>}
     
      {/* {iconLabel != 'msg' && iconLabel != 'settings' && <StyledNavItemIcon sx={{color: '#FFFFFF', fontSize: '20px'}}>{icon && icon}</StyledNavItemIcon>}
      {iconLabel === 'msg' && <StyledNavItemIcon sx={{color: '#FFFFFF', fontSize: '20px'}}><MessageIcon /></StyledNavItemIcon>}
      {iconLabel === 'settings' && <StyledNavItemIcon sx={{color: '#FFFFFF', fontSize: '20px'}}><SettingsIcon /></StyledNavItemIcon>} */}

      <ListItemText disableTypography primary={title} sx={{color: '#FFFFFF', fontSize: '18px'}}/>

      {info && info}
    </StyledNavItem>
  );
}
function SubNavItem({ item }) {
  const { title, path, icon, info } = item;

  return (
      <StyledNavItem
      component={RouterLink}
      to={path}
      sx={{
        '&.active': {
          // color: 'black',
          // bgcolor: '#66000000',
          backgroundColor: path != '#' && 'black',
          fontWeight: 'fontWeightBold',
        },
      }}
    >
      {/* <StyledNavItemIcon sx={{color: '#FFFFFF', fontSize: '20px'}}>{icon && icon}</StyledNavItemIcon> */}
      <StyledNavItemIcon sx={{color: '#FFFFFF', fontSize: '18px', ml: 5}}>
        {/* {icon === 'LockIcon' && <LockIcon />}
        {icon === 'LockOpen' && <LockOpenIcon />}
        {icon === 'Savings' && <SavingsIcon />} */}
      </StyledNavItemIcon>

      <ListItemText disableTypography primary={title} sx={{color: '#FFFFFF', fontSize: '15px'}}/>

      {info && info}
    </StyledNavItem>
  );
}
