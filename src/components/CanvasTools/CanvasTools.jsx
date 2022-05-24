import React from 'react';
import { useTheme, List, Box } from '@mui/material';

import CanvasTool from "./CanvasTool";

const CanvasTools = ({ showTools, tools = [] }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{ 
        position: 'absolute', 
        left: 0,
        top: "50%",
        transform: `translate(${showTools ? 0 : "-100px" }, -50%)`,
        zIndex: 5,
        width: 100,
        backgroundColor: theme.palette.grey[200],
        boxShadow: theme.shadows[1],
        transition: "transform 200ms ease-in-out",
        borderTopRightRadius: theme.shape.borderRadius * 2,
        borderBottomRightRadius: theme.shape.borderRadius * 2,
      }}
    >
      <List
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {
          tools.map((tool) => (
            <CanvasTool
              key={tool.label}
              Icon={tool.Icon}
              label={tool.label}
              onClick={tool.onClick}
              selected={tool.selected}
            />
          ))
        }
      </List>
    </Box>
  )
}

export default CanvasTools