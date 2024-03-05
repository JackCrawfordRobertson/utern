import React, { useState } from 'react';
import { Box, Button, Typography, createTheme, ThemeProvider } from '@mui/material';
import { texts, additionalTexts } from './TextsComponent';

const theme = createTheme({
  typography: {
    h4: {
      fontSize: '1.25rem',
    },
  },
  // Optionally, define the color within the theme for consistent usage
  palette: {
    primary: {
      main: '#3da9de',
    },
  },
});

const MobileScrollingTextComponent = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => Math.min(prevActiveStep + 1, texts.length - 1));
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => Math.max(prevActiveStep - 1, 0));
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: '100%', overflow: 'hidden', position: 'relative', height: '90%' }}> 
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            transition: 'transform 0.5s ease',
            transform: `translateX(-${activeStep * 100}%)`,
          }}
        >
          {texts.map((text, index) => (
            <Box key={index} sx={{ width: '100%', flexShrink: 0, p: 1, boxSizing: 'border-box', padding:'0',}}> 
              <Typography 
                variant="h4" 
                component="h1" 
                gutterBottom
                sx={{
                  fontWeight: 'bold',
                  marginBottom: '1em',
                  marginTop: '1em',
                }}
              >
                {text}
              </Typography>
              <Typography>{additionalTexts[index]}</Typography>
            </Box>
          ))}
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, px: '0.2em' }}>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleBack} 
            disabled={activeStep === 0} 
            sx={{
              width: 'calc(50% - 0.1em)', // Fill half width with a small gap
              backgroundColor: '#3da9de',
              color: 'white', // Make button text white
              '&:hover': {
                backgroundColor: theme.palette.primary.dark,
              },
            }}
          >
            Back
          </Button>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleNext} 
            disabled={activeStep === texts.length - 1}
            sx={{
              width: 'calc(50% - 0.3em)', // Fill half width with a small gap
              backgroundColor: '#3da9de',
              color: 'white', // Make button text white
              '&:hover': {
                backgroundColor: theme.palette.primary.dark,
              },
            }}
          >
            Next
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default MobileScrollingTextComponent;
