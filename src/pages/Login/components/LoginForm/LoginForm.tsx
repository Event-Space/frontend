import { Link, useNavigate } from 'react-router-dom';
import { ChangeEvent, useCallback, useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Typography,
} from '@mui/material';
import styles from './styles.module.scss';
import { useUserStore } from '../../../../app/store/useUserStore';

export default function LoginForm() {
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const { login: userLogin } = useUserStore();
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
    if (!login || !password) {
      setError('Login and password are required');
      return;
    }

    setLoading(true);
    try {
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
        throw new Error('Username or password is incorrect');
      }

      const data = await response.json();
      const { accessToken, refreshToken } = data;

      if (accessToken) {
        await userLogin(accessToken, refreshToken);
        navigate('/');
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [login, password, userLogin, navigate]);

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
        {error && <Typography sx={{ color: 'red' }}>{error}</Typography>}
      </label>
      <Box className={styles.signIn}>
        <Button
          className={styles.signInButton}
          disabled={!isFormValid || loading}
          onClick={onSubmit}
        >
          {loading ? <CircularProgress size={24} /> : 'Sign In'}{' '}
        </Button>
      </Box>
    </FormControl>
  );
}
