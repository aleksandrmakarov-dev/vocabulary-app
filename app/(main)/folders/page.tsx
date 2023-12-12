import PageHeader from "@/components/shared/page-header/PageHeader";
import { MainFolderList } from "@/components/widgets/folder";

export default function Folders() {
  return (
    <>
      <PageHeader title="Folders" />
      <MainFolderList />
    </>
  );
}
