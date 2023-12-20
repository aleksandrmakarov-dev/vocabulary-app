import FieldController from "@/components/shared/field-controller/FieldController";
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
      <div className="flex flex-col-reverse sm:flex-row gap-x-3">
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
