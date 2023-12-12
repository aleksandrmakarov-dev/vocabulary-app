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
}

export function FolderList(props: FolderListProps) {
  const { folders, render, error, isError, isLoading, className, ...other } =
    props;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !folders) {
    return (
      <Alert severity="error">
        <AlertTitle>Failed to load folders</AlertTitle>
        {error?.message}
      </Alert>
    );
  }

  if (folders.length === 0) {
    return <div>No folders found</div>;
  }

  return (
    <div
      className={cn(
        "flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-3",
        className
      )}
      {...other}
    >
      {folders.map((folder) => render(folder))}
    </div>
  );
}
