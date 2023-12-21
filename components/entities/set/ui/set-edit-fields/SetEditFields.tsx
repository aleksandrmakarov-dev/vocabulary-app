import FieldController from "@/components/shared/field-controller/FieldController";
import { ImageUpload } from "@/components/shared/image-upload/ImageUpload";
import { languages } from "@/lib/constants";
import { EditSetDto } from "@/lib/dto/setDto";
import { MenuItem, Select, TextField } from "@mui/material";
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
      <div className="flex flex-col-reverse sm:grid sm:grid-cols-4 gap-x-3">
        <div className="w-full sm:col-span-3">
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
          <div className="flex flex-col sm:grid sm:grid-cols-2 gap-x-3">
            <FieldController
              control={control}
              name="originalLang"
              label="Original Language"
              disabled={isLoading}
              render={({ field }) => (
                <Select className="bg-white" fullWidth size="small" {...field}>
                  {languages.map((lang) => (
                    <MenuItem key={lang.code} value={lang.code}>
                      {lang.name}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            <FieldController
              control={control}
              name="targetLang"
              label="Target Language"
              disabled={isLoading}
              render={({ field }) => (
                <Select className="bg-white" fullWidth size="small" {...field}>
                  {languages.map((lang) => (
                    <MenuItem key={lang.code} value={lang.code}>
                      {lang.name}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </div>
        </div>
        <FieldController
          control={control}
          name="image"
          label="Image"
          disabled={isLoading}
          render={({ field }) => (
            <ImageUpload
              className="h-48"
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </div>
    </>
  );
}
