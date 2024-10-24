import { Box, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { MakeEventBanner, RegisterBanner, BannerHome } from './components';
import { Space } from '../../entities';

export default function Home() {
  const [spaces, setSpaces] = useState<Space[]>([]);

  const places = useCallback(async () => {
    const response = await fetch('https://zenuki.kz/api/v1/space', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch spaces');
    }

    const data = await response.json();
    setSpaces(data);
  }, []);

  useEffect(() => {
    setSpaces([]);
    places();
  }, [places]);

  return (
    <Box component="section">
      <div className="container">
        <Box component="div" className={styles.home}>
          <BannerHome />
        </Box>
      </div>
      <MakeEventBanner />
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '32px',
          padding: '20px 10%',
        }}
      >
        {spaces.map((place) =>
          place.imageUrl ? (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid black',
              }}
            >
              <img
                key={place.id} // Ensure unique key for each image
                src={`https://zenuki.kz/api/v1/files/${place.imageUrl}`}
                alt={place.name} // Use a meaningful alt attribute
                className={styles.spaceImage} // Optionally style the image
              />
              <Typography sx={{ fontSize: '16px', color: 'black' }}>
                {place.name}
              </Typography>
            </Box>
          ) : null
        )}
      </Box>
      <RegisterBanner />
    </Box>
  );
}
