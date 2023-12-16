"use client";
import { TermEditor } from "@/components/entities/term";
import { EditTermDto } from "@/lib/dto/termDto";
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface NewTermEditorProps {
  index?: number;
  setId?: string;
}

export function NewTermEditor(props: NewTermEditorProps) {
  const { setId, index } = props;

  const onSubmit = (values: EditTermDto) => {};

  return (
    <Card variant="outlined">
      <CardHeader
        title={index ?? "New term"}
        action={
          <IconButton size="small">
            <DeleteIcon />
          </IconButton>
        }
      />
      <Divider />
      <CardContent>
        <TermEditor setId={setId} submit={onSubmit} />
      </CardContent>
    </Card>
  );
}
