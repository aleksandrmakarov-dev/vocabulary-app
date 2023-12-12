import { FolderRounded } from "@mui/icons-material";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Skeleton,
} from "@mui/material";

export function FolderCardSkeleton() {
  return (
    <Card variant="outlined">
      <CardHeader
        title={<Skeleton variant="text" sx={{ fontSize: "2.5rem" }} />}
        subheader={<Skeleton variant="text" sx={{ fontSize: "1rem" }} />}
      />
      <CardContent className="bg-gray-200">
        <div className="flex items-center justify-center py-5">
          <FolderRounded className="text-gray-400" sx={{ fontSize: 72 }} />
        </div>
      </CardContent>
      <CardActions className="flex items-center justify-between">
        <Skeleton variant="rounded" height={"2.25rem"} width={"6rem"} />
        <span />
        <Skeleton variant="text" width="4.5rem" sx={{ fontSize: "1.68rem" }} />
      </CardActions>
    </Card>
  );
}
