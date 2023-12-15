import { CurrentFolderPageHeader } from "@/components/widgets/folder";
import { MainSetList } from "@/components/widgets/set";

interface FolderPageContext {
  params: {
    id: string;
  };
  searchParams: {
    page?: number;
    limit?: number;
  };
}

export default function Folder(ctx: FolderPageContext) {
  const {
    params: { id },
    searchParams: { page = 1, limit = 6 },
  } = ctx;

  return (
    <>
      <CurrentFolderPageHeader id={ctx.params.id} />
      <MainSetList folderId={ctx.params.id} page={page} limit={limit} />
    </>
  );
}
