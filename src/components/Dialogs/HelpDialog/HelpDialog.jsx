import React from 'react';

import Dialog from "../Dialog";
import HelpDialogContent from "./HelpDialogContent";

const TITLE = "HELP";

const HelpDialog = ({ ...props }) => {

  return (
    <Dialog {...props} scroll="paper" title={TITLE} Content={HelpDialogContent}  />
  )
}

export default HelpDialog