import React, { useState } from 'react';
import { Grid, Typography, Menu, MenuItem } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Filter = ({ filterOptions, selectedFilter, onFilterSelect }) => {
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
    <div style={{ display: 'flex', justifyContent: 'right', padding: '0 24px' }}>
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
          fontWeight: 600,
          color: selectedFilter !== '전체' ? '#FFAC0B' : 'inherit',
          backgroundColor: selectedFilter !== '전체' ? '#FFFCE4' : '#FFFFFF',
          borderColor: selectedFilter !== '전체' ? '#FFCE00' : '#E2E2E2',
          marginTop: '68px'
        }}
      >
        <Typography>{selectedFilter}</Typography>
        <ExpandMoreIcon />
      </Grid>

      {/* Dropdown Menu */}
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

export default Filter;
