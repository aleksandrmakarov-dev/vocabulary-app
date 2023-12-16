"use client";
import { GenericErrorResponse } from "@/lib/api";
import { TermEditFields } from "../..";
import { Term } from "@prisma/client";
import { EditTermDto } from "@/lib/dto/termDto";
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";
import LoadingButton from "@/components/shared/loading-button/LoadingButton";

interface TermEditorProps {
  edit?: boolean;
  term?: Term;
  setId?: string;
  isLoading?: boolean;
  isError?: boolean;
  error?: GenericErrorResponse;
  submit: (data: EditTermDto) => void;
}

export function TermEditor(props: TermEditorProps) {
  const { term, edit, setId, isLoading, isError, error, submit } = props;

  const { handleSubmit, control } = useForm<EditTermDto>({
    defaultValues: {
      text: "",
      definition: "",
      setId: setId,
      image: null,
    },
    values: term,
  });

  return (
    <form onSubmit={handleSubmit(submit)}>
      <div className="flex flex-col sm:grid sm:grid-cols-[1fr_1fr_8rem] gap-x-3 gap-y-1">
        <TermEditFields control={control} />
      </div>
      <div className="flex flex-col-reverse mt-5 gap-x-3 gap-y-1 sm:flex-row sm:justify-end">
        {edit && <Button>Cancel</Button>}
        <LoadingButton variant="contained" disableElevation>
          {edit ? "Save changes" : "Create"}
        </LoadingButton>
      </div>
    </form>
  );
}
