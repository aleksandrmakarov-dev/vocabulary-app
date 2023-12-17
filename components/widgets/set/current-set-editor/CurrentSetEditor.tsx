"use client";
import { SetEditor, useSetById } from "@/components/entities/set";
import { useUpdateSetById } from "@/components/features/set";
import { EditSetDto } from "@/lib/dto/setDto";
import { CurrentTermEditor, NewTermEditor } from "../../term";
import PageSubheader from "@/components/shared/page-subheader/PageSubheader";
import { TermCardSkeleton, TermList } from "@/components/entities/term";

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
        onError: () => {
          console.log("error");
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
      <TermList
        terms={data?.terms}
        render={(term, index) => (
          <CurrentTermEditor key={term.id} index={index + 1} term={term} />
        )}
        isLoading={isDataLoading}
        isError={isDataError}
        error={dataError?.response?.data}
        renderSkeleton={(key) => <TermCardSkeleton key={key} renderTitle />}
        skeletonCount={3}
      />
      <NewTermEditor setId={setId} />
    </>
  );
}
