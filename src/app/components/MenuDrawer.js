'use client'

import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function MenuDrawer({ open, onClose }) {
  const [accType, setAccType] = React.useState(null);
  const router = useRouter();

  React.useEffect(() => {
    const storedAccType = sessionStorage.getItem('acc_type');
    setAccType(storedAccType);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('acc_type');
    sessionStorage.removeItem('username');
    router.push('/login');
  };

  const menuItems = [
    { text: 'McMenu', href: '/customer' },
    { text: 'View Cart', href: '/cart' }
  ];

  return (
    <Drawer open={open} onClose={onClose}>
      <Box sx={{ width: 250 }} role="presentation" onClick={onClose}>
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton component={Link} href={item.href}>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
          {accType === 'manager' && (
            <ListItem disablePadding>
              <ListItemButton component={Link} href="/manager">
                <ListItemText primary="Manager" />
              </ListItemButton>
            </ListItem>
          )}
        </List>
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={handleLogout}>
              <ListItemText primary="Log Out" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}

MenuDrawer.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};
