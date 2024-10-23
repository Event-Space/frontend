import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

import { Footer, Header } from '../../widgets';

export default function RootLayout() {
  return (
    <div className="root-layout">
      <Header />
      <Box component="div">
        <Outlet />
      </Box>
      <Footer />
    </div>
  );
}
