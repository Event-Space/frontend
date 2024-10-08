import { Box } from '@mui/material';

import styles from './styles.module.scss';

export default function Home() {
  return (
    <Box component="section">
      <div className="container">
        <Box component="div" className={styles.home} />
      </div>
    </Box>
  );
}
