import { Skeleton } from "@mui/material";
import { TermCard } from "../..";

interface TermCardSkeletonProps {
  renderTitle?: boolean;
}

export function TermCardSkeleton(props: TermCardSkeletonProps) {
  const { renderTitle } = props;

  return (
    <TermCard
      title={
        renderTitle && (
          <Skeleton
            variant="text"
            className="w-1/3"
            sx={{ fontSize: "3.5rem" }}
          />
        )
      }
    >
      <div className="flex flex-col sm:grid sm:grid-cols-[1fr_1fr_8rem] gap-x-3 gap-y-1">
        <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
        <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
        <Skeleton className="h-44 w-full" />
      </div>
    </TermCard>
  );
}
