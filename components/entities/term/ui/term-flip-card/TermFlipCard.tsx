"use client";
import { VoiceButton } from "@/components/features/term";
import { Card, CardHeader, CardContent } from "@mui/material";
import { Term } from "@prisma/client";
import { useState } from "react";
import { boolean } from "zod";

interface TermFlipCardProps {
  term: Term;
}

export function TermFlipCard(props: TermFlipCardProps) {
  const {
    term: { text, textVoice, definition, definitionVoice, image },
  } = props;

  const [flip, setFlip] = useState<boolean>(false);

  const onFlip = () => setFlip(!flip);

  return (
    <Card variant="outlined" className="w-full h-96">
      <CardHeader
        action={<VoiceButton url={flip ? definitionVoice : textVoice} />}
      />
      <CardContent
        className="flex items-center justify-center h-full cursor-pointer"
        onClick={onFlip}
      >
        <p className="text-lg font-semibold">{flip ? definition : text}</p>
      </CardContent>
    </Card>
  );
}
