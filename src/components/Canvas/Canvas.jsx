import React, { useRef } from 'react';
import { useTheme } from '@mui/material';
import { Button, Box, Select, MenuItem } from '@mui/material';

const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 600;

const Canvas = () => {
const canvasRef = useRef(null);
const theme = useTheme();

  return (
    <Box sx={{ 
      width: "100%",
      height: "100vh",
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center", 
      justifyContent: "center"
    }}>
      <canvas
        style={{ border: "1px solid black", display: "block", }}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        ref={canvasRef}
      />
      <Box sx={{ 
        width: CANVAS_WIDTH,
        marginTop: theme.spacing(2),
        display: "flex",
        justifyContent: "space-between"
      }}>
        <Button variant="contained">Clear</Button>
        <Button variant="outlined">Download</Button>
      </Box>
    </Box>
  )
}

export default Canvas;