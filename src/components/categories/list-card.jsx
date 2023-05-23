import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LockIcon from '@mui/icons-material/Lock';
import { Button } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  row: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  text: {
    width: '80%',
    color: 'grey',
  },
  button: {
    width: '20%',
    marginLeft: 'auto',
  },
}));

const ListRowCard = ({data,index}) => {
  const classes = useStyles();

  return (
    <div className={classes.row}>
      <div className={classes.text}>
        <div style={{ color: 'black' }}>
          <b>{ `${index + 1}.) `/*data.id*/} {data && data.title} --</b>
        </div>{' '}
        <span style={{ marginLeft: '20px' }}>{data && data.details}</span>
      </div>
<Button variant="contained" style={{minHeight: '45px', minWidth: '145px', backgroundColor: 'black', }}>
              &nbsp;&nbsp;
              <b><span>Watch</span></b> 
            <LockIcon />
     </Button>
    </div>
  );
};

export default ListRowCard;
