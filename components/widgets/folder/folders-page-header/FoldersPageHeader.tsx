"use client";
import PageHeader from "@/components/shared/page-header/PageHeader";
import { Button } from "@mui/material";
import { NewFolderEditorDialog } from "..";

export function FoldersPageHeader() {
  return (
    <PageHeader
      title="Folders"
      actions={
        <NewFolderEditorDialog
          trigger={
            <Button variant="contained" disableElevation>
              Create
            </Button>
          }
        />
      }
    />
  );
}
