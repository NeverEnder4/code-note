import React from 'react';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material';

import Select from "../Select";
import colors from "./colors";

const ColorSelect = ({ value, ...props }) => {
  const theme = useTheme();

  return (
    <Box sx={{ display: "flex", alignItems: "center"}}>
      <Box 
        sx={{
          width: 10,
          height: 10,
          borderRadius: theme.shape.borderRadius,
          backgroundColor: value,
          marginRight: theme.spacing(1),
          boxShadow: theme.shadows[2],
        }} 
      />
      <Select 
        {...props} 
        value={value} 
        options={colors} 
        label="Color" 
        variant="standard" 
      />
    </Box>
  )
}

export default ColorSelect