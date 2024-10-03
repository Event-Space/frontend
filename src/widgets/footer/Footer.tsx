import { Box, Typography } from '@mui/material';

import { Link } from 'react-router-dom';
import styles from './styles.module.scss';
import { Navigation } from '../navigation';

export default function Footer() {
  return (
    <Box component="section" className={styles.footer}>
      <div className="container">
        <Box component="div" className={styles.footer__wrapper}>
          <Navigation />
          <Typography className={styles.copyright}>
            Non Copyrighted © 2024 Upload by{' '}
            <Link to="/" className={styles.link}>
              Event Space
            </Link>
          </Typography>
        </Box>
      </div>
    </Box>
  );
}
