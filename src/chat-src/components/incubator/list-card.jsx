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

const ListRowCard = ({data}) => {
  const classes = useStyles();

  return (
    <div className={classes.row}>
      <div className={classes.text}>
        <span style={{ color: 'black' }}>
          <b>{data.id}. {data.title}</b>
        </span>{' '}
        {data.desc}
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
