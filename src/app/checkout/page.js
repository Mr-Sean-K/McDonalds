'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Paper from '@mui/material/Paper';
import MenuDrawer from '../components/MenuDrawer';
import MenuIcon from '@mui/icons-material/Menu';

export default function CheckoutPage() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => setOpen(newOpen);

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
        <MenuDrawer open={open} onClose={toggleDrawer(false)} />
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'red', flex: 1, textAlign: 'center' }}>
          Checkout
        </Typography>
      </Stack>

      {/* Checkout Form */}
      <Paper
        elevation={3}
        sx={{
          width: '100%',
          maxWidth: 400,
          marginTop: 4,
          padding: 3,
          borderRadius: 2,
        }}
      >
        <Stack spacing={3}>
          {/* Customer Name */}
          <TextField
            label="Customer Name"
            variant="outlined"
            fullWidth
            sx={{ backgroundColor: '#f5f5f5' }}
          />

          {/* Address */}
          <TextField
            label="Address"
            variant="outlined"
            fullWidth
            sx={{ backgroundColor: '#f5f5f5' }}
          />

          {/* Payment Method */}
          <Box>
            <FormLabel sx={{ fontWeight: 'bold', color: 'red' }}>Payment Method:</FormLabel>
            <RadioGroup row>
              <FormControlLabel value="cash" control={<Radio />} label="Cash" />
              <FormControlLabel value="card" control={<Radio />} label="Card" />
            </RadioGroup>
          </Box>

          {/* Order Notes */}
          <TextField
            label="Order Notes"
            variant="outlined"
            multiline
            rows={4}
            fullWidth
            sx={{ backgroundColor: '#f5f5f5' }}
          />

          {/* Total Price */}
          <Typography
            variant="h6"
            sx={{ fontWeight: 'bold', color: 'red', textAlign: 'center' }}
          >
            Total Price: X.XX EUR
          </Typography>

          {/* Confirm Order Button */}
          <Button
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: 'red',
              color: 'white',
              fontWeight: 'bold',
              padding: '12px',
            }}
          >
            CONFIRM ORDER
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}