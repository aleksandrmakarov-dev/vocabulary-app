import { GenericErrorResponse } from "@/lib/api";
import { cn } from "@/lib/utils";
import { Alert, AlertTitle } from "@mui/material";
import { Set } from "@prisma/client";

interface SetListProps extends React.HTMLAttributes<HTMLDivElement> {
  sets?: Set[];
  render: (set: Set) => React.ReactNode;
  isLoading?: boolean;
  isError?: boolean;
  error?: GenericErrorResponse;
  renderSkeleton: (key: number | string) => React.ReactNode;
  skeletonCount: number;
}

export function SetList(props: SetListProps) {
  const {
    sets,
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
        <div
          className={cn(
            "flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-3",
            className
          )}
          {...other}
        >
          {isLoading ? (
            Array(skeletonCount)
              .fill(1)
              .map((_, i) => renderSkeleton(i))
          ) : sets && sets.length > 0 ? (
            sets.map(render)
          ) : (
            <p className="text-center col-span-3">No folders found</p>
          )}
        </div>
      )}
    </>
  );
}
