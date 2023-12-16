import { formatDate } from "@/lib/utils";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import Image from "next/image";
import ArticleIcon from "@mui/icons-material/Article";
import Routing from "@/lib/routing";

interface SetCardProps {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  image: string | null;
  termsCount: number;
}

export function SetCard(props: SetCardProps) {
  const { id, name, description, createdAt, image, termsCount } = props;

  return (
    <Card variant="outlined">
      <CardHeader title={name} subheader={formatDate(createdAt)} />
      <div className="w-full h-44 relative bg-gray-200">
        {image ? (
          <Image src={image} alt={name} className="object-cover" fill />
        ) : (
          <div className="h-full w-full flex items-center justify-center p-5">
            <ArticleIcon className="text-gray-400" sx={{ fontSize: 72 }} />
          </div>
        )}
      </div>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions className="flex items-center justify-between">
        <Button href={Routing.sets.id(id)} variant="contained" disableElevation>
          Open
        </Button>
        <p>{termsCount} Term(s)</p>
      </CardActions>
    </Card>
  );
}
