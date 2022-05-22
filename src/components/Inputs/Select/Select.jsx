import React from 'react';
import { Select as MuiSelect, MenuItem } from '@mui/material';


const Select = ({ options = [], ...props }) => {
  return (
    <MuiSelect {...props} >
      {
        options.map((option) => (
          <MenuItem
           key={options.key}
           value={option.value}
           >
            {option.label}
          </MenuItem>
        ))
      }
    </MuiSelect>
  )
}

export default Select