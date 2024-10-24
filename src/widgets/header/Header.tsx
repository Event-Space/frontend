import React, { useState, useContext } from 'react';
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';
import { Logo } from '../../shared/ui';
import { Locale } from '../../features/i18n';
import {
  HomeIcon,
  LogoutIcon,
  NotificationsIcon,
  OrdersIcon,
  ProfileIcon,
  SpacesIcon,
} from '../../shared/icons';
import { UserContext } from '../../app/store/useUserStore';

export default function Header() {
  const navigate = useNavigate();
  const { user, isAuthorized, logout: contextLogout } = useContext(UserContext);

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const settings = [
    {
      text: 'Home',
      action: () => {
        handleCloseUserMenu();
        navigate('/');
      },
      icon: <HomeIcon />,
    },
    {
      text: 'Orders',
      action: () => {
        handleCloseUserMenu();
        navigate('/orders');
      },
      icon: <OrdersIcon />,
    },
    {
      text: 'Spaces',
      action: () => {
        handleCloseUserMenu();
        navigate('/spaces');
      },
      icon: <SpacesIcon />,
    },
    {
      text: 'Notifications',
      action: () => {
        handleCloseUserMenu();
        navigate('/notifications');
      },
      icon: <NotificationsIcon />,
    },
    {
      text: 'Profile',
      action: () => {
        handleCloseUserMenu();
        navigate('/profile');
      },
      icon: <ProfileIcon />,
    },
    {
      text: 'Logout',
      action: () => {
        handleCloseUserMenu();
        contextLogout();
      },
      icon: <LogoutIcon />,
    },
  ];

  return (
    <Box component="section">
      <div className="container">
        <Box component="div" className={styles.header}>
          <Box component="div" className={styles.locale}>
            <Locale />
          </Box>
          <Box component="div" className={styles.headerWrapper}>
            <Box>
              <Logo />
            </Box>
            <Box className={styles.auth}>
              {!isAuthorized ? (
                <>
                  <Link to="/login" className={styles.link}>
                    <Typography className={styles.signIn}>Sign In</Typography>
                  </Link>
                  <Link to="/register" className={styles.link}>
                    <Typography className={styles.signUp}>Sign Up</Typography>
                  </Link>
                </>
              ) : (
                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar sx={{ bgcolor: 'black' }}>
                        {user?.firstName?.charAt(0).toUpperCase() || 'U'}
                      </Avatar>
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <MenuItem
                      onClick={handleCloseUserMenu}
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderBottom: '1px solid gray',
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: '16px',
                          fontWeight: '600',
                          color: '#1976d2',
                          textTransform: 'capitalize',
                        }}
                      >
                        {user?.firstName || 'User'} {user?.lastName || ''}
                      </Typography>
                    </MenuItem>
                    {settings.map((setting) => (
                      <MenuItem key={setting.text}>
                        <Button
                          sx={{
                            textAlign: 'center',
                            display: 'flex',
                            gap: '10px',
                          }}
                          onClick={setting.action}
                        >
                          {setting.icon} {setting.text}
                        </Button>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </div>
    </Box>
  );
}
