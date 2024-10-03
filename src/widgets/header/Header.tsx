import { Avatar, Box, Typography } from '@mui/material';

import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { Logo } from '../../shared/ui';
import { Locale } from '../../features/i18n';

export default function Header() {
  const [user, setUser] = useState<boolean>(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) setUser(true);
  }, [token]);

  return (
    <Box component="section">
      <div className="container">
        <Box component="div" className={styles.header}>
          <Box component="div" className={styles.locale}>
            <Locale />
          </Box>
          <Box component="div" className={styles.headerWrapper}>
            <Logo />
            <Typography>Client Page</Typography>
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
              {user && <Avatar sx={{ bgcolor: 'black' }}>N</Avatar>}
            </Box>
          </Box>
        </Box>
      </div>
    </Box>
  );
}
