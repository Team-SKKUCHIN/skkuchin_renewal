import React, { useState } from 'react';
import { Grid, Typography, Menu, MenuItem } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const Filter = ({ filterOptions, selectedFilter, number, onFilterSelect }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFilterSelect = (filter) => {
    onFilterSelect(filter);
    handleClose();
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'right', marginBottom: '15px' }}>
      <Grid
        onClick={handleClick}
        sx={{
          width: 'max-content',
          border: '1px solid #E2E2E2',
          borderRadius: 30,
          padding: '5px 10px',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontWeight: selectedFilter !== '전체' ? 700 : 'inherit',
          fontSize: '14px',
          lineHeight: '16px',
          color: selectedFilter !== '전체' ? '#FFAC0B' : 'inherit',
          backgroundColor: selectedFilter !== '전체' ? '#FFFCE4' : '#FFFFFF',
          borderColor: selectedFilter !== '전체' ? '#FFCE00' : '#E2E2E2',
        }}
      >
        <Typography>{`${selectedFilter} ${number}건`}</Typography>
        <ExpandMoreIcon />
      </Grid>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        PaperProps={{ elevation: 0,
          sx: {border: '1px solid #E2E2E2', borderRadius: '8px', '& .MuiList-root': { padding: '0' } },
        }}      
      >
        {filterOptions.map((option, index) => (
          <MenuItem
            key={option}
            onClick={() => handleFilterSelect(option)}
            sx={{ 
              color: selectedFilter === option ? '#FFCE00' : 'inherit',
              borderBottom: index < filterOptions.length - 1 ? '1px solid #E2E2E2' : 'none',
              padding: '0 15px',
              margin: '0 7px'
            }}
            >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};
