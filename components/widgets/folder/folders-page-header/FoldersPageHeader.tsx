"use client";
import PageHeader from "@/components/shared/page-header/PageHeader";
import { Button } from "@mui/material";
import { NewFolderEditorDialog } from "..";
import AddIcon from "@mui/icons-material/Add";

export function FoldersPageHeader() {
  return (
    <PageHeader
      title="Folders"
      actions={
        <NewFolderEditorDialog
          trigger={
            <Button
              startIcon={<AddIcon />}
              variant="contained"
              disableElevation
            >
              New Folder
            </Button>
          }
        />
      }
    />
  );
}
