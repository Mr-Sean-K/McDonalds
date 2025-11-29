"use client";

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function LoginPage() {
  return (
    <Box sx={{ width: '100%', height: '100vh', padding: '16px', backgroundColor: '#fff'}}>
     
      <Typography variant="h4" align="center" gutterBottom sx={{ color: 'red', fontWeight: 'bold' }}>
        MCDONALDS
      </Typography>
      <Typography variant="subtitle1" align="center" gutterBottom color='red'>
        Craving your burger fix? Login Below!
      </Typography>
      <Stack spacing={10}>
        <Box>
          <Typography variant="body1" gutterBottom color='red'>
            email
          </Typography>
          <TextField 
            fullWidth 
            placeholder="sample@gmail.com" 
            variant="filled" 
            sx={{backgroundColor: 'yellow'}}
          />
        </Box>
        <Box>
          <Typography variant="body1" gutterBottom color='red'>
            password
          </Typography>
          <TextField 
            fullWidth 
            type="password" 
            placeholder="**********" 
            variant="filled" 
            sx={{backgroundColor: 'yellow'}}
          />
        </Box>
        <Typography variant="body2" align="center" color='red'>
          Don't have an account? <br/> <a href="/register">Register Here!</a>
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="center">
          <Box sx={{ width: '50px', height: '50px', backgroundColor: '#ccc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            logo
          </Box>
          <Button variant="contained" size="large" sx={{ backgroundColor: 'red', width: '150px', height: '50px' }}>
            LOGIN
          </Button>
        </Stack>
        <Typography variant="body2" align="center" color='red'>
          I'm lovin' it!
        </Typography>
      </Stack>
    </Box>
  );
}