"use client";
import { TermCard, TermEditor } from "@/components/entities/term";
import { EditTermDto } from "@/lib/dto/termDto";
import { useCreateTerm } from "@/components/features/term";
import { setKeys } from "@/components/entities/set";
import { useQueryClient } from "@tanstack/react-query";
import { SetWithTerms } from "@/lib/prisma";

interface NewTermEditorProps {
  setId?: string;
}

export function NewTermEditor(props: NewTermEditorProps) {
  const { setId } = props;

  const queryClient = useQueryClient();
  const { mutate, isPending, isError, error } = useCreateTerm();

  const onSubmit = (values: EditTermDto, reset: () => void) => {
    mutate(values, {
      onSuccess: (createdTerm) => {
        console.log("success");
        reset();

        const queryKey = setKeys.set.id(setId!);
        queryClient.cancelQueries({ queryKey: queryKey });

        queryClient.setQueryData<SetWithTerms>(queryKey, (prev) => {
          if (prev) {
            return {
              ...prev,
              terms: [...prev.terms, createdTerm],
            };
          }

          return prev;
        });
      },
      onError: () => {
        console.log("error");
      },
    });
  };

  return (
    <TermCard title="New term">
      <TermEditor
        setId={setId}
        submit={onSubmit}
        isLoading={isPending}
        isError={isError}
        error={error?.response?.data}
      />
    </TermCard>
  );
}
