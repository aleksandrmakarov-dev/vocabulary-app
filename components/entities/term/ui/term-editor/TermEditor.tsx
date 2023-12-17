"use client";
import { GenericErrorResponse } from "@/lib/api";
import { TermEditFields } from "../..";
import { Term } from "@prisma/client";
import { EditTermDto, EditTermDtoSchema } from "@/lib/dto/termDto";
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";
import LoadingButton from "@/components/shared/loading-button/LoadingButton";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";

interface TermEditorProps {
  edit?: boolean;
  term?: Term;
  setId?: string;
  isLoading?: boolean;
  isError?: boolean;
  error?: GenericErrorResponse;
  submit: (data: EditTermDto, reset: () => void) => void;
  cancel?: (reset: () => void) => void;
}

export function TermEditor(props: TermEditorProps) {
  const { term, edit, setId, isLoading, isError, error, submit, cancel } =
    props;

  const { handleSubmit, control, reset } = useForm<EditTermDto>({
    resolver: zodResolver(EditTermDtoSchema),
    defaultValues: term
      ? term
      : {
          text: "",
          definition: "",
          setId: setId,
          image: null,
        },
    values: term,
  });

  return (
    <form onSubmit={handleSubmit((e) => submit(e, reset))}>
      <div className="flex flex-col sm:grid sm:grid-cols-[1fr_1fr_8rem] gap-x-3 gap-y-1">
        <TermEditFields control={control} />
      </div>
      <div className="flex flex-col-reverse mt-5 gap-x-3 gap-y-1 sm:flex-row sm:justify-end">
        {edit && (
          <Button disabled={isLoading} onClick={() => cancel?.(reset)}>
            Cancel
          </Button>
        )}
        <LoadingButton
          loading={isLoading}
          variant="contained"
          disableElevation
          type="submit"
        >
          {edit ? "Save changes" : "Create"}
        </LoadingButton>
      </div>
    </form>
  );
}
