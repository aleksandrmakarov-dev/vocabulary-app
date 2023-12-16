import FieldController from "@/components/shared/field-controller/FieldController";
import { EditSetDto } from "@/lib/dto/setDto";
import { TextField } from "@mui/material";
import Image from "next/image";
import { Control } from "react-hook-form";

interface SetEditFieldsProps {
  control: Control<EditSetDto>;
  isLoading?: boolean;
}

export function SetEditFields(props: SetEditFieldsProps) {
  const { control, isLoading } = props;

  return (
    <>
      <div className="flex flex-col-reverse sm:flex-row gap-x-5">
        <div className="w-full">
          <FieldController
            control={control}
            name="name"
            label="Name"
            disabled={isLoading}
            render={({ field }) => (
              <TextField
                className="bg-white"
                size="small"
                variant="outlined"
                fullWidth
                {...field}
              />
            )}
          />
          <FieldController
            control={control}
            name="description"
            label="Description"
            disabled={isLoading}
            render={({ field }) => (
              <TextField
                className="bg-white"
                size="small"
                multiline
                rows={4}
                variant="outlined"
                fullWidth
                {...field}
              />
            )}
          />
        </div>
        <FieldController
          control={control}
          name="image"
          label="Image"
          disabled={isLoading}
          render={({ field }) => (
            <div className="relative w-full sm:w-80 h-48 overflow-clip rounded-md">
              <Image
                src="https://cdn.pixabay.com/photo/2018/07/14/11/33/earth-3537401_1280.jpg"
                alt="preview"
                fill
                className="object-cover"
              />
            </div>
          )}
        />
      </div>
    </>
  );
}
