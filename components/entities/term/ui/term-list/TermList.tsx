import { GenericErrorResponse } from "@/lib/api";
import { cn } from "@/lib/utils";
import { Alert, AlertTitle } from "@mui/material";
import { Term } from "@prisma/client";

interface TermListProps extends React.HTMLAttributes<HTMLDivElement> {
  terms?: Term[];
  render: (term: Term, index: number) => React.ReactNode;
  isLoading?: boolean;
  isError?: boolean;
  error?: GenericErrorResponse;
  renderSkeleton: (key: number | string) => React.ReactNode;
  skeletonCount: number;
}

export function TermList(props: TermListProps) {
  const {
    terms,
    render,
    error,
    isError,
    isLoading,
    className,
    renderSkeleton,
    skeletonCount,
    ...other
  } = props;

  return (
    <>
      {isError ? (
        <Alert severity="error">
          <AlertTitle>Failed to load folders</AlertTitle>
          {error?.message}
        </Alert>
      ) : (
        <div className={cn("flex flex-col gap-3", className)} {...other}>
          {isLoading ? (
            Array(skeletonCount)
              .fill(1)
              .map((_, i) => renderSkeleton(i))
          ) : terms && terms.length > 0 ? (
            terms.map(render)
          ) : (
            <p className="text-center">No terms found</p>
          )}
        </div>
      )}
    </>
  );
}
