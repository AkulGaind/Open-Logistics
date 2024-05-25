import { Snackbar, SnackbarProps } from "@mui/material";
import MuiAlert, { AlertColor, AlertProps } from "@mui/material/Alert";
import React from "react";

export interface CustomSnackBarProps extends SnackbarProps {
  text: string;
  status: AlertColor;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const CustomSnackBar: React.FC<CustomSnackBarProps> = ({
  text,
  status,
  ...props
}) => {
  return (
    <Snackbar {...props} autoHideDuration={2000}>
      <Alert severity={status} sx={{ width: "100%" }}>
        {text}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackBar;