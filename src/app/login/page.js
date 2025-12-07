"use client";

import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const router = useRouter();

  const handleLogin = async () => {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    
    const result = await response.json();
    
    if (result.success) {
      sessionStorage.setItem('isLoggedIn', 'true');
      sessionStorage.setItem('acc_type', result.acc_type);
      
      if(result.acc_type === 'manager') {
        router.push('/manager');
      } else {
        router.push('/customer');
      }
    } else {
      alert('Invalid credentials');
    }
  };

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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Box>
        <Typography variant="body2" align="center" color='red'>
          Don't have an account? <br/> <Link href="/register">Register here!</Link>
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button variant="contained" size="large" onClick={handleLogin} sx={{ backgroundColor: 'red', width: '150px', height: '50px' }}>
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