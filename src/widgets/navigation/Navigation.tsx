import { Box, ListItem, ListItemButton, ListItemText } from '@mui/material';

import styles from './styles.module.scss';

const navItems = ['Home', 'About', 'Contact'];

export default function Navigation() {
  return (
    <Box component="section">
      <div className="container">
        <Box component="div" className={styles.navigation}>
          {navItems.map((item) => (
            <ListItem key={item} disablePadding>
              <ListItemButton sx={{ textAlign: 'center' }}>
                <ListItemText primary={item} />
              </ListItemButton>
            </ListItem>
          ))}
        </Box>
      </div>
    </Box>
  );
}
