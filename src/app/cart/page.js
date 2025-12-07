'use client';

import * as React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import MenuIcon from '@mui/icons-material/Menu';
import { useCart } from '../logic/cartLogic';
import MenuDrawer from '../components/MenuDrawer';
import Link from 'next/link';

export default function CartPage() {
  const { cart, removeItem, updateQuantity, cartTotal, clearCart, setCart } = useCart();
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = (nextOpen) => () => setOpen(nextOpen);

  React.useEffect(() => {
    const fetchCart = async () => {
      const response = await fetch('/api/cart');
      const result = await response.json();
      
      if(result.success && result.data && result.data.items) {
        setCart(result.data.items);
        console.log('Loaded cart from database');
      }
    };
    
    fetchCart();
  }, [setCart]);

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', padding: '16px', backgroundColor: '#fff', display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ width: '100%', maxWidth: 420, padding: 1.5, borderRadius: 3, paddingBottom: 12, border: '1px solid #e6e6e6' }}>
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Button onClick={toggleDrawer(true)} ><MenuIcon /></Button>
            <Typography variant="h6" sx={{ fontWeight: '600', color: 'red' }}>
              Review Your Order
            </Typography>
            <Box sx={{ width: 40 }} />
          </Box>
          <Divider />

          <List>
            {cart.length === 0 && (
              <Typography sx={{ color: '#666', textAlign: 'center', paddingY: 4 }}>
                Your cart is empty.
              </Typography>
            )}

            {cart.map((item) => (
              <ListItem key={item.name} sx={{ paddingY: 1, color: 'red', fontWeight: 'bold' }}>
                <ListItemAvatar>
                  <Avatar variant="square" src={item.image} alt={item.name} sx={{ width: 72, height: 56, borderRadius: 1 }} />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography sx={{ fontWeight: 'bold' }}>{item.name}</Typography>
                  }
                  secondary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginTop: 0.5 }}>
                      <Typography sx={{ color: '#666' }}>{item.price}</Typography>
                    </Box>
                  }
                />

                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1 }}>
                  <IconButton size="small" onClick={() => removeItem(item.name)} aria-label="remove">
                    <DeleteIcon />
                  </IconButton>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <TextField
                      size="small"
                      type="number"
                      inputProps={{ min: 1 }}
                      value={item.qty}
                      onChange={(e) => updateQuantity(item.name, Number(e.target.value) || 0)}
                      sx={{ width: 72 }}
                    />
                  </Box>
                </Box>
              </ListItem>
            ))}
          </List>

          {/* spacer to keep content above the fixed bar */}
          <Box sx={{ height: 88 }} />
        </Stack>
      </Box>

      <MenuDrawer open={open} onClose={toggleDrawer(false)} />

      {/* layered fixed boxes to contain price and checkout button */}
      <Box sx={{ position: 'fixed', left: '50%', transform: 'translateX(-50%)', bottom: 16, width: '100%', maxWidth: 420, px: 2, zIndex: 1400 }}>
        <Box sx={{ p: 1, border: '1px solid #e6e6e6', borderRadius: 1, backgroundColor: '#fff' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '100%' }}>
            <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography sx={{ color: '#666' }}>Total Price:</Typography>
              <Typography sx={{ fontWeight: 'bold', color: 'red', textAlign: 'right' }}>{cartTotal}</Typography>
            </Box>
            <Button variant="contained" sx={{ backgroundColor: 'red', color: 'white', border: '1px solid #ccc', paddingY: 1, width: '100%', mt: 1 }}>
              <Link href="/checkout">CONTINUE TO CHECKOUT</Link>
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}