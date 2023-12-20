"use client";
import { TermCard, TermCardBody, TermEditor } from "@/components/entities/term";
import { EditTermDto } from "@/lib/dto/termDto";
import { Term } from "@prisma/client";
import {
  Card,
  CardHeader,
  Divider,
  CardContent,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useUpdateTermById } from "@/components/features/term/update/api/updateApi";
import { useQueryClient } from "@tanstack/react-query";
import { setKeys } from "@/components/entities/set";
import { SetWithTerms } from "@/lib/prisma";
import { CurrentTermDeleteDialog } from "..";

interface CurrentTermEditorProps {
  index: number;
  term: Term;
}

export function CurrentTermEditor(props: CurrentTermEditorProps) {
  const { term, index } = props;

  const queryClient = useQueryClient();
  const [editing, setEditing] = useState<boolean>(false);

  const { mutate, isPending, isError, error } = useUpdateTermById();

  const onSubmit = (values: EditTermDto) => {
    mutate(
      { id: term.id, values: values },
      {
        onSuccess: () => {
          console.log("success");
          setEditing(false);

          const queryKey = setKeys.set.id(term.setId);
          queryClient.cancelQueries({ queryKey: queryKey });

          queryClient.setQueryData<SetWithTerms>(queryKey, (prev) => {
            if (prev) {
              return {
                ...prev,
                terms: prev.terms.map((t) =>
                  t.id === term.id
                    ? {
                        ...term,
                        text: values.text,
                        definition: values.definition,
                        image: values.image,
                      }
                    : t
                ),
              };
            }

            return prev;
          });
        },
        onError: (e) => {
          console.log("error");
        },
      }
    );
  };

  const onEdit = () => {
    setEditing(true);
  };

  const onCancel = (reset: () => void) => {
    reset();
    setEditing(false);
  };

  return (
    <TermCard
      title={index.toString()}
      action={
        <>
          {!editing && (
            <div className="space-x-3">
              <IconButton size="small" onClick={onEdit}>
                <EditIcon />
              </IconButton>
              <CurrentTermDeleteDialog
                id={term.id}
                setId={term.setId}
                trigger={
                  <IconButton size="small">
                    <DeleteIcon />
                  </IconButton>
                }
              />
            </div>
          )}
        </>
      }
    >
      {editing ? (
        <TermEditor
          edit
          term={term}
          submit={onSubmit}
          isLoading={isPending}
          isError={isError}
          error={error?.response?.data}
          cancel={onCancel}
        />
      ) : (
        <TermCardBody
          text={term.text}
          textVoice={term.textVoice}
          definition={term.definition}
          definitionVoice={term.definitionVoice}
          image={term.image}
        />
      )}
    </TermCard>
  );
}
