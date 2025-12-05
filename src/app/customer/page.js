'use client'

import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from 'next/link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Paper from '@mui/material/Paper';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';


const menuData = {
  Burgers: [
    { name: 'Big Mac', price: '€4.99', image: '/images/bigMac.png', description: 'Two all-beef patties, special sauce, lettuce, cheese, pickles, onions on a sesame seed bun.' },
    { name: 'McChicken', price: '€2.49', image: '/images/mcChicken.png', description: 'Crispy chicken patty with lettuce and mayo on a toasted bun.' },
    { name: 'Quarter Pounder', price: '€4.49', image: '/images/quarterPounder.png', description: 'A fresh beef patty topped with cheese, pickles, onions and mustard.' },
  ],
  Sides: [
    { name: 'Fries', price: '€2.99', image: '/images/fries.png', description: 'Golden, crispy French fries seasoned to perfection.' },
    { name: 'Hashbrowns', price: '€1.99', image: '/images/hashBrown.png', description: 'Crispy, golden hash browns perfect for breakfast.' },
    { name: 'Fruit Bag', price: '€2.50', image: '/images/fruitBag.png', description: 'Assorted fresh fruits including apples, grapes, and berries.' },
  ],
  Drinks: [
    { name: 'Coke', price: '€2.49', image: '/images/coke.png', description: 'Ice-cold Coca-Cola. Refreshing taste you love.' },
    { name: 'Fanta', price: '€2.49', image: '/images/fanta.png', description: 'Vibrant Fanta with bold fruit flavors.' },
    { name: 'Sprite', price: '€2.49', image: '/images/sprite.png', description: 'Crisp, clean, and refreshing lemon-lime flavor.' },
  ],
};
 

export default function CustomerPage() {
  const [open, setOpen] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState(null);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [cart, setCart] = React.useState([]);

  const toggleDrawer = (newOpen) => () => setOpen(newOpen);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedProduct(null);
  };

  const handleAddToCart = () => {
    if (selectedProduct) {
      // Add item to cart. If exists, increment qty.
      setCart((prev) => {
        const existing = prev.find((p) => p.name === selectedProduct.name);
        if (existing) {
          return prev.map((p) => p.name === selectedProduct.name ? { ...p, qty: p.qty + 1 } : p);
        }
        return [...prev, { ...selectedProduct, qty: 1 }];
      });
    }
    handleCloseModal();
  };

  // Helper to compute cart total (numbers from strings like '€4.99')
  const cartTotal = React.useMemo(() => {
    const total = cart.reduce((sum, item) => {
      const num = Number(String(item.price).replace(/[^0-9.,]/g, '').replace(',', '.')) || 0;
      return sum + num * (item.qty || 1);
    }, 0);
    return `€${total.toFixed(2)}`;
  }, [cart]);

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {['McMenu', 'View Cart'].map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Log Out'].map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ width: '100%', height: '100vh', padding: '16px', backgroundColor: '#fff', display: 'flex', flexDirection: 'column' }}>
      <Stack spacing={8} direction="row">
        <Button onClick={toggleDrawer(true)}>Open drawer</Button>
        <Drawer open={open} onClose={toggleDrawer(false)}>
          {DrawerList}
        </Drawer>
        <Typography variant="h4" align="center" gutterBottom sx={{ color: 'red', fontWeight: 'bold' }}>
          THE MCMENU
        </Typography>
      </Stack>
      <List
        sx={{
          width: '100%',
          flex: 1,
          bgcolor: 'background.paper',
          position: 'relative',
          overflow: 'auto',
          '& ul': { padding: 0 },
        }}
        subheader={<li />}
      >
        {Object.entries(menuData).map(([categoryName, items]) => (
          <li key={categoryName}>
            <ul>
              <ListSubheader sx={{ color: 'red', fontWeight: 'bold' }}>{categoryName}</ListSubheader>
              {items.map((item) => (
                <ListItem 
                  key={item.name} 
                  onClick={() => handleProductClick(item)}
                  sx={{ 
                    display: 'flex', 
                    gap: '12px', 
                    alignItems: 'center', 
                    color: 'red',
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: '#f5f5f5',
                    }
                  }}
                >
                  <Box
                    component="img"
                    src={item.image}
                    alt={item.name}
                    sx={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '4px',
                      objectFit: 'cover',
                      flexShrink: 0,
                    }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <ListItemText primary={item.name} />
                  </Box>
                  <Typography sx={{ color: 'red', fontWeight: 'bold', minWidth: '50px', textAlign: 'right' }}>
                    {item.price}
                  </Typography>
                </ListItem>
              ))}
            </ul>
          </li>
        ))}
      </List>

        /* Product Dialog on click */
      <Dialog open={modalOpen} onClose={handleCloseModal} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ color: 'red', fontWeight: 'bold' }}>
            Product Details
          </Typography>
          <Button onClick={handleCloseModal} sx={{ minWidth: 'auto', padding: '4px' }}>
            <CloseIcon />
          </Button>
        </DialogTitle>
        <DialogContent>
          {selectedProduct && (
            <Stack spacing={3} sx={{ mt: 2 }}>
              <Box
                component="img"
                src={selectedProduct.image}
                alt={selectedProduct.name}
                sx={{
                  width: '100%',
                  height: '300px',
                  borderRadius: '8px',
                  objectFit: 'cover',
                }}
              />
              <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'red' }}>
                {selectedProduct.name}
              </Typography>
              <Typography variant="body1" sx={{ color: '#666' }}>
                {selectedProduct.description}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" sx={{ color: 'red', fontWeight: 'bold' }}>
                  {selectedProduct.price}
                </Typography>
                <Button 
                  variant="contained" 
                  sx={{ backgroundColor: 'red', color: 'white', fontWeight: 'bold' }}
                  onClick={handleAddToCart}
                >
                  ADD TO CART
                </Button>
              </Box>
            </Stack>
          )}
        </DialogContent>
      </Dialog>
      /* Bottom Cart Button */
      <Box
        sx={{
          position: 'fixed',
          left: 16,
          right: 16,
          bottom: 16,
          zIndex: 1400,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Paper sx={{ display: 'flex', alignItems: 'center', width: '100%', maxWidth: 600, padding: '8px 12px' }} elevation={6}>
          <Button onClick={toggleDrawer(true)} sx={{ backgroundColor: 'white', textTransform: 'none' }}>
            GO TO CART
          </Button>
          <Box sx={{ flex: 1 }} />
          <Typography sx={{ fontWeight: 'bold', color: 'red', marginRight: 1 }}>{cartTotal}</Typography>
        </Paper>
      </Box>
    </Box>
  );
}