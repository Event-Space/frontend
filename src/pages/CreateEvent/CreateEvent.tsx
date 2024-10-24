import { useNavigate } from 'react-router-dom';
import { SetStateAction, useCallback, useEffect, useState } from 'react';
import {
  Input,
  InputLabel,
  TextareaAutosize,
  Typography,
  Button,
  Select,
  MenuItem,
  Box,
} from '@mui/material';
import { useUserStore } from '../../app/store/useUserStore';
import styles from './style.module.scss';
import { Space } from '../../entities';

export default function CreateEvent() {
  const { isAuthorized } = useUserStore();
  const navigate = useNavigate();
  const [location, setLocation] = useState('');
  const [spaces, setSpaces] = useState<Space[]>([]);

  const places = useCallback(async () => {
    const response = await fetch('https://zenuki.kz/api/v1/space', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Username or password is incorrect');
    }

    const data = await response.json();
    setSpaces(data);
  }, []);

  const handleChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setLocation(event.target.value);
  };

  useEffect(() => {
    if (!isAuthorized) {
      navigate('/login');
    }
    places();
  }, [isAuthorized, navigate, places]);

  return (
    <section className={styles.createEvent}>
      <div className="container">
        <Box className={styles.createEvent__wrapper}>
          <Typography
            sx={{ fontSize: '36px', fontWeight: '600', textAlign: 'center' }}
          >
            Create Event
          </Typography>

          <InputLabel
            sx={{
              color: 'black',
              fontSize: '16px',
              marginTop: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            Event Title
            <Input
              placeholder="Enter title"
              disableUnderline
              sx={{
                color: 'black',
                fontSize: '16px',
                border: '1px solid black',
                padding: '5px 10px',
                borderRadius: '5px',
              }}
            />
          </InputLabel>

          <InputLabel
            sx={{
              color: 'black',
              fontSize: '16px',
              marginTop: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            Location
            <Select
              value={location}
              onChange={handleChange}
              displayEmpty
              sx={{
                color: 'black',
                fontSize: '14px',
                border: '1px solid black',
                borderRadius: '5px',
              }}
            >
              <MenuItem value="">
                <em>Choose location</em>
              </MenuItem>
              {spaces.map((place) =>
                place.name ? (
                  <MenuItem key={place.id} value={place.name}>
                    {place.name}
                  </MenuItem>
                ) : null
              )}
            </Select>
          </InputLabel>

          <InputLabel
            sx={{
              color: 'black',
              fontSize: '16px',
              marginTop: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            Date
            <Input
              type="datetime-local"
              disableUnderline
              sx={{
                color: 'black',
                fontSize: '16px',
                border: '1px solid black',
                padding: '5px 10px',
                borderRadius: '5px',
              }}
            />
          </InputLabel>

          <Box>
            <Typography
              sx={{ fontSize: '24px', fontWeight: '600', marginTop: '40px' }}
            >
              Event Description
            </Typography>
            <TextareaAutosize
              minRows={6}
              placeholder="Event Description and additional services (entertainers, music, decor, etc.)"
              style={{
                width: '100%',
                padding: '10px',
                fontSize: '16px',
                marginTop: '20px',
                border: '1px solid black',
                borderRadius: '5px',
              }}
            />
          </Box>

          <Button
            variant="contained"
            color="primary"
            sx={{
              width: '100%',
              marginTop: '30px',
              padding: '10px 0',
              background: '#7848F4',
            }}
          >
            Create Event
          </Button>
        </Box>
      </div>
    </section>
  );
}
