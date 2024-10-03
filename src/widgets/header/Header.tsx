import { Box, Typography } from '@mui/material';

import { Link } from 'react-router-dom';
import styles from './styles.module.scss';
import { Logo } from '../../shared/ui';
import { Locale } from '../../features/i18n';

export default function Header() {
  return (
    <Box component="section">
      <div className="container">
        <Box component="div" className={styles.header}>
          <Box component="div" className={styles.locale}>
            <Locale />
          </Box>
          <Box component="div" className={styles.headerWrapper}>
            <Logo />
            <Box className={styles.auth}>
              <Link to="/login" className={styles.link}>
                <Typography className={styles.signIn}>Sign In</Typography>
              </Link>
              <Link to="/register" className={styles.link}>
                <Typography className={styles.signUp}>Sign Up</Typography>
              </Link>
            </Box>
          </Box>
        </Box>
      </div>
    </Box>
  );
}
