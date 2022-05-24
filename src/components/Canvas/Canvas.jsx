import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Box } from '@mui/material';
import { useWindowSize } from '@react-hook/window-size';

import CanvasTools from "../CanvasTools";
import { useToolList } from "../CanvasTools/hooks";
import { HelpDialog } from '../Dialogs';

const Canvas = () => {
const canvasRef = useRef(null);
const ctx = useRef(null);
const [screenWidth, screenHeight] = useWindowSize();

const [color, setColor] = useState("#000000");
const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });
const [mouseDown, setMouseDown] = useState(false);
const [canvasDimensions, setCanvasDimensions] = useState({ width: screenWidth, height: screenHeight });
const [showTools, setShowTools] = useState(true);
const [cursor, setCursor] = useState("crosshair");
const [imageData, setImageData] = useState([]);
const [imageDataIndex, setImageDataIndex] = useState(0);
const [drawTool, setDrawTool] = useState("pencil");
const [helpDialogOpen, setHelpDialogOpen] = useState(false);

function getPositionOffset(canvas) {
  const rect = canvas.getBoundingClientRect();
  return { xOffset: rect.left, yOffset: rect.top, };
} 

function onClear() {
  ctx.current.clearRect(0, 0, ctx.current.canvas.width, ctx.current.canvas.height);
  const blankCanvasData = ctx.current.getImageData(0, 0, ctx.current.canvas.width, ctx.current.canvas.height);

  setImageData([blankCanvasData]);
  setImageDataIndex(0);
}

function onDownload() {
  // Bug: Downloads a black image instead of canvas drawings
  // const dataUrl = canvasRef.current.toDataURL("image/jpeg", 1.0);
  // const link = document.createElement('a');
  // link.download = 'canvas.png';
  // link.href = dataUrl;
  // link.click();
  // document.removeElement(link);
}

const onUndo = useCallback(() => {
  if (imageDataIndex > 0) {
    const newImageDataIndex = imageDataIndex - 1;
    ctx.current.putImageData(imageData[newImageDataIndex], 0, 0);
    setImageDataIndex(newImageDataIndex);
  }
}, [imageData, imageDataIndex]);

function onText() {
  setDrawTool("text");
  setCursor("default");
}

function onPencil() {
  setDrawTool("pencil");
  setCursor("crosshair")
}

function onMouseDown(e) {
  const { xOffset, yOffset } = getPositionOffset(canvasRef.current);
  setLastPosition({ x: e.pageX - xOffset, y: e.pageY - yOffset });
  setMouseDown(true);
}

function onHelp() {
  toggleDialog();
};

function onDrawEnd() {
  if (!mouseDown) return;

  const data = ctx.current.getImageData(0, 0, ctx.current.canvas.width, ctx.current.canvas.height);
    
  if (imageData[imageDataIndex + 1]) {
      // Create a non reference copy of the data to mutate (so that we are not mutating state)
      const newImageData = [...imageData];
      newImageData[imageDataIndex + 1] = data;
      setImageData(newImageData);
  } else {
    setImageData(([
      ...imageData,
      data
    ]));
  }

  setImageDataIndex(imageDataIndex + 1);
  setMouseDown(false);
}

function onMouseMove(e) {
  const { xOffset, yOffset } = getPositionOffset(canvasRef.current);
  draw({x: e.pageX - xOffset, y: e.pageY - yOffset });
}

function toggleTools() {
  setShowTools(prevState => (!prevState));
}

function toggleDialog() {
  setHelpDialogOpen(prevState => !prevState);
};

const onKeyDown = useCallback((e) => {
  console.log(e)
  if (e.ctrlKey) {
    switch(e.key) {
      case "t":
        toggleTools();
        break;
      case "z":
        onUndo();
        break;
      case "a":
        onText();
        break;
      case "d":
        onPencil();
        break;
      case "h":
        toggleDialog();
        break;
      case "Backspace":
        onClear();
        break;
      default:
        break;
    }
  }
}, [onUndo]);

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
}, [lastPosition, mouseDown, color, setLastPosition]);

useEffect(() => {
  if (canvasRef.current) {
    ctx.current = canvasRef.current.getContext("2d");
  }

  setImageData([ctx.current.getImageData(0, 0, ctx.current.canvas.width, ctx.current.canvas.height)]);
}, []);

useEffect(() => {
  setCanvasDimensions({ width: screenWidth, height: screenHeight })
}, [ screenWidth, screenHeight ]);

useEffect(() => {
  document.addEventListener("keydown", onKeyDown, false);

  return () => {
    document.removeEventListener("keydown", onKeyDown, false);
  };
}, [ onKeyDown ]);

const tools = useToolList({ onClear, onUndo, onDownload, onText, onPencil, onHelp, drawTool });

  return (
    <Box sx={{ 
      width: "100%",
      height: "100vh",
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center", 
      justifyContent: "center",
      position: "relative",
    }}>
      <HelpDialog 
        open={helpDialogOpen}
        handleClose={toggleDialog}
        scroll="paper"
      />
      <canvas
        style={{ display: "block", cursor: cursor }}
        width={canvasDimensions.width}
        height={canvasDimensions.height}
        ref={canvasRef}
        onMouseMove={drawTool === "pencil" ? onMouseMove : undefined}
        onMouseUp={drawTool === "pencil" ? onDrawEnd : undefined}
        onMouseDown={drawTool === "pencil" ? onMouseDown : undefined }
        onMouseLeave={drawTool === "pencil" ? onDrawEnd : undefined}
        onKeyDown={onKeyDown}
      />
      <CanvasTools 
        showTools={showTools}
        tools={tools}
        drawTool={drawTool}
      />
    </Box>
  )
}

export default Canvas;