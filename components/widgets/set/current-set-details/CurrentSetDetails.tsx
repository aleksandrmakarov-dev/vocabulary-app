"use client";
import { useSetById } from "@/components/entities/set";
import PageHeader from "@/components/shared/page-subheader/PageSubheader";
import { MainTermList, TermCarousel } from "../../term";

interface CurrentSetDetailsProps {
  id: string;
}

export function CurrentSetDetails(props: CurrentSetDetailsProps) {
  const { id } = props;

  const { data, isLoading, isError, error } = useSetById(id);

  return (
    <div className="max-w-screen-md">
      <PageHeader title={data?.name} isLoading={isLoading} />
      {data?.terms && data?.terms.length > 0 && (
        <TermCarousel className="mb-5 mx-auto" terms={data.terms} />
      )}
      <MainTermList
        terms={data?.terms}
        isLoading={isLoading}
        isError={isError}
        error={error?.response?.data}
      />
    </div>
  );
}
