import { Box, Button, Typography } from '@mui/material';

import { Link } from 'react-router-dom';
import styles from './styles.module.scss';
import { FacebookIcon, InstagramIcon, LinkedinIcon } from '../../shared/icons';

export default function Footer() {
  return (
    <Box component="section" className={styles.footer}>
      <div className="container">
        <Box component="div" className={styles.footer__wrapper}>
          <Box className={styles.buttom}>
            <Box>
              <Button
                sx={{
                  background: '#7848F4',
                  color: 'white',
                  textTransform: 'capitalize',
                }}
              >
                English
              </Button>
              <Button sx={{ color: 'white', textTransform: 'capitalize' }}>
                Русский
              </Button>
              <Button sx={{ color: 'white', textTransform: 'capitalize' }}>
                Қазақша
              </Button>
            </Box>
            <Box sx={{ display: 'flex', gap: '16px' }}>
              <Link to="/">
                <img src={LinkedinIcon} alt="linkedin" />
              </Link>
              <Link to="/">
                <img src={InstagramIcon} alt="instagram" />
              </Link>
              <Link to="/">
                <img src={FacebookIcon} alt="facebook" />
              </Link>
            </Box>
            <Typography className={styles.copyright}>
              Non Copyrighted © 2024 Upload by
              <Link to="/" className={styles.link}>
                Event Space
              </Link>
            </Typography>
          </Box>
        </Box>
      </div>
    </Box>
  );
}
