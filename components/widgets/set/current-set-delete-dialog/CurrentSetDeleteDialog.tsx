"use client";
import { useDeleteSetById } from "@/components/features/set";
import FormDialog from "@/components/shared/form-dialog/FormDialog";
import Routing from "@/lib/routing";
import { Alert, AlertTitle } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

interface CurrentSetDeleteDialogProps {
  trigger: JSX.Element;
  id: string;
}

export function CurrentSetDeleteDialog(props: CurrentSetDeleteDialogProps) {
  const { trigger, id } = props;

  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  const { mutate, isPending, isError, error } = useDeleteSetById();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutate(id, {
      onSuccess: () => {
        close();
        router.push(Routing.folders.index);
      },
      onError: (error) => {
        console.log(error);
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
      primaryButtonLabel="Yes, delete set"
      secondaryButtonLabel="No, keep set"
    >
      <Alert severity="warning">
        <AlertTitle>Are you sure you want to delete this set?</AlertTitle>
        All terms it includes will be deleted. This action cannot be undone.
      </Alert>
    </FormDialog>
  );
}
