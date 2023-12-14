"use client";
import {
  FolderEditorDialog,
  useFolderById,
} from "@/components/entities/folder";
import { useUpdatePostById } from "@/components/features/folder";
import { EditFolderDto } from "@/lib/dto/folderDto";

interface CurrentFolderEditorDialogProps {
  trigger: JSX.Element;
  id: string;
}

export function CurrentFolderEditorDialog(
  props: CurrentFolderEditorDialogProps
) {
  const { trigger, id } = props;

  const {
    data,
    isLoading: isDataLoading,
    isError: isDataError,
    error: dataError,
  } = useFolderById(id);
  const { mutate, isPending, isError, error } = useUpdatePostById();

  const onSubmit = (values: EditFolderDto, close: () => void) => {
    mutate(
      {
        id: id,
        values: values,
      },
      {
        onSuccess: () => {
          close();
        },
      }
    );
  };

  return (
    <FolderEditorDialog
      title="Update folder"
      edit
      trigger={trigger}
      folder={data}
      isLoading={isPending || isDataLoading}
      isError={isError || isDataError}
      error={error?.response?.data || dataError?.response?.data}
      submit={onSubmit}
    />
  );
}
