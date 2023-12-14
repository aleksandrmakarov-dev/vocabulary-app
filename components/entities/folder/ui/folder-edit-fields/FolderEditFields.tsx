import FieldController from "@/components/shared/field-controller/FieldController";
import { EditFolderDto } from "@/lib/dto/folderDto";
import { TextField } from "@mui/material";
import { Control } from "react-hook-form";

interface FolderFormFieldsProps {
  control: Control<EditFolderDto, any>;
  isLoading?: boolean;
}

export function FolderEditFields(props: FolderFormFieldsProps) {
  const { control, isLoading } = props;

  return (
    <>
      <FieldController
        label="Name"
        control={control}
        name="name"
        disabled={isLoading}
        render={({ field }) => (
          <TextField size="small" variant="outlined" fullWidth {...field} />
        )}
      />
    </>
  );
}
