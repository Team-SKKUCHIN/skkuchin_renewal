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
          color: selectedFilter !== '전체' ? '#FFCE00' : 'inherit',
          borderColor: selectedFilter !== '전체' ? '#FFCE00' : '#E2E2E2',
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
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        sx={{
          boxShadow: 'none',
          '& .MuiList-root': {
            padding: '0',
            boxShadow: 'none',
          },
        }}
      >
        {filterOptions.map((option) => (
          <MenuItem
            key={option}
            onClick={() => handleFilterSelect(option)}
            sx={{ color: selectedFilter === option ? '#FFCE00' : 'inherit' }}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default Filter;
