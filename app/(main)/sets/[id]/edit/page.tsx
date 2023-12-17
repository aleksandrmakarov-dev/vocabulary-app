import PageHeader from "@/components/shared/page-header/PageHeader";
import { CurrentSetEditor } from "@/components/widgets/set";

interface SetEditPageContext {
  params: {
    id: string;
  };
}

export default function SetEditPage(ctx: SetEditPageContext) {
  const {
    params: { id },
  } = ctx;

  return (
    <div className="space-y-3">
      <PageHeader title="Update set" />
      <CurrentSetEditor setId={id} />
    </div>
  );
}
