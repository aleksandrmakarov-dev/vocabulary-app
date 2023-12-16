import FieldController from "@/components/shared/field-controller/FieldController";
import { EditTermDto } from "@/lib/dto/termDto";
import { TextField } from "@mui/material";
import { Control } from "react-hook-form";
import ImageIcon from "@mui/icons-material/Image";

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
          <div className="border-2 rounded-md border-gray-200 h-full p-3 flex flex-col items-center justify-center border-dashed">
            <ImageIcon />
            <span className="text-sm text-gray-900">Image</span>
          </div>
        )}
      />
    </>
  );
}
