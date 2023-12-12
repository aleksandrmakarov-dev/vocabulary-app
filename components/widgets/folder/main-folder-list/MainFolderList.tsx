"use client";
import {
  FolderCard,
  FolderCardSkeleton,
  useFolders,
} from "@/components/entities/folder";
import { FolderList } from "@/components/entities/folder";
import RouterPagination from "@/components/shared/router-pagination/RouterPagination";
import { usePathname, useSearchParams } from "next/navigation";

export function MainFolderList() {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const { data, isLoading, isError, isSuccess, error } = useFolders({
    page: Number(searchParams.get("page") ?? 1),
    limit: Number(searchParams.get("limit") ?? 6),
  });

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
        renderSkeleton={(key) => <FolderCardSkeleton key={key} />}
        skeletonCount={6}
        isLoading={isLoading}
        isError={isError}
        error={error?.response?.data}
      />
      {isSuccess && data && data.meta.pagesCount > 0 && (
        <RouterPagination
          className="mt-5"
          baseUrl={pathname}
          label="Folders"
          {...data.meta}
        />
      )}
    </>
  );
}
