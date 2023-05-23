import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Box, Stack, Drawer, IconButton } from '@mui/material';
// hooks
import useResponsive from '../../../hooks/useResponsive';

// components
import Iconify from '../../../components/Iconify';
import Scrollbar from '../../../components/Scrollbar';
//
import ChatAccount from './ChatAccount';
// import ChatSearchResults from './ChatSearchResults';
// import ChatContactSearch from './ChatContactSearch';
// import ChatConversationList from './ChatConversationList';
import InboxListItem from './InboxListItem';
import { useSelector } from 'react-redux';

// ----------------------------------------------------------------------

const ToggleButtonStyle = styled((props) => <IconButton disableRipple {...props} />)(({ theme }) => ({
  left: 0,
  zIndex: 9,
  width: 32,
  height: 32,
  position: 'absolute',
  top: theme.spacing(13),
  borderRadius: `0 12px 12px 0`,
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.primary.main,
  boxShadow: theme.customShadows.primary,
  '&:hover': {
    backgroundColor: theme.palette.primary.darker,
  },
}));

// ----------------------------------------------------------------------

const SIDEBAR_WIDTH = 320;
const SIDEBAR_COLLAPSE_WIDTH = 96;

export default function ChatSidebar() {
  const theme = useTheme();

  const navigate = useNavigate();

  const { pathname } = useLocation();

  const [openSidebar, setOpenSidebar] = useState(true);

  const [searchQuery, setSearchQuery] = useState('');

  const [searchResults, setSearchResults] = useState([]);

  const [isSearchFocused, setSearchFocused] = useState(false);

  // const { conversations, activeConversationId } = useSelector((state) => state.chat);

  const { user } = useSelector((state) => state.auth);
  const { inboxMessages } = useSelector((state) => state.inbox);

  const isDesktop = useResponsive('up', 'md');

  const displayResults = searchQuery && isSearchFocused;

  const isCollapse = isDesktop && !openSidebar;

  useEffect(() => {
    if (!isDesktop) {
      return handleCloseSidebar();
    }
    return handleOpenSidebar();
  }, [isDesktop, pathname]);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (!openSidebar) {
      return setSearchFocused(false);
    }
  }, [openSidebar]);

  const handleOpenSidebar = () => {
    setOpenSidebar(true);
  };

  const handleCloseSidebar = () => {
    setOpenSidebar(false);
  };

  const handleToggleSidebar = () => {
    setOpenSidebar((prev) => !prev);
  };


  const renderContent = (
    <>
      <Box sx={{ py: 2, px: 3 }}>
        {/* <Stack direction="row" alignItems="center" justifyContent="center">
          {!isCollapse && (
            <>
              <ChatAccount />
              <Box sx={{ flexGrow: 1 }} />
            </>
          )}

          <IconButton onClick={handleToggleSidebar}>
            <Iconify
              width={20}
              height={20}
              icon={openSidebar ? 'eva:arrow-ios-back-fill' : 'eva:arrow-ios-forward-fill'}
            />
          </IconButton>

          {!isCollapse && (
            <IconButton onClick={() => {}}>
              <Iconify icon={'eva:edit-fill'} width={20} height={20} />
            </IconButton>
          )}
        </Stack> */}

      </Box>
       {console.log("displayResults: ", displayResults)}
      <Scrollbar>
          {/* <ChatConversationList
            conversations={conversations}
            isOpenSidebar={openSidebar}
            activeConversationId={activeConversationId}
           sx={{ ...(isSearchFocused && { display: 'none' }) }}
          /> */}
          <InboxListItem inboxMessages={inboxMessages} user={user} />
      </Scrollbar>
    </>
  );

  return (
    <>
      {!isDesktop && (
        <ToggleButtonStyle onClick={handleToggleSidebar}>
          <Iconify width={16} height={16} icon={'eva:people-fill'} />
        </ToggleButtonStyle>
      )}

      {isDesktop ? (
        <Drawer
          open={openSidebar}
          variant="persistent"
          sx={{
            width: SIDEBAR_WIDTH,
            transition: theme.transitions.create('width'),
            '& .MuiDrawer-paper': {
              position: 'static',
              width: SIDEBAR_WIDTH,
            },
            ...(isCollapse && {
              width: SIDEBAR_COLLAPSE_WIDTH,
              '& .MuiDrawer-paper': {
                width: SIDEBAR_COLLAPSE_WIDTH,
                position: 'static',
                transform: 'none !important',
                visibility: 'visible !important',
              },
            }),
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          ModalProps={{ keepMounted: true }}
          open={openSidebar}
          onClose={handleCloseSidebar}
          sx={{
            '& .MuiDrawer-paper': { width: SIDEBAR_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </>
  );
}
