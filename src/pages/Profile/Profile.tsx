import {
  Avatar,
  Box,
  Breadcrumbs,
  Input,
  InputLabel,
  Link,
  Paper,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import styles from './styles.module.scss';
import { useUserStore } from '../../app/store/useUserStore';

export default function Profile() {
  const { user, isAuthorized } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthorized) {
      navigate('/login');
    }
  }, [isAuthorized, navigate]);

  return (
    <Box component="section" className={styles.profile}>
      <div className="container">
        <Box component="div" className={styles.profile__wrapper}>
          <Box>
            <Breadcrumbs aria-label="breadcrumb">
              <Link underline="hover" color="inherit" href="/">
                Home
              </Link>
              <Typography sx={{ color: 'text.primary' }}>Profile</Typography>
            </Breadcrumbs>
            <Typography sx={{ fontSize: '36px', fontWeight: '600' }}>
              User Profile
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '50px',
              width: 'fit-content',
            }}
          >
            <Box sx={{ display: 'flex', gap: '50px' }}>
              <Paper
                sx={{
                  display: 'flex',
                  padding: '20px 50px',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    gap: '16px',
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: 'black',
                      color: 'white',
                      border: '1px solid white',
                      width: '150px',
                      height: '150px',
                      fontSize: '128px',
                    }}
                  >
                    {user?.firstName}
                  </Avatar>
                  <Typography sx={{ fontSize: '18px' }}>
                    {user?.firstName} {user?.lastName}
                  </Typography>
                </Box>
              </Paper>
              <Paper
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                  alignItems: 'center',
                  padding: '20px 50px',
                }}
              >
                <Typography sx={{ fontSize: '24px', fontWeight: '600' }}>
                  Account Info
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'end',
                    gap: '16px',
                  }}
                >
                  <InputLabel
                    htmlFor="email"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      fontSize: '16px',
                      color: 'black',
                    }}
                  >
                    Email
                    <Input
                      id="email"
                      sx={{
                        border: '1px solid black',
                        padding: '5px 10px',
                        borderRadius: '5px',
                        color: 'black',
                        '&.Mui-disabled': {
                          color: 'black',
                          borderColor: 'black',
                        },
                      }}
                      value={user?.email}
                      disabled
                      disableUnderline
                    />
                  </InputLabel>
                  <InputLabel
                    htmlFor="password"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      fontSize: '16px',
                      color: 'black',
                    }}
                  >
                    Password
                    <Input
                      type="password"
                      id="password"
                      sx={{
                        border: '1px solid black',
                        padding: '5px 10px',
                        borderRadius: '5px',
                        color: 'black',
                        '&.Mui-disabled': {
                          color: 'black',
                          borderColor: 'black',
                        },
                      }}
                      disableUnderline
                    />
                  </InputLabel>
                  <InputLabel
                    htmlFor="email"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      fontSize: '16px',
                      color: 'black',
                    }}
                  >
                    Re-Password
                    <Input
                      type="password"
                      id="email"
                      sx={{
                        border: '1px solid black',
                        padding: '5px 10px',
                        borderRadius: '5px',
                        color: 'black',
                        '&.Mui-disabled': {
                          color: 'black',
                          borderColor: 'black',
                        },
                      }}
                      disableUnderline
                    />
                  </InputLabel>
                </Box>
              </Paper>
            </Box>
            <Box>
              <Paper
                sx={{
                  padding: '20px 50px',
                  display: 'flex',
                  alignItems: 'start',
                  justifyContent: 'space-between',
                }}
              >
                <Typography sx={{ fontSize: '24px', fontWeight: '600' }}>
                  Personal Info
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'end',
                    gap: '16px',
                  }}
                >
                  <InputLabel
                    htmlFor="firstName"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      fontSize: '16px',
                      color: 'black',
                    }}
                  >
                    First Name
                    <Input
                      id="firstName"
                      sx={{
                        border: '1px solid black',
                        padding: '5px 10px',
                        borderRadius: '5px',
                        color: 'black',
                        '&.Mui-disabled': {
                          color: 'black',
                          borderColor: 'black',
                        },
                      }}
                      value={user?.firstName}
                      disableUnderline
                    />
                  </InputLabel>
                  <InputLabel
                    htmlFor="lastName"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      fontSize: '16px',
                      color: 'black',
                    }}
                  >
                    Last Name
                    <Input
                      id="lastName"
                      sx={{
                        border: '1px solid black',
                        padding: '5px 10px',
                        borderRadius: '5px',
                        color: 'black',
                        '&.Mui-disabled': {
                          color: 'black',
                          borderColor: 'black',
                        },
                      }}
                      value={user?.lastName}
                      disableUnderline
                    />
                  </InputLabel>
                  <InputLabel
                    htmlFor="phoneNumber"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      fontSize: '16px',
                      color: 'black',
                    }}
                  >
                    Phone Number
                    <Input
                      type="phoneNumber"
                      id="email"
                      sx={{
                        border: '1px solid black',
                        padding: '5px 10px',
                        borderRadius: '5px',
                        color: 'black',
                        '&.Mui-disabled': {
                          color: 'black',
                          borderColor: 'black',
                        },
                      }}
                      value={user?.phone}
                      disableUnderline
                    />
                  </InputLabel>
                  <InputLabel
                    htmlFor="birthDate"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      fontSize: '16px',
                      color: 'black',
                    }}
                  >
                    BirthDate
                    <Input
                      id="birthDate"
                      sx={{
                        border: '1px solid black',
                        padding: '5px 10px',
                        borderRadius: '5px',
                        color: 'black',
                        '&.Mui-disabled': {
                          color: 'black',
                          borderColor: 'black',
                        },
                      }}
                      value={user?.birthDate}
                      disableUnderline
                    />
                  </InputLabel>
                </Box>
              </Paper>
            </Box>
          </Box>
        </Box>
      </div>
    </Box>
  );
}
