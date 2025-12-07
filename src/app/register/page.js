"use client";

import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [fullName, setFullName] = React.useState('');
    const [error, setError] = React.useState('');
    const router = useRouter();

    const handleRegister = async () => {
        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, fullName }),
            });

            const result = await response.json();

            if (result.success) {
                // Registration successful, redirect to login
                router.push('/login');
            } else {
                setError(result.message || 'Registration failed');
            }
        } catch (err) {
            console.error('Registration error:', err);
            setError('An error occurred during registration');
        }
    };

    return (
        <Box sx={{ width: '100%', height: '100vh', padding: '16px', backgroundColor: '#fff'}}>
         
            <Typography variant="h4" align="center" gutterBottom sx={{ color: 'red', fontWeight: 'bold' }}>
                MCDONALDS
            </Typography>
            <Typography variant="subtitle1" align="center" gutterBottom color='red'>
                Welcome to the McFamily! <br/> Please enter your details below:
            </Typography>
            {error && (
                <Typography variant="body2" align="center" color="error" sx={{ marginTop: 2 }}>
                    {error}
                </Typography>
            )}
            <Stack spacing={8}>
                <Box>
                    <Typography variant="body1" gutterBottom color='red'>
                        Email
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
                        Password
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
                <Box>
                    <Typography variant="body1" gutterBottom color='red'>
                        Full Name
                    </Typography>
                    <TextField 
                        fullWidth 
                        placeholder="John Doe" 
                        variant="filled" 
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                </Box>
            </Stack>
            <Stack direction="vertical" spacing={2} justifyContent="center" paddingTop={5}>
                <Button 
                    variant="contained" 
                    size="large" 
                    sx={{ backgroundColor: 'red', width: '150px', height: '50px' }}
                    onClick={handleRegister}
                >
                    REGISTER
                </Button>
            </Stack>
            <Typography variant="body2" align="center" color='red'>
                Already have an account? <br/> <Link href="/login">Login here!</Link>
            </Typography>
        </Box>
    );
}