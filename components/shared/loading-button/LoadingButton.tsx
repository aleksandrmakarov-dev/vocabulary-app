import { Button, ButtonProps, CircularProgress } from "@mui/material";
import { ForwardRefRenderFunction, forwardRef } from "react";

interface LoadingButtonProps extends ButtonProps {
  loading?: boolean;
}

const LoadingButton: ForwardRefRenderFunction<
  HTMLButtonElement,
  LoadingButtonProps
> = (props, ref) => {
  const { loading, children, ...other } = props;
  return (
    <Button {...other} ref={ref} disabled={props.loading || props.disabled}>
      <>
        {loading && (
          <CircularProgress color="inherit" size={18} sx={{ mr: 1 }} />
        )}
        {children}
      </>
    </Button>
  );
};

export default forwardRef(LoadingButton);
