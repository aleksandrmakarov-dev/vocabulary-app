import { TermCardSkeleton, TermList } from "@/components/entities/term";
import { GenericErrorResponse } from "@/lib/api";
import { Term } from "@prisma/client";
import { CurrentTermEditor } from "../current-term-editor/CurrentTermEditor";

interface TermEditListProps {
  terms?: Term[];
  isLoading?: boolean;
  isError?: boolean;
  error?: GenericErrorResponse;
}

export function TermEditList(props: TermEditListProps) {
  const { terms, isLoading, isError, error } = props;

  return (
    <TermList
      terms={terms}
      render={(term, index) => (
        <CurrentTermEditor key={term.id} index={index + 1} term={term} />
      )}
      isLoading={isLoading}
      isError={isError}
      error={error}
      renderSkeleton={(key) => <TermCardSkeleton key={key} renderTitle />}
      skeletonCount={3}
    />
  );
}
