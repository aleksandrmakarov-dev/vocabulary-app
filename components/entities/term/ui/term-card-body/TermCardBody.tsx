import { VoiceButton } from "@/components/features/term";
import Image from "next/image";

interface TermCardBodyProps {
  text: string;
  textVoice: string;
  definition: string;
  definitionVoice: string;
  image: string | null;
}

export function TermCardBody(props: TermCardBodyProps) {
  const { text, definition, image, textVoice, definitionVoice } = props;

  return (
    <div className="flex flex-col sm:grid sm:grid-cols-[1fr_0.5px_1fr_0.5px_8rem] gap-x-3 gap-y-1">
      <div className="flex gap-x-3 justify-between items-start">
        <p className="text-lg">{text}</p>
        <VoiceButton url={textVoice} />
      </div>
      <div className="bg-gray-200 h-full" />
      <div className="flex gap-x-3 justify-between items-start">
        <p className="text-lg">{definition}</p>
        <VoiceButton url={definitionVoice} />
      </div>
      {image && (
        <>
          <div className="bg-gray-200 h-full" />
          <div className="relative h-24 w-full">
            <Image
              className="object-cover object-center"
              src={image}
              alt="image"
              fill
            />
          </div>
        </>
      )}
    </div>
  );
}
