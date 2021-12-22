import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import { makeStyles, createStyles } from "@mui/styles";

const useStyles = makeStyles((theme) =>
  createStyles({
    textfield: {
      "& #custom-autocomplete-label": {
        color: "red",
      },
    },
  })
);

export const FilterInput = (props) => {
  const width = props.width || 150;
  const classes = useStyles();
  if (props.disabled) {
    return (
      <Autocomplete
        disabled
        id="custom-autocomplete"
        options={props.options}
        style={{ width: width }}
        renderInput={(params) => {
          return (
            <TextField
              InputProps={{
                classes: {
                  notchedOutline: classes.notchedOutline,
                },
              }}
              {...params}
              variant="outlined"
              label={props.label}
              className={props.hasError ? classes.textfield : ""}
            />
          );
        }}
        onChange={props.onChange}
      />
    );
  }

  return (
    <Autocomplete
      id="custom-autocomplete"
      options={props.options}
      style={{ width: width }}
      renderInput={(params) => {
        return (
          <TextField
            InputProps={{
              classes: {
                notchedOutline: classes.notchedOutline,
              },
            }}
            {...params}
            variant="outlined"
            label={props.label}
            className={props.hasError ? classes.textfield : ""}
          />
        );
      }}
      onChange={props.onChange}
    />
  );
};
