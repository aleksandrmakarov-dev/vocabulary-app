"use client";
import { Set } from "@prisma/client";
import { SetEditFields } from "../set-edit-fields/SetEditFields";
import { EditSetDto, EditSetDtoSchema } from "@/lib/dto/setDto";
import { GenericErrorResponse } from "@/lib/api";
import { useForm } from "react-hook-form";
import { Alert, Button } from "@mui/material";
import LoadingButton from "@/components/shared/loading-button/LoadingButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { CurrentSetDeleteDialog } from "@/components/widgets/set";

interface SetEditorProps {
  edit?: boolean;
  set?: Set;
  folderId?: string;
  isLoading?: boolean;
  isError?: boolean;
  error?: GenericErrorResponse;
  submit: (data: EditSetDto) => void;
}

export function SetEditor(props: SetEditorProps) {
  const { set, edit, folderId, isLoading, isError, error, submit } = props;

  const { handleSubmit, control } = useForm<EditSetDto>({
    resolver: zodResolver(EditSetDtoSchema),
    defaultValues: {
      name: "",
      description: "",
      originalLang: "",
      targetLang: "",
      folderId: folderId,
      image: null,
    },
    values: set,
  });

  return (
    <>
      {isError && <Alert severity="error">{error?.message}</Alert>}
      <form onSubmit={handleSubmit(submit)}>
        <SetEditFields control={control} />
        <div className="flex flex-col-reverse sm:flex-row sm:items-center gap-x-3 gap-y-3 justify-end mt-3">
          {edit && set && (
            <CurrentSetDeleteDialog
              id={set.id}
              trigger={
                <Button
                  disabled={isLoading}
                  variant="contained"
                  color="error"
                  disableElevation
                >
                  Delete
                </Button>
              }
            />
          )}
          <LoadingButton
            loading={isLoading}
            type="submit"
            variant="contained"
            disableElevation
          >
            {edit ? "Save changes" : "Create"}
          </LoadingButton>
        </div>
      </form>
    </>
  );
}
