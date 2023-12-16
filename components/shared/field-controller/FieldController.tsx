import { FormHelperText, InputLabel } from "@mui/material";
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
} from "react-hook-form";

interface FieldControllerProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends ControllerProps<TFieldValues, TName> {
  label?: string;
  helperText?: string;
}

const FieldController = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  props: FieldControllerProps<TFieldValues, TName>
) => {
  const { control, name, label, helperText, render, ...other } = props;

  return (
    <Controller
      control={control}
      name={name}
      render={(values) => (
        <div className="mb-2">
          {label && <InputLabel className="mb-2">{label}</InputLabel>}
          {render(values)}
          {(values.fieldState.error || helperText) && (
            <FormHelperText error={values.fieldState.error !== undefined}>
              {values.fieldState.error?.message ?? helperText}
            </FormHelperText>
          )}
        </div>
      )}
      {...other}
    />
  );
};

export default FieldController;
