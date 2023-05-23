import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  searchInput: {
    border: '1px solid #2F2F2F',
    padding: '10px',
    borderRadius: '8px',
    // marginRight: theme.spacing(2),
    width: '100%',
    minWidth: '90%',
    '& .MuiInputBase-input': {
      color: 'grey',
    },
    '& .MuiInputBase-input::placeholder': {
      color: 'grey',
    },
    '& .MuiInput-underline:before': {
      borderBottomColor: 'grey',
    },
    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
      borderBottomColor: 'grey',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'grey',
    },
  },
  searchButton: {
    color: '#fff',
    padding: '15px',
    marginLeft:'-10px',
    height:'56px',
    borderBottomLeftRadius:'0px',
    borderTopLeftRadius:'0px',
    minWidth: '45%',
    backgroundColor: 'black',
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
}));

export default function CustomSearchBar({}) {
  const classes = useStyles();
  const history = useNavigate();

  return (
    <div className={classes.root}>
      <TextField
        placeholder="Type in a video name"
        className={classes.searchInput}
        InputProps={{
          disableUnderline: true,
        }}
      />
      <Button variant="contained" className={classes.searchButton}
      onClick={() => {
        
      }}
      >
        Search
      </Button>
    </div>
  );
}
