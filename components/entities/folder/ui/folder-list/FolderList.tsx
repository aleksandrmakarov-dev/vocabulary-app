import { GenericErrorResponse } from "@/lib/api";
import { cn } from "@/lib/utils";
import { Alert, AlertTitle } from "@mui/material";
import { Folder } from "@prisma/client";

interface FolderListProps extends React.HTMLAttributes<HTMLDivElement> {
  folders?: Folder[];
  render: (folder: Folder) => React.ReactNode;
  isLoading?: boolean;
  isError?: boolean;
  error?: GenericErrorResponse;
  renderSkeleton: (key: number | string) => React.ReactNode;
  skeletonCount: number;
}

export function FolderList(props: FolderListProps) {
  const {
    folders,
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
          ) : folders && folders.length > 0 ? (
            folders.map(render)
          ) : (
            <p>No folders found</p>
          )}
        </div>
      )}
    </>
  );
}
