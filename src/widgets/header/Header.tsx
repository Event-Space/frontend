import React, { useState } from 'react';
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
import { useUserStore } from '../../app/store/useUserStore';
import {
  HomeIcon,
  LogoutIcon,
  NotificationsIcon,
  OrdersIcon,
  ProfileIcon,
  SpacesIcon,
} from '../../shared/icons';

export default function Header() {
  const navigate = useNavigate();
  const { user, isAuthorized, logout: contextLogout } = useUserStore();

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
      action: () => navigate('/'),
      icon: HomeIcon,
    },
    {
      text: 'Orders',
      action: () => navigate('/orders'),
      icon: OrdersIcon,
    },
    {
      text: 'Events',
      action: () => navigate('/event'),
      icon: SpacesIcon,
    },
    {
      text: 'Spaces',
      action: () => navigate('/space'),
      icon: SpacesIcon,
      role: ['MANAGER', 'ADMIN'],
    },
    {
      text: 'Notifications',
      action: () => navigate('/notifications'),
      icon: NotificationsIcon,
    },
    {
      text: 'Profile',
      action: () => navigate('/profile'),
      icon: ProfileIcon,
    },
    { text: 'Logout', action: contextLogout, icon: LogoutIcon },
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
              {!isAuthorized && (
                <>
                  <Link to="/login" className={styles.link}>
                    <Typography className={styles.signIn}>Sign In</Typography>
                  </Link>
                  <Link to="/register" className={styles.link}>
                    <Typography className={styles.signUp}>Sign Up</Typography>
                  </Link>
                </>
              )}
              {isAuthorized && (
                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar sx={{ bgcolor: 'black' }}>
                        {user?.email.charAt(0).toUpperCase() || 'U'}
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
                        {user?.email}
                      </Typography>
                    </MenuItem>
                    {settings.map((setting) => {
                      if (
                        setting.role &&
                        user?.role &&
                        setting.role.includes(user.role)
                      ) {
                        return (
                          <MenuItem key={setting.text}>
                            <Button
                              sx={{
                                textAlign: 'center',
                                display: 'flex',
                                gap: '10px',
                              }}
                              onClick={setting.action}
                            >
                              <img src={setting.icon} alt="icon" />{' '}
                              {setting.text}
                            </Button>
                          </MenuItem>
                        );
                      }
                      if (!setting.role) {
                        return (
                          <MenuItem key={setting.text}>
                            <Button
                              sx={{
                                textAlign: 'center',
                                display: 'flex',
                                gap: '10px',
                              }}
                              onClick={setting.action}
                            >
                              <img src={setting.icon} alt="icon" />{' '}
                              {setting.text}
                            </Button>
                          </MenuItem>
                        );
                      }
                      return null;
                    })}

                    <MenuItem
                      onClick={handleCloseUserMenu}
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderTop: '1px solid gray',
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: '14px',
                          fontWeight: '400',
                          color: '#1976d2',
                        }}
                      >
                        {user?.role}
                      </Typography>
                    </MenuItem>
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
