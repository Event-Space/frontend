/* eslint-disable react/function-component-definition */
import { Typography } from '@mui/material';
import { FC } from 'react';
import styles from './style.module.css';
import { Space } from '../../../entities';

interface Props {
  interior: Space;
}

const InteriorItem: FC<Props> = ({ interior }) => {
  return (
    <div className={styles.carouselItem}>
      <img
        src={`https://zenuki.kz/api/v1/files/${interior.imageUrl}`}
        alt={interior.name}
      />
      <Typography
        className={styles.fff}
        sx={{ color: '#2F3438', fontWeight: 700, fontFamily: 'Inter' }}
      >
        {interior.name}
      </Typography>
    </div>
  );
};

export default InteriorItem;
