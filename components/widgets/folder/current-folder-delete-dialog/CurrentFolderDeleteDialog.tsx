"use client";
import { useDeleteFolderById } from "@/components/features/folder";
import FormDialog from "@/components/shared/form-dialog/FormDialog";
import Routing from "@/lib/routing";
import { Alert, AlertTitle } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

interface CurrentFolderDeleteDialogProps {
  id: string;
  trigger: JSX.Element;
}

export function CurrentFolderDeleteDialog(
  props: CurrentFolderDeleteDialogProps
) {
  const { id, trigger } = props;
  const [open, setOpen] = React.useState<boolean>(false);
  const router = useRouter();

  const { mutate, isPending, isError, error } = useDeleteFolderById();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(id, {
      onSuccess: () => {
        close();
        router.push(Routing.folders.index);
      },
    });
  };

  const close = () => setOpen(false);

  return (
    <FormDialog
      trigger={React.cloneElement(trigger, { onClick: () => setOpen(true) })}
      title={"Delete folder"}
      open={open}
      handleSubmit={handleSubmit}
      handleCancel={close}
      primaryButtonColor="error"
      secondaryButtonColor="error"
      isLoading={isPending}
      primaryButtonLabel="Yes, delete folder"
      secondaryButtonLabel="No, keep folder"
    >
      <Alert severity="warning">
        <AlertTitle>Are you sure you want to delete this folder?</AlertTitle>
        This action cannot be undone.
      </Alert>
    </FormDialog>
  );
}
