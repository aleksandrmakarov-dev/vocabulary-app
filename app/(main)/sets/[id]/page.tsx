import { CurrentSetDetails } from "@/components/widgets/set";
import { MainTermList } from "@/components/widgets/term";

interface SetPageContext {
  params: {
    id: string;
  };
}

export default function SetPage(ctx: SetPageContext) {
  return <CurrentSetDetails id={ctx.params.id} />;
}
