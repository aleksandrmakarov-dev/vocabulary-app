"use client";
import { VoiceButton } from "@/components/features/term";
import { Card, CardHeader, CardContent } from "@mui/material";
import { Term } from "@prisma/client";
import Image from "next/image";
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
    <Card variant="outlined" className="w-full">
      <CardHeader
        action={<VoiceButton url={flip ? definitionVoice : textVoice} />}
      />
      <CardContent className="h-[28rem]" onClick={onFlip}>
        <div className="flex flex-col h-full items-center justify-center cursor-pointer gap-y-3">
          {image && flip && (
            <div className="w-96 h-72 relative">
              <Image
                className="object-cover object-center"
                src={image}
                alt="img"
                fill
              />
            </div>
          )}
          <p className="text-lg font-semibold">{flip ? definition : text}</p>
        </div>
      </CardContent>
    </Card>
  );
}
