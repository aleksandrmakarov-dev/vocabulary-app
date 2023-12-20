import { Created, withErrorHandler } from "@/lib/api";
import { EditTermDtoSchema } from "@/lib/dto/termDto";
import { NotFoundError } from "@/lib/errors";
import setRepository from "@/lib/repositories/setRepository";
import termRepository from "@/lib/repositories/termRepository";
import googleStorageService from "@/lib/services/googleStorageService";
import googleTextToSpeechService from "@/lib/services/googleTextToSpeechService";
import { NextRequest } from "next/server";

export const POST = withErrorHandler(async (req: NextRequest) => {
  let { text, definition, image, setId } = EditTermDtoSchema.parse(
    await req.json()
  );

  const foundSet = await setRepository.getById(setId);

  if (!foundSet) {
    throw new NotFoundError(`Set with id ${setId} not found`);
  }

  if (image) {
    // const movedFile = await cloudinaryService.moveFile(
    //   body.image,
    //   `sets/${foundSet.id}`
    // );
    // if (!movedFile) {
    //   throw new BadRequestError("Failed to move file");
    // }
    // body.image = movedFile.url;
  }

  const textVoice = await googleTextToSpeechService.voice(
    text,
    foundSet.originalLang
  );

  if (!textVoice) {
    throw new Error("Failed to generate voice for text");
  }

  const textVoiceUrl = await googleStorageService.upload(
    textVoice.name,
    textVoice.buffer,
    foundSet.id
  );

  const definitionVoice = await googleTextToSpeechService.voice(
    definition,
    foundSet.targetLang
  );

  if (!definitionVoice) {
    throw new Error("Failed to generate voice for definition");
  }

  const definitionVoiceUrl = await googleStorageService.upload(
    definitionVoice.name,
    definitionVoice.buffer,
    foundSet.id
  );

  const createdTerm = await termRepository.create({
    text: text,
    definition: definition,
    image: image,
    setId: setId,
    textVoice: textVoiceUrl,
    definitionVoice: definitionVoiceUrl,
  });

  return Created(createdTerm);
});
