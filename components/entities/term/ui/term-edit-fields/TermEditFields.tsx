import FieldController from "@/components/shared/field-controller/FieldController";
import { EditTermDto } from "@/lib/dto/termDto";
import { TextField } from "@mui/material";
import { Control } from "react-hook-form";
import ImageIcon from "@mui/icons-material/Image";
import { ImageUpload } from "@/components/shared/image-upload/ImageUpload";

interface TermEditFieldsProps {
  control: Control<EditTermDto>;
  isLoading?: boolean;
}

export function TermEditFields(props: TermEditFieldsProps) {
  const { control, isLoading } = props;

  return (
    <>
      <FieldController
        control={control}
        name="text"
        label="Text"
        disabled={isLoading}
        render={({ field }) => (
          <TextField size="small" fullWidth variant="outlined" {...field} />
        )}
      />
      <FieldController
        control={control}
        name="definition"
        label="Definition"
        disabled={isLoading}
        render={({ field }) => (
          <TextField size="small" fullWidth variant="outlined" {...field} />
        )}
      />
      <FieldController
        control={control}
        name="image"
        disabled={isLoading}
        render={({ field }) => (
          <ImageUpload
            className="h-24"
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />
    </>
  );
}
