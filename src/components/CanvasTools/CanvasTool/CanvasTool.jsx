import React from 'react';
import { ListItem, ButtonBase, Typography, useTheme } from '@mui/material';


const Tool = ({ Icon, label, onClick, selected }) => {
  const theme = useTheme();

  console.log(selected, "SEL")

  return (
    <ListItem
      disablePadding
      sx={{
        margin: theme.spacing(1, 0)
      }}
    >
      <ButtonBase
        sx={{ 
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          padding: theme.spacing(1, 0),
          backgroundColor: selected ? theme.palette.common.black : undefined
          }}
          onClick={onClick}
      >
        <Icon 
          sx={{
            fill: selected ? theme.palette.common.white : undefined,
          }} 
        />
        <Typography
          sx={{
            fontSize: 10,
            textTransform: "uppercase",
            fontWeight: "bold",
            color: selected ? "#FFF" : undefined
          }}
        >
          {label}
        </Typography>
      </ButtonBase>
    </ListItem>
  )
}

export default Tool