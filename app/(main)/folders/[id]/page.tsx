import { CurrentFolderPageHeader } from "@/components/widgets/folder";

interface FolderPageContext {
  params: {
    id: string;
  };
}

export default function Folder(ctx: FolderPageContext) {
  return (
    <>
      <CurrentFolderPageHeader id={ctx.params.id} />
    </>
  );
}
