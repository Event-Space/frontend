import { useNavigate } from 'react-router-dom';

export function useLogout() {
  const navigate = useNavigate();

  return () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    navigate('/login');
  };
}
