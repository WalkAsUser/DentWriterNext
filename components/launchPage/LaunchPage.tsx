import React, { useState } from 'react';
import {
    Box,
    Button,
    Menu,
    MenuItem,
    Container,
    Paper
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const LaunchPage: React.FC = () => {
    const [newMenuAnchor, setNewMenuAnchor] = useState<null | HTMLElement>(null);
    const [reportsMenuAnchor, setReportsMenuAnchor] = useState<null | HTMLElement>(null);

    const handleNewMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setNewMenuAnchor(event.currentTarget);
    };

    const handleNewMenuClose = () => {
        setNewMenuAnchor(null);
    };

    const handleReportsMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setReportsMenuAnchor(event.currentTarget);
    };

    const handleReportsMenuClose = () => {
        setReportsMenuAnchor(null);
    };

    const handleLookup = () => {
        // Add lookup functionality here
        console.log('Lookup clicked');
    };

    const handleNewInvoice = () => {
        handleNewMenuClose();
        // Add invoice creation functionality here
        console.log('New Invoice clicked');
    };

    const handleNewVehicle = () => {
        handleNewMenuClose();
        // Add vehicle creation functionality here
        console.log('New Vehicle clicked');
    };

    const handleNewDent = () => {
        handleNewMenuClose();
        // Add dent creation functionality here
        console.log('New Dent clicked');
    };

    const handleTempReport = () => {
        handleReportsMenuClose();
        // Add temp report functionality here
        console.log('Temp Report clicked');
    };

    return (
    <Box
      sx={{
        backgroundColor: '#000000',
        minHeight: '100vh',
        width: '100%'
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            gap: 4
          }}
        >
          {/* Logo Section */}
          <Box
            sx={{
              width: 200,
              height: 200,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 4
            }}
          >
            {/* Replace this with your logo image */}
            <Paper
              elevation={3}
              sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f5f5f5'
              }}
            >
              {/* Add your logo here, e.g., <img src="/path/to/logo.png" alt="Logo" /> */}
              <Box sx={{ fontSize: 24, color: '#999' }}>Your Logo</Box>
            </Paper>
          </Box>

          {/* Menu Buttons Section - Stacked Vertically */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              width: '100%',
              maxWidth: 300
            }}
          >
            {/* Lookup Button */}
            <Button
              variant="contained"
              size="large"
              startIcon={<SearchIcon />}
              onClick={handleLookup}
              fullWidth
              sx={{
                backgroundColor: '#4caf50',
                '&:hover': {
                  backgroundColor: '#45a049'
                }
              }}
            >
              Lookup
            </Button>

            {/* New Dropdown Menu */}
            <Box>
              <Button
                variant="contained"
                size="large"
                onClick={handleNewMenuOpen}
                fullWidth
                sx={{
                  backgroundColor: '#4caf50',
                  '&:hover': {
                    backgroundColor: '#45a049'
                  }
                }}
              >
                New
              </Button>
              <Menu
                anchorEl={newMenuAnchor}
                open={Boolean(newMenuAnchor)}
                onClose={handleNewMenuClose}
              >
                <MenuItem onClick={handleNewInvoice}>Invoice</MenuItem>
                <MenuItem onClick={handleNewVehicle}>Vehicle</MenuItem>
                <MenuItem onClick={handleNewDent}>Dent</MenuItem>
              </Menu>
            </Box>

            {/* Reports Dropdown Menu */}
            <Box>
              <Button
                variant="contained"
                size="large"
                onClick={handleReportsMenuOpen}
                fullWidth
                sx={{
                  backgroundColor: '#4caf50',
                  '&:hover': {
                    backgroundColor: '#45a049'
                  }
                }}
              >
                Reports
              </Button>
              <Menu
                anchorEl={reportsMenuAnchor}
                open={Boolean(reportsMenuAnchor)}
                onClose={handleReportsMenuClose}
              >
                <MenuItem onClick={handleTempReport}>Temp</MenuItem>
              </Menu>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default LaunchPage;