import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { texts, additionalTexts } from './TextsComponent';

const MobileScrollingTextComponent = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => Math.min(prevActiveStep + 1, texts.length - 1));
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => Math.max(prevActiveStep - 1, 0));
  };

  return (
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
          <Box key={index} sx={{ width: '100%', flexShrink: 0, p: 1, boxSizing: 'border-box' }}> 
            <Typography variant="h4" component="h1" gutterBottom>
              {text}
            </Typography>
            <Typography>{additionalTexts[index]}</Typography>
          </Box>
        ))}
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Button onClick={handleBack} disabled={activeStep === 0} sx={{ marginRight: '10px' }}>
          Back
        </Button>
        <Button onClick={handleNext} disabled={activeStep === texts.length - 1}>
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default MobileScrollingTextComponent;
