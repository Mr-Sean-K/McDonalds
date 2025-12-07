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
  const [orders, setOrders] = React.useState([]);

  React.useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch('/api/manager');
      const result = await response.json();
      
      if(result.success && result.data) {
        setOrders(result.data);
        console.log('Loaded orders from database');
      }
    };
    
    fetchOrders();
  }, []);

  const toggleDrawer = (newOpen) => () => setOpenDrawer(newOpen);

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedOrder(null);
  };


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
      {/* Top Section with Title and Menu Drawer*/}
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
        {orders.length === 0 ? (
          <Typography sx={{ color: '#666', textAlign: 'center', paddingY: 4 }}>
            No orders found.
          </Typography>
        ) : (
          orders.map((order) => (
            <Paper
              key={order._id}
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
                  {order.customerName}
                </Typography>
                <Typography variant="body2" sx={{ color: '#666' }}>
                  {order.timestamp ? new Date(order.timestamp).toLocaleString() : 'N/A'}
                </Typography>
                <Typography variant="body2" sx={{ color: 'red', fontWeight: 'bold' }}>
                  {order.total}
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
          ))
        )}
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
                Customer: {selectedOrder.customerName}
              </Typography>
              <Typography variant="body2" sx={{ marginBottom: 1 }}>
                Address: {selectedOrder.address}
              </Typography>
              <Typography variant="body2" sx={{ marginBottom: 1 }}>
                Payment Method: {selectedOrder.paymentMethod}
              </Typography>
              {selectedOrder.cardNumber && (
                <Typography variant="body2" sx={{ marginBottom: 1 }}>
                  Card Number: {selectedOrder.cardNumber}
                </Typography>
              )}
              <Typography variant="body2" sx={{ marginBottom: 1 }}>
                Order Notes: {selectedOrder.orderNotes || 'None'}
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'red', marginTop: 2 }}>
                Total: {selectedOrder.total}
              </Typography>
              <Typography variant="body2" sx={{ marginTop: 1, color: '#666' }}>
                Order Time: {selectedOrder.timestamp ? new Date(selectedOrder.timestamp).toLocaleString() : 'N/A'}
              </Typography>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}