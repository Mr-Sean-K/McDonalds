'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import MenuDrawer from '../components/MenuDrawer';
import MenuIcon from '@mui/icons-material/Menu';

export default function ManagerPage() {
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [selectedOrder, setSelectedOrder] = React.useState(null);

  const toggleDrawer = (newOpen) => () => setOpenDrawer(newOpen);

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedOrder(null);
  };

  // Example order data
  const orders = [
    { id: '12345', timestamp: '2025-12-06 12:34 PM', customerName: 'John Doe', email: 'john@example.com', products: ['Big Mac', 'Fries'], placedAt: '12:34 PM' },
    { id: '67890', timestamp: '2025-12-06 01:45 PM', customerName: 'Jane Smith', email: 'jane@example.com', products: ['McChicken', 'Sprite'], placedAt: '01:45 PM' },
  ];

  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        padding: '16px',
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* Top Section with Menu Drawer */}
      <Stack direction="row" spacing={2} sx={{ width: '100%', alignItems: 'center' }}>
        <Button onClick={toggleDrawer(true)} sx={{ minWidth: 'auto' }}>
          <MenuIcon />
        </Button>
        <MenuDrawer open={openDrawer} onClose={toggleDrawer(false)} />
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'red', flex: 1, textAlign: 'center' }}>
          Order Overview
        </Typography>
      </Stack>

      {/* Order List */}
      <Box sx={{ width: '100%', maxWidth: 400, marginTop: 4 }}>
        {orders.map((order) => (
          <Paper
            key={order.id}
            elevation={2}
            sx={{
              padding: 2,
              marginBottom: 2,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                Order ID: {order.id}
              </Typography>
              <Typography variant="body2" sx={{ color: '#666' }}>
                {order.timestamp}
              </Typography>
            </Box>
            <Button
              variant="text"
              sx={{ color: 'red', fontWeight: 'bold' }}
              onClick={() => handleOrderClick(order)}
            >
              View Order {'>'}
            </Button>
          </Paper>
        ))}
      </Box>

      {/* Dialog for Order Details */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'red' }}>
            Order Details
          </Typography>
          <Button onClick={handleCloseDialog} sx={{ minWidth: 'auto', padding: '4px' }}>
            <CloseIcon />
          </Button>
        </DialogTitle>
        <DialogContent>
          {selectedOrder && (
            <Box sx={{ padding: 2 }}>
              <Typography variant="body1" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                Order ID: {selectedOrder.id}
              </Typography>
              <Typography variant="body2" sx={{ marginBottom: 1 }}>
                Customer Name: {selectedOrder.customerName}
              </Typography>
              <Typography variant="body2" sx={{ marginBottom: 1 }}>
                Email: {selectedOrder.email}
              </Typography>
              <Typography variant="body2" sx={{ marginBottom: 1 }}>
                Products Ordered:
              </Typography>
              <Box sx={{ marginLeft: 2 }}>
                {selectedOrder.products.map((product, index) => (
                  <Typography key={index} variant="body2">
                    - {product}
                  </Typography>
                ))}
              </Box>
              <Typography variant="body2" sx={{ marginTop: 2 }}>
                Order Placed At: {selectedOrder.placedAt}
              </Typography>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}