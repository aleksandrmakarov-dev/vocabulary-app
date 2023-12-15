"use client";
import {
  FolderCard,
  FolderCardSkeleton,
  useFolders,
} from "@/components/entities/folder";
import { FolderList } from "@/components/entities/folder";
import RouterPagination from "@/components/shared/router-pagination/RouterPagination";
import { usePathname } from "next/navigation";

interface MainFolderListProps {
  page: number;
  limit: number;
}

export function MainFolderList(props: MainFolderListProps) {
  const { page, limit } = props;

  const pathname = usePathname();

  const { data, isLoading, isError, isSuccess, error } = useFolders({
    page: page,
    limit: limit,
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
      {isSuccess && data && data.meta.pagesCount > 0 && data.meta.limit && (
        <RouterPagination
          className="mt-5"
          baseUrl={pathname}
          label="Folders"
          page={data.meta.page}
          pagesCount={data.meta.pagesCount}
          limit={data.meta.limit}
          itemsCount={data.meta.itemsCount}
        />
      )}
    </>
  );
}
