import { TermFlipCard } from "@/components/entities/term";
import { VoiceButton } from "@/components/features/term";
import Carousel from "@/components/shared/carousel/Carousel";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "@mui/material";
import { Term } from "@prisma/client";
import { useEffect } from "react";

interface TermCarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  terms: Term[];
}

export function TermCarousel(props: TermCarouselProps) {
  const { terms, className, ...other } = props;

  return (
    <Carousel
      className={cn("w-full", className)}
      items={terms}
      render={(term) => <TermFlipCard key={term.id} term={term} />}
      {...other}
    />
  );
}
