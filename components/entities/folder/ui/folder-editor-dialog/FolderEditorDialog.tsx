"use client";
import FormDialog from "@/components/shared/form-dialog/FormDialog";
import React from "react";
import { useForm } from "react-hook-form";
import { FolderEditFields } from "../folder-edit-fields/FolderEditFields";
import { EditFolderDto, EditFolderDtoSchema } from "@/lib/dto/folderDto";
import { zodResolver } from "@hookform/resolvers/zod";
import { GenericErrorResponse } from "@/lib/api";
import { Alert } from "@mui/material";

interface FolderEditDialogProps {
  trigger: JSX.Element;
  title: string;
  folder?: EditFolderDto;
  edit?: boolean;
  isLoading?: boolean;
  isError?: boolean;
  error?: GenericErrorResponse;
  submit: (values: any, close: () => void) => void;
}

export function FolderEditorDialog(props: FolderEditDialogProps) {
  const { trigger, title, folder, isLoading, isError, error, edit, submit } =
    props;
  const [open, setOpen] = React.useState<boolean>(false);

  const { handleSubmit, control, reset } = useForm<EditFolderDto>({
    resolver: zodResolver(EditFolderDtoSchema),
    defaultValues: {
      name: "",
    },
    values: folder,
  });

  const onSubmit = (values: EditFolderDto) => {
    submit(values, handleClose);
  };

  const handleClose = () => {
    reset();
    setOpen(false);
  };

  return (
    <FormDialog
      title={title}
      primaryButtonLabel={edit ? "Update" : "Create"}
      isLoading={isLoading}
      trigger={React.cloneElement(trigger, { onClick: () => setOpen(true) })}
      open={open}
      handleSubmit={handleSubmit(onSubmit)}
      handleCancel={handleClose}
    >
      {isError && <Alert severity="error">{error?.message}</Alert>}
      <FolderEditFields control={control} />
    </FormDialog>
  );
}
