// OptionButton.js
import React from 'react';
import { Button } from '@mui/material';

const OptionButton = ({ options, selectedOption, handleButtonClick }) => {
  return (
    <div style={{ display: 'flex', width: '100%', gap: '8px', justifyContent: 'center', padding: '12px 24px' }}>
      {options.map((option) => (
        <Button
          key={option.value}
          variant='outlined'
          style={{
            flex: 1,
            fontSize: 16,
            fontWeight: selectedOption === option.value ? 700 : 500,
            color: '#3C3C3C',
            borderColor: selectedOption === option.value ? '#FFCE00' : '#E2E2E2',
            backgroundColor: selectedOption === option.value ? '#FFFCE4' : '#FFFFFF',
            borderRadius: '12px',
          }}
          onClick={() => handleButtonClick(option.value)}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
};

export default OptionButton;
