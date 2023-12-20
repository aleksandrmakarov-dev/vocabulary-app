import {
  TermCard,
  TermCardBody,
  TermCardSkeleton,
  TermList,
} from "@/components/entities/term";
import { GenericErrorResponse } from "@/lib/api";
import { Term } from "@prisma/client";

interface MainTermListProps {
  terms?: Term[];
  isLoading?: boolean;
  isError?: boolean;
  error?: GenericErrorResponse;
}

export function MainTermList(props: MainTermListProps) {
  const { terms, isLoading, isError, error } = props;

  return (
    <TermList
      terms={terms}
      render={(term) => (
        <TermCard key={term.id}>
          <TermCardBody
            text={term.text}
            textVoice={term.textVoice}
            definition={term.definition}
            definitionVoice={term.definitionVoice}
            image={term.image}
          />
        </TermCard>
      )}
      isLoading={isLoading}
      isError={isError}
      error={error}
      renderSkeleton={(key) => <TermCardSkeleton key={key} />}
      skeletonCount={3}
    />
  );
}
