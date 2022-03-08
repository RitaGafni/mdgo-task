import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import logo from '../images/logo.svg';

export default function NavBar({ handleOpenWizard }) {
  const handleNewPhoto = () => {
    handleOpenWizard(false, true, {
      id: '',
      title: '',
      url: '',
    });
  };

  return (
    <Box sx={{ flexGrow: 1, textAlign: 'center' }}>
      <AppBar position='static' sx={{ alignItems: 'center' }}>
        <Toolbar sx={{ flexGrow: 1, textAlign: 'center' }}>
          <Button color='inherit' onClick={handleNewPhoto} sx={{ mr: 5 }}>
            Add Photo
          </Button>
          <Typography variant='h6' component='div'>
            <img height='20' src={logo} alt='MDGO' style={{ marginRight: 4 }} />
            Client-Side Task
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
