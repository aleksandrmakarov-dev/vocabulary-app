"use client";
import { useFolderById } from "@/components/entities/folder";
import PageHeader from "@/components/shared/page-header/PageHeader";
import { Alert, AlertTitle, Button } from "@mui/material";
import { CurrentFolderDeleteDialog, CurrentFolderEditorDialog } from "..";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Routing from "@/lib/routing";
import AddIcon from "@mui/icons-material/Add";

interface CurrentFolderPageHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
}

export function CurrentFolderPageHeader(props: CurrentFolderPageHeaderProps) {
  const { id, ...other } = props;

  const { data, isLoading, isError, error } = useFolderById(id);

  return (
    <>
      {isError ? (
        <Alert severity="error">
          <AlertTitle>Failed to load folder</AlertTitle>
          {error?.response?.data.message || "Something went wrong"}
        </Alert>
      ) : (
        <PageHeader
          title={data?.name}
          isLoading={isLoading}
          {...other}
          actions={
            <>
              <CurrentFolderEditorDialog
                id={id}
                trigger={
                  <Button
                    startIcon={<EditIcon />}
                    variant="contained"
                    color="success"
                    disableElevation
                  >
                    Update
                  </Button>
                }
              />
              <CurrentFolderDeleteDialog
                id={id}
                trigger={
                  <Button
                    startIcon={<DeleteIcon />}
                    variant="contained"
                    color="error"
                    disableElevation
                  >
                    Delete
                  </Button>
                }
              />
              <Button
                startIcon={<AddIcon />}
                href={Routing.sets.new(id)}
                variant="contained"
                disableElevation
              >
                New set
              </Button>
            </>
          }
        />
      )}
    </>
  );
}
