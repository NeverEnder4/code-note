import React from 'react';
import { Box, List, ListItem, ListItemText, Divider, useTheme } from "@mui/material";

import hotkeys from "./hotkeys";

const HelpDialogContent = React.forwardRef(({ id, tabIndex }, ref) => {
  const theme = useTheme();

  return (
      <List id={id} ref={ref} tabIndex={tabIndex}>
        {
          hotkeys.map((hotkey, index) => (
            <>
            <ListItem key={hotkey.label} alignItems="flex-start" sx={{ flexDirection: "column" }}>
              <ListItemText
                primaryTypographyProps={{ sx:{fontWeight: "bold" } }}
              >
                {hotkey.label}
              </ListItemText>
              <Box
                sx={{
                  display: "flex",
                }}
              >
                <ListItemText
                  sx={{
                    marginRight: theme.spacing(3)
                  }}
                >
                  {hotkey.keyPress}
                </ListItemText>
                <ListItemText
                  sx={{
                    marginRight: theme.spacing(3)
                  }}
                >
                  -
                </ListItemText>
                <ListItemText>
                  {hotkey.description}
                </ListItemText>
              </Box>
            </ListItem>
            {index !== hotkeys.length - 1 && <Divider key={`${hotkey.label}-divider`} />}
            </>
          ))
        }
      </List>
  )
})

export default HelpDialogContent;