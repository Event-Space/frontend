import { Box } from '@mui/material';

import styles from './styles.module.scss';
import { BannerHome } from './components/BannerHome';
import { MakeEventBanner } from './components';

export default function Home() {
  return (
    <Box component="section">
      <div className="container">
        <Box component="div" className={styles.home}>
          <BannerHome />
        </Box>
      </div>
      <MakeEventBanner />
    </Box>
  );
}
