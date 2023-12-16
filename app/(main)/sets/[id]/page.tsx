"use client";
import { useSetById } from "@/components/entities/set";
import PageHeader from "@/components/shared/page-header/PageHeader";

interface SetPageContext {
  params: {
    id: string;
  };
}

export default function SetPage(ctx: SetPageContext) {
  const {
    data: set,
    isLoading: isSetLoading,
    isError: isSetError,
    error: setError,
  } = useSetById(ctx.params.id);

  return (
    <>
      <PageHeader title={set?.name} isLoading={isSetLoading} />
    </>
  );
}
