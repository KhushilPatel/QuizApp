import React, { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect({ name }) {
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120, mb: 2 }}>
      <FormControl 
        fullWidth 
        variant="outlined" 
        sx={{ width: 280, mb: 2, bgcolor: 'white', borderRadius: 1 }}
      >
        <InputLabel id="demo-simple-select-label" sx={{ bgcolor: 'white', px: 1 }}>{name}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label={name}
          onChange={handleChange}
          sx={{ width: 280, '& .MuiSelect-select': { py: 1.5 }, '& .MuiOutlinedInput-notchedOutline': { borderColor: '#d0c0b4' } }}
        >
          {Array.from({ length: 10 }, (_, i) => (
            <MenuItem
              key={i + 1}
              value={i + 1}
              sx={{ '&:hover': { bgcolor: '#f0f0f0' } }}
            >
              {i + 1}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
