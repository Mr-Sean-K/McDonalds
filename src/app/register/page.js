"use client";

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from 'next/link';

export default function RegisterPage() {
    return (
        <Box sx={{ width: '100%', height: '100vh', padding: '16px', backgroundColor: '#fff'}}>
         
            <Typography variant="h4" align="center" gutterBottom sx={{ color: 'red', fontWeight: 'bold' }}>
                MCDONALDS
            </Typography>
            <Typography variant="subtitle1" align="center" gutterBottom color='red'>
                Welcome to the McFamily! <br/> Please enter your details below:
            </Typography>
            <Stack spacing={8}>
                <Box>
                    <Typography variant="body1" gutterBottom color='red'>
                        Email
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
                        Password
                    </Typography>
                    <TextField 
                        fullWidth 
                        type="password" 
                        placeholder="**********" 
                        variant="filled" 
                        sx={{backgroundColor: 'yellow'}}
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
                        sx={{backgroundColor: 'yellow'}}
                    />
                </Box>
            </Stack>
            <Stack direction="vertical" spacing={2} justifyContent="center" paddingTop={5}>
                <Button variant="contained" size="large" sx={{ backgroundColor: 'red', width: '150px', height: '50px' }}>
                    REGISTER
                </Button>
            </Stack>
            <Typography variant="body2" align="center" color='red'>
                Already have an account? <br/> <Link href="/login">Login here!</Link>
            </Typography>
        </Box>
    );
}