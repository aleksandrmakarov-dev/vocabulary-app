import { Card, CardHeader, Divider, CardContent } from "@mui/material";

interface TermCardProps {
  title: string | React.ReactNode;
  action?: React.ReactNode;
  children: React.ReactNode;
}

export function TermCard(props: TermCardProps) {
  const { title, action, children } = props;

  return (
    <Card variant="outlined">
      {(title || action) && (
        <>
          <CardHeader title={title} action={action} />
          <Divider />
        </>
      )}
      <CardContent>{children}</CardContent>
    </Card>
  );
}
