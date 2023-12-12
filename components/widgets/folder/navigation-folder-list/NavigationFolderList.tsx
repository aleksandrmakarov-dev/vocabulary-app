"use client";
import { FolderCard, useFolders } from "@/components/entities/folder";
import { FolderList } from "@/components/entities/folder";

export function NavigationFolderList() {
  const { data, isLoading, isError, isSuccess, error } = useFolders({});

  return (
    <>
      <FolderList
        folders={data?.data}
        render={(folder) => (
          <FolderCard
            key={folder.id}
            {...folder}
            setsCount={folder.setIDs.length}
          />
        )}
        isLoading={isLoading}
        isError={isError}
        error={error?.response?.data}
      />
    </>
  );
}
