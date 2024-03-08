import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUserToken, addMarket } from '../context';
import { configs, GET_ACCESS_TOKEN_URL, GET_MARKET_URL } from '../api';
import { Layout } from '../view/Layout';
import { SearchInput, DisplayTracks, Popularity, Market } from '../components';
import { AppBar, Box, Divider, Drawer, IconButton, Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const drawerWidth = 180;

export default function App(props) {
  const dispatch = useDispatch();
  const { token_type, access_token } = useSelector(state => state.userToken);
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  // Define the useEffect hook to fetch the access token when the component mounts
  useEffect(() => {
    async function getAccessToken() {
      try {
        const response = await fetch(GET_ACCESS_TOKEN_URL, configs);
        const data = await response.json();
        if (response.ok) {
          dispatch(addUserToken(data));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAccessToken();
  }, [])// Empty dependency array ensures that this effect runs only once when the component mounts

  // Fetch markets data when access token is available
  useEffect(() => {
    async function getMarkets() {
      try {
        const response = await fetch(GET_MARKET_URL, {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            Authorization: `${token_type} ${access_token}`,
          }
        });
        const data = await response.json();
        if (response.ok) {
          dispatch(addMarket(data?.markets));
        }
      } catch (error) {
        console.log(error);
      }
    }
    if (access_token) {
      getMarkets();
    }
  }, [token_type, access_token])

  // Close the drawer
  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  // Handle drawer transition end
  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  // Toggle drawer visibility
  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <Box sx={{ p: 2, display: 'inline-flex', flexDirection: 'column', overflow: 'auto', width: '100%' }}>
        <Popularity />
        <Market />
      </Box>
    </div>
  );

  // Remove this const when copying and pasting into your project.
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Layout>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <SearchInput />
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 2, ml: { sm: `${drawerWidth}px` }, width: { sm: `calc(100% - ${drawerWidth}px)` }, position: 'relative' }}
      >
        <Toolbar />
        <DisplayTracks />
      </Box>
    </Layout>
  )
};