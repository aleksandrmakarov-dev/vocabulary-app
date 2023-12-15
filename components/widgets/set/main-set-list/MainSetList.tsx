"use client";
import { SetList, SetCardSkeleton, useSets } from "@/components/entities/set";
import { useSetsByFolderId } from "@/components/entities/set/api/setApi";
import { SetCard } from "@/components/entities/set/ui/set-card/SetCard";
import RouterPagination from "@/components/shared/router-pagination/RouterPagination";
import { useSearchParams, usePathname } from "next/navigation";

interface MainSetListProps {
  page: number;
  limit: number;
  folderId: string;
}

export const MainSetList = (props: MainSetListProps) => {
  const { page, limit, folderId } = props;
  const pathname = usePathname();

  const { data, isLoading, isError, isSuccess, error } = useSetsByFolderId({
    page: page,
    limit: limit,
    folderId: folderId,
  });

  return (
    <>
      <SetList
        sets={data?.data}
        render={(set) => (
          <SetCard key={set.id} {...set} termsCount={set.termIDs.length} />
        )}
        renderSkeleton={(key) => <SetCardSkeleton key={key} />}
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
};
