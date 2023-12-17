"use client";
import { setKeys } from "@/components/entities/set";
import { useDeleteTermById } from "@/components/features/term";
import FormDialog from "@/components/shared/form-dialog/FormDialog";
import { SetWithTerms } from "@/lib/prisma";
import { Alert, AlertTitle } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { FormEvent, useState } from "react";

interface CurrentTermDeleteDialogProps {
  trigger: JSX.Element;
  id: string;
  setId: string;
}

export function CurrentTermDeleteDialog(props: CurrentTermDeleteDialogProps) {
  const { trigger, id, setId } = props;

  const queryClient = useQueryClient();
  const [open, setOpen] = useState<boolean>(false);
  const { mutate, isPending, isError, error } = useDeleteTermById();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutate(id, {
      onSuccess: () => {
        close();

        const queryKey = setKeys.set.id(setId);
        queryClient.cancelQueries({ queryKey: queryKey });

        queryClient.setQueryData<SetWithTerms>(queryKey, (prev) => {
          if (prev) {
            return {
              ...prev,
              terms: prev.terms.filter((term) => term.id !== id),
            };
          }

          return prev;
        });
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
      primaryButtonLabel="Yes, delete term"
      secondaryButtonLabel="No, keep term"
    >
      <Alert severity="warning">
        <AlertTitle>Are you sure you want to delete this term?</AlertTitle>
        This action cannot be undone.
      </Alert>
    </FormDialog>
  );
}
