import PageHeader from "@/components/shared/page-header/PageHeader";
import { NewSetEditor } from "@/components/widgets/set";

interface NewSetPageContext {
  searchParams: {
    folderId: string;
  };
}

export default function NewSetPage(ctx: NewSetPageContext) {
  const {
    searchParams: { folderId },
  } = ctx;

  return (
    <>
      <PageHeader title="New Set" />
      <NewSetEditor folderId={folderId} />
    </>
  );
}
