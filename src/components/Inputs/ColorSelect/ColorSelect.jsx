import React from 'react';

import Select from "../Select";
import colors from "./colors";

const ColorSelect = ({ ...props }) => {
  return (
    <Select {...props} options={colors} label="Color" variant="standard" />
  )
}

export default ColorSelect