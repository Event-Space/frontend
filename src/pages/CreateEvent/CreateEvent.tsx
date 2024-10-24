import { useNavigate } from 'react-router-dom';
import { SetStateAction, useEffect, useState } from 'react';
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

export default function CreateEvent() {
  const { isAuthorized } = useUserStore();
  const navigate = useNavigate();
  const [location, setLocation] = useState('');

  const places = [
    { id: 1, name: 'New York' },
    { id: 2, name: 'Los Angeles' },
    { id: 3, name: 'Chicago' },
    { id: 4, name: 'Houston' },
    { id: 5, name: 'Phoenix' },
  ];

  const handleChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setLocation(event.target.value);
  };

  useEffect(() => {
    if (!isAuthorized) {
      navigate('/login');
    }
  }, [isAuthorized, navigate]);

  return (
    <section className={styles.createEvent}>
      <div className="container">
        <div className={styles.createEvent__wrapper}>
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
              {places.map((place) => (
                <MenuItem key={place.id} value={place.name}>
                  {place.name}
                </MenuItem>
              ))}
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
        </div>
      </div>
    </section>
  );
}
