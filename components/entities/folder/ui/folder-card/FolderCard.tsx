import { FolderRounded, OpenInNewRounded } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
} from "@mui/material";
import Routing from "@/lib/routing";
import { formatDate } from "@/lib/utils";

interface FolderCardProps {
  id: string;
  name: string;
  createdAt: Date;
  setsCount: number;
}

export function FolderCard(props: FolderCardProps) {
  const { id, name, createdAt, setsCount } = props;

  return (
    <Card variant="outlined">
      <CardHeader title={name} subheader={formatDate(createdAt)} />
      <CardContent className="bg-gray-200">
        <div className="flex items-center justify-center py-5">
          <FolderRounded className="text-gray-400" sx={{ fontSize: 72 }} />
        </div>
      </CardContent>
      <CardActions className="flex items-center justify-between">
        <Button
          variant="contained"
          disableElevation
          startIcon={<OpenInNewRounded />}
          href={Routing.folders.id(id)}
        >
          Open
        </Button>
        <span />
        <p>{setsCount} Set(s)</p>
      </CardActions>
    </Card>
  );
}
