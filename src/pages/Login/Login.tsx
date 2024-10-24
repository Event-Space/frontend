import { Box, Button, Typography } from '@mui/material';

import { useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';
import LoginForm from './components/LoginForm/LoginForm';
import { Logo } from '../../shared/ui';
import RightSection from './components/RightSection/RightSection';

export default function Login() {
  const navigate = useNavigate();
  return (
    <Box component="section" className={styles.login}>
      <Box component="div" className={styles.leftSection}>
        <div className="container">
          <Box className={styles.login__wrapper}>
            <Box>
              <Button onClick={() => navigate('/')}>Back</Button>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '20vh',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Logo />
              </Box>
              <Box component="div" className={styles.loginInfo}>
                <Typography sx={{ fontWeight: '700', fontSize: '38px' }}>
                  Sign In to Event Space
                </Typography>
                <LoginForm />
              </Box>
            </Box>
          </Box>
        </div>
      </Box>
      <RightSection />
    </Box>
  );
}
