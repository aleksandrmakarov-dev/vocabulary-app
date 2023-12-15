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
      <CardMedia
        component={image ? "img" : "div"}
        height={194}
        image={image ?? undefined}
      >
        {!image && <p>Hello!</p>}
      </CardMedia>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" disableElevation>
          Open
        </Button>
        <div />
        <p>{termsCount} Term(s)</p>
      </CardActions>
    </Card>
  );
}
