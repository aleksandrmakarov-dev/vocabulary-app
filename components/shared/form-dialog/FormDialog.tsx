import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React from "react";
import LoadingButton from "../loading-button/LoadingButton";

type ButtonColor =
  | "primary"
  | "secondary"
  | "inherit"
  | "success"
  | "error"
  | "info"
  | "warning";

interface FormDialogProps {
  trigger: JSX.Element;
  title: string;
  children: React.ReactNode;
  open: boolean;
  isLoading?: boolean;
  primaryButtonLabel?: string;
  secondaryButtonLabel?: string;
  primaryButtonColor?: ButtonColor;
  secondaryButtonColor?: ButtonColor;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleCancel: () => void;
}

export default function FormDialog(props: FormDialogProps) {
  const {
    trigger,
    title,
    children,
    open,
    isLoading,
    primaryButtonColor,
    secondaryButtonColor,
    primaryButtonLabel,
    secondaryButtonLabel,
    handleSubmit,
    handleCancel,
  } = props;

  return (
    <>
      {trigger}
      <Dialog open={open} fullWidth>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(e);
          }}
        >
          <DialogTitle>{title}</DialogTitle>
          <DialogContent>{children}</DialogContent>
          <DialogActions>
            <Button
              color={primaryButtonColor ?? "primary"}
              onClick={handleCancel}
            >
              {secondaryButtonLabel ?? "Cancel"}
            </Button>
            <LoadingButton
              loading={isLoading}
              color={secondaryButtonColor ?? "primary"}
              variant="contained"
              disableElevation
              type="submit"
            >
              {primaryButtonLabel ?? "Submit"}
            </LoadingButton>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
