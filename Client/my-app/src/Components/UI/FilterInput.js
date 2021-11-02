import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export const FilterInput = (props) => {
  return (
    <Autocomplete
      id="combo-box-demo"
      options={props.options}
      sx={{ width: 160 }}
      renderInput={(params) => <TextField {...params} label={props.label} />}
    />
  );
};
