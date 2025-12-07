'use client'

import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from 'next/link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemText from '@mui/material/ListItemText';
import MenuDrawer from '../components/MenuDrawer';
import Paper from '@mui/material/Paper';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCart } from '../logic/cartLogic';


export default function CustomerPage() {
  const [open, setOpen] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState(null);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [menuData, setMenuData] = React.useState({});
  const { cart, addItem, cartTotal } = useCart();

  React.useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('/api/customer');
      const result = await response.json();
      
      if(result.success && result.data) {
        // group products by category
        const grouped = result.data.reduce((acc, product) => {
          const category = product.category || 'Other';
          if (!acc[category]) {
            acc[category] = [];
          }
          acc[category].push({
            name: product.name,
            price: product.price,
            image: product.image,
            description: product.description
          });
          return acc;
        }, {});
        setMenuData(grouped);
        console.log('Loaded products from database');
      }
    };
    
    fetchProducts();
  }, []);

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
      addItem(selectedProduct);
    }
    handleCloseModal();
  };

  const handleSaveCart = async () => {
    const response = await fetch('/api/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cart: cart, total: cartTotal })
    });
    
    const result = await response.json();
    if(result.success) {
      alert('Cart saved to database!');
      console.log('Cart saved!', result.data);
    } else {
      alert('Failed to save cart');
    }
  };

  return (
    <Box sx={{ width: '100%', height: '100vh', padding: '16px', backgroundColor: '#fff', display: 'flex', flexDirection: 'column' }}>
      <Stack spacing={8} direction="row">
        <Button onClick={toggleDrawer(true)}><MenuIcon /></Button>
        <MenuDrawer open={open} onClose={toggleDrawer(false)} />
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
        {Object.keys(menuData).length === 0 ? (
          <Typography sx={{ color: '#666', textAlign: 'center', paddingY: 4 }}>
            Loading menu...
          </Typography>
        ) : (
          Object.entries(menuData).map(([categoryName, items]) => (
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
          ))
        )}
      </List>

        {/* Product Dialog on click */}
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
      {/* Bottom Cart Button */}
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
          <Button component={Link} href="/cart" sx={{ backgroundColor: 'white', textTransform: 'none' }}>
          <ShoppingCartIcon /> GO TO CART 
          </Button>
          <Box sx={{ flex: 1 }} />
          <Typography sx={{ fontWeight: 'bold', color: 'red', marginRight: 1 }}>{cartTotal}</Typography>
          <Button onClick={handleSaveCart} variant="contained" sx={{ backgroundColor: 'red', color: 'white' }}> {/* adds selected product to cart db */}
            SAVE CART
          </Button>
        </Paper>
      </Box>
    </Box>
  );
}