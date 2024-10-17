import { Box, Button, Typography } from '@mui/material';
import styles from './styles.module.scss';
import { BannerMakeEvent } from '../../../../shared/images';

export default function MakeEventBanner() {
  return (
    <Box className={styles.makeEventBanner}>
      <img src={BannerMakeEvent} alt="make event banner" />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          padding: '25px 0px',
        }}
      >
        <Typography
          sx={{ color: 'white', fontSize: '36px', fontWeight: '600' }}
        >
          Make your own Event{' '}
        </Typography>
        <Typography
          sx={{ color: 'white', fontSize: '18px', fontWeight: '300' }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.{' '}
        </Typography>
        <Button
          sx={{
            color: 'white',
            fontSize: '18px',
            background: '#7848F4',
            borderRadius: '5px',
            width: '60%',
          }}
        >
          Create Events
        </Button>
      </Box>
    </Box>
  );
}
