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
import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { Logo } from '../../shared/ui';
import { Locale } from '../../features/i18n';
import { useLogout } from '../../features/logout/Logout';

export default function Header() {
  const navigate = useNavigate();
  const logout = useLogout();

  const settings = [
    { text: 'Profile', action: () => console.log('Profile clicked') },
    { text: 'Account', action: () => console.log('Account clicked') },
    { text: 'Login Page', action: () => navigate('/login') },
    { text: 'Logout', action: logout },
  ];

  const [user, setUser] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      setUser(true);
      setUsername(localStorage.getItem('user') || '');
    } else setUser(false);
  }, []);

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
              {!user && (
                <>
                  <Link to="/login" className={styles.link}>
                    <Typography className={styles.signIn}>Sign In</Typography>
                  </Link>
                  <Link to="/register" className={styles.link}>
                    <Typography className={styles.signUp}>Sign Up</Typography>
                  </Link>
                </>
              )}
              {user && (
                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar sx={{ bgcolor: 'black' }}>N</Avatar>
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
                    <MenuItem onClick={handleCloseUserMenu}>
                      {username}
                    </MenuItem>
                    {settings.map((setting) => (
                      <MenuItem
                        key={setting.text}
                        onClick={handleCloseUserMenu}
                      >
                        <Button
                          sx={{ textAlign: 'center' }}
                          onClick={setting.action}
                        >
                          {setting.text}
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
