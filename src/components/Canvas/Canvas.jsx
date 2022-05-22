import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useTheme } from '@mui/material';
import { Button, Box } from '@mui/material';

import ColorSelect from "../Inputs/ColorSelect";

const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 600;

const Canvas = () => {
const canvasRef = useRef(null);
const ctx = useRef(null);
const theme = useTheme();

const [color, setColor] = useState("#000000");
const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });
const [mouseDown, setMouseDown] = useState(false);

function onColorChange(e) {
  setColor(e.target.value);
};

function onMouseDown(e) {
  setLastPosition({ x: e.pageX, y: e.pageY});
  setMouseDown(true);
}

function onMouseUp(e) {
  setMouseDown(false);
}

function onMouseLeave(e) {
  setMouseDown(false);
}

function onMouseMove(e) {
  draw({x: e.pageX, y: e.pageY});
}

const draw = useCallback(({ x, y }) => {
  if (mouseDown) {
    ctx.current.beginPath();
    ctx.current.strokeStyle = color;
    ctx.current.lineWidth = 10;
    ctx.current.lineJoin = "round";
    ctx.current.moveTo(lastPosition.x, lastPosition.y);
    ctx.current.lineTo(x, y);
    ctx.current.closePath();
    ctx.current.stroke();

    setLastPosition({ x, y })
  }
}, [lastPosition, mouseDown, color, setLastPosition])

useEffect(() => {
  if (canvasRef.current) {
    ctx.current = canvasRef.current.getContext("2d");
  }
}, [])

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
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseLeave}
      />
      <Box sx={{ 
        width: CANVAS_WIDTH,
        marginTop: theme.spacing(2),
        display: "flex",
        justifyContent: "space-between"
        }}
      >
        <Box
          sx={{ 
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Button sx={{ marginRight: theme.spacing(2) }} variant="contained">Clear</Button>
          <ColorSelect value={color} onChange={onColorChange} />
        </Box>
        <Button variant="outlined">Download</Button>
      </Box>
    </Box>
  )
}

export default Canvas;