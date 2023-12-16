"use client";
import { SetEditor, useSetById } from "@/components/entities/set";
import { useUpdateSetById } from "@/components/features/set";
import { EditSetDto } from "@/lib/dto/setDto";
import { NewTermEditor } from "../../term";
import PageSubheader from "@/components/shared/page-subheader/PageSubheader";

interface CurrentSetEditorProps {
  setId: string;
}

export function CurrentSetEditor(props: CurrentSetEditorProps) {
  const { setId } = props;

  const {
    data,
    isLoading: isDataLoading,
    isError: isDataError,
    error: dataError,
  } = useSetById(setId);

  const { mutate, isPending, isError, error } = useUpdateSetById();

  const onSumbit = (values: EditSetDto) => {
    mutate(
      { id: setId, values: values },
      {
        onSuccess: () => {
          console.log("success");
        },
      }
    );
  };

  return (
    <>
      <SetEditor
        edit
        set={data}
        submit={onSumbit}
        isLoading={isPending || isDataLoading}
        isError={isError || isDataError}
        error={error?.response?.data || dataError?.response?.data}
      />
      <PageSubheader title="Terms" />
      <NewTermEditor setId={setId} />
    </>
  );
}
