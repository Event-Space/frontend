import { Link, useNavigate } from 'react-router-dom';
import { ChangeEvent, useCallback, useState } from 'react';
import { Box, Button, FormControl, Typography } from '@mui/material';
import styles from './styles.module.scss';

export default function LoginForm() {
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>();
  const navigate = useNavigate();

  const handleLoginChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setLogin(e.target.value);
      if (error) setError('');
    },
    [error]
  );

  const handlePasswordChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
      if (error) setError('');
    },
    [error]
  );

  const onSubmit = useCallback(async () => {
    const response = await fetch('https://server.kenuki.org/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        emailOrUsername: login,
        password,
      }),
    });

    if (!response.ok) {
      setError('Username or password is incorrect');
    } else {
      const data = await response.json();
      const { accessToken, refreshToken } = data;
      if (accessToken) {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('user', login);
        navigate('/');
      }
    }
  }, [login, navigate, password]);

  const isFormValid = login.trim() !== '' && password.trim() !== '';

  return (
    <FormControl required className={styles.loginForm}>
      <label htmlFor="login" className={styles.inputForm}>
        <Typography sx={{ fontWeight: '600' }}>YOUR LOGIN</Typography>
        <input
          type="text"
          placeholder="Enter your login"
          value={login}
          onChange={handleLoginChange}
          style={{ border: error ? '1px solid red' : 'none' }}
        />
      </label>
      <label htmlFor="password" className={styles.inputForm}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <Typography sx={{ fontWeight: '600' }}>YOUR PASSWORD</Typography>
          <Link to="/forgot" className={styles.forgot}>
            <Typography>Forgot your password?</Typography>
          </Link>
        </Box>
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          value={password}
          onChange={handlePasswordChange}
          style={{ border: error ? '1px solid red' : 'none' }}
        />
        <Typography sx={{ color: 'red' }}>{error}</Typography>
      </label>
      <Box className={styles.signIn}>
        <Button
          className={styles.signInButton}
          disabled={!isFormValid}
          onClick={onSubmit}
        >
          Sign In
        </Button>
      </Box>
    </FormControl>
  );
}
