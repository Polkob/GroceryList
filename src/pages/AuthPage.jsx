import React, { useState } from 'react';
import { TextField, Button, Typography, Container, CssBaseline } from '@mui/material';
import { methods } from '../api/methods';

const AuthPage = ({ isExist }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleFormSubmit = async () => {
    
      if (isExist) {
        const data = await methods.login(username, password);
        console.log(data)
      } else {
        const data = await methods.register(username, password);
        console.log(data)
      }
    
    
  };

  return (
    <Container component="main" maxWidth="xs">
      <div>
        <Typography component="h1" variant="h5">
            {isExist ? 'Login' : 'Register'}
        </Typography>
          <TextField
            margin="normal"
            fullWidth
            label="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleFormSubmit}
          >
            {isExist ? 'Login' : 'Register'}
          </Button>
      </div>
    </Container>
  );
};

export default AuthPage;
