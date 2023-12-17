import Image from "next/image";

interface TermCardBodyProps {
  text: string;
  definition: string;
  image: string | null;
}

export function TermCardBody(props: TermCardBodyProps) {
  const { text, definition, image } = props;

  return (
    <div className="flex flex-col sm:grid sm:grid-cols-[1fr_1fr_8rem] gap-x-3 gap-y-1">
      <p className="text-lg font-semibold">{text}</p>
      <p className="text-lg font-semibold">{definition}</p>
      {image && (
        <div className="relative h-44 w-full">
          <Image src={image} alt="image" fill />
        </div>
      )}
    </div>
  );
}
