import { FoldersPageHeader, MainFolderList } from "@/components/widgets/folder";

interface FoldersPageContext {
  searchParams: {
    page?: number;
    limit?: number;
  };
}

export default function Folders(ctx: FoldersPageContext) {
  const {
    searchParams: { page = 1, limit = 6 },
  } = ctx;

  return (
    <>
      <FoldersPageHeader />
      <MainFolderList page={page} limit={limit} />
    </>
  );
}
