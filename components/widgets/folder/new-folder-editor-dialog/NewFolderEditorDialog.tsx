"use client";
import { FolderEditorDialog } from "@/components/entities/folder";
import { useCreatePost } from "@/components/features/folder";
import { EditFolderDto } from "@/lib/dto/folderDto";

interface NewFolderEditorDialogProps {
  trigger: JSX.Element;
}

export function NewFolderEditorDialog(props: NewFolderEditorDialogProps) {
  const { trigger } = props;
  const { mutate, isPending, isError, error } = useCreatePost();

  const onSubmit = (values: EditFolderDto, close: () => void) => {
    mutate(values, {
      onSuccess: () => {
        close();
      },
    });
  };

  return (
    <FolderEditorDialog
      title="Create new folder"
      trigger={trigger}
      submit={onSubmit}
      isLoading={isPending}
      isError={isError}
      error={error?.response?.data}
    />
  );
}
