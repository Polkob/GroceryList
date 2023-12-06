import React, { useState } from 'react';
import { TextField, Button, Typography, Container, CssBaseline } from '@mui/material';
import { methods } from '../api/methods';

import { Link, useNavigate } from 'react-router-dom';

const AuthPage = ({isExist,setUser}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

    
  const handleFormSubmit = async () => {
    try {
      if (isExist) {
        const data = await methods.login(username, password);
        console.log(data);
        setUser(true)
        navigate('/list');
      } else {
        const data = await methods.register(username, password);
        console.log(data);
        setUser(true)
        navigate('/list');
      }
    } catch (e) {
      console.error(e);
      setError('Invalid username or password'); // Set the error message
    }
  };

  const handleTextFieldFocus = () => {
    setError(null); // Clear the error message when text field is focused
  };

  return (
    <Container component="main" maxWidth="xs"
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Typography component="h1" variant="h5" sx={{textAlign: 'center' }}>
          {isExist ? 'Login' : 'Register'}
        </Typography>

        <TextField
          margin="normal"
          fullWidth
          label="Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onFocus={handleTextFieldFocus}
          InputProps={{
            style: {
              borderRadius: '30px',
              //border: '1px solid black',
              backgroundColor: '#fff7e2ee',
              
            }
             // Это свойство отключает стандартное подчеркивание
          }} 
        />
        <TextField
          margin="normal"
          fullWidth
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onFocus={handleTextFieldFocus}
           
          InputProps={{
            style: {
              borderRadius: '30px',
              //border: '1px solid black',
              backgroundColor: '#fff7e2ee',
              
            }
          }} 
        />
        {error && (
          <Typography color="error" align="center" gutterBottom>
            {error}
          </Typography>
        )}
        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 1, mb: 1, backgroundColor: '#604833', color: '#dfd7ba', width: '50%' }}
          onClick={handleFormSubmit}
        >
          {isExist ? 'Login' : 'Register'}
        </Button>

        {isExist && (
          <Link to="/register" style={{ textDecoration: 'none' }}>
            <Button fullWidth variant="outlined" color="primary" sx={{ mt: 1, mb: 1, borderColor: '#dfd7ba', color: '#604833', width: '100%' }}>
              Register
            </Button>
          </Link>
        )}
      </div>
    </Container>
  );
};

export default AuthPage;