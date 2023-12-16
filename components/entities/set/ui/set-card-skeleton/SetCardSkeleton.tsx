import { formatDate } from "@/lib/utils";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Skeleton,
  Typography,
} from "@mui/material";
import Image from "next/image";
import ArticleIcon from "@mui/icons-material/Article";
import image from "next/image";

export function SetCardSkeleton() {
  return (
    <Card variant="outlined">
      <CardHeader
        title={<Skeleton variant="text" sx={{ fontSize: "2.5rem" }} />}
        subheader={<Skeleton variant="text" sx={{ fontSize: "1rem" }} />}
      />
      <Skeleton variant="rectangular" height={"11rem"} />
      <CardContent>
        <Skeleton variant="text" sx={{ fontSize: "0.75rem" }} />
      </CardContent>
      <CardActions className="flex items-center justify-between">
        <Skeleton variant="rounded" height={"2.25rem"} width={"6rem"} />
        <Skeleton variant="text" width="4.5rem" sx={{ fontSize: "1.68rem" }} />
      </CardActions>
    </Card>
  );
}
