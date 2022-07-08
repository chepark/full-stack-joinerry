import { forwardRef } from "react";
import InputBase from "@mui/material/InputBase";
import NumberFormat from "react-number-format";

export const NumberInput = forwardRef((props, ref) => {
  const { onChange, ...other } = props;

  return (
    <NumberFormat
      isNumericString
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange &&
          onChange({ target: { value: values.value, name: "number" } });
      }}
    />
  );
});
