import { useState } from 'react';
import { capitalCase } from 'change-case';
// @mui
import { Box, List, Stack, Select, Divider, Tooltip, MenuItem, Typography, IconButton } from '@mui/material';
// hooks
// components
import Iconify from '../../../components/Iconify';
import MyAvatar from '../../../components/MyAvatar';
import MenuPopover from '../../../components/MenuPopover';
import BadgeStatus from '../../../components/BadgeStatus';


export default function ChatAccount() {

  const [status, setStatus] = useState('online');

  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const ICON = {
    mr: 2,
    width: 20,
    height: 20,
  };

  return (
    <>
      <Box sx={{ position: 'relative' }}>
        <MyAvatar onClick={handleOpen} sx={{ cursor: 'pointer', width: 48, height: 48 }} />
        <BadgeStatus status={status} sx={{ position: 'absolute', bottom: 2, right: 2 }} />
      </Box>

    </>
  );
}
