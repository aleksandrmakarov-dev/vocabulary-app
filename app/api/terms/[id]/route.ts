import { NoContent, withErrorHandler } from "@/lib/api";
import { EditTermDtoSchema } from "@/lib/dto/termDto";
import { NextRequest } from "next/server";
import { BadRequestError, NotFoundError } from "@/lib/errors";
import termRepository from "@/lib/repositories/termRepository";
import googleTextToSpeechService from "@/lib/services/googleTextToSpeechService";
import setRepository from "@/lib/repositories/setRepository";
import googleStorageService from "@/lib/services/googleStorageService";

interface RequestContext {
  params: {
    id: string;
  };
}

export const PUT = withErrorHandler(
  async (req: NextRequest, ctx: RequestContext) => {
    const { text, definition, image, setId } = EditTermDtoSchema.parse(
      await req.json()
    );

    const foundSet = await setRepository.getById(setId);

    if (!foundSet) {
      throw new NotFoundError(`Set with id ${setId} not found`);
    }

    const foundTerm = await termRepository.getById(ctx.params.id);

    if (!foundTerm) {
      throw new NotFoundError(`Term with id ${ctx.params.id} not found`);
    }

    if (image !== foundTerm.image) {
      // if (body.image) {
      //   const movedFile = await cloudinaryService.moveFile(
      //     body.image,
      //     `sets/${foundTerm.setId}`
      //   );
      //   if (!movedFile) {
      //     throw new BadRequestError("Failed to move file");
      //   }
      //   body.image = movedFile.url;
      // }
      // if (foundTerm.image) {
      //   await cloudinaryService.deleteResources([foundTerm.image], "image");
      // }
    }

    let textVoiceUrl = foundTerm.textVoice;

    if (text !== foundTerm.text) {
      const textVoice = await googleTextToSpeechService.voice(
        text,
        foundSet.originalLang
      );

      if (!textVoice) {
        throw new Error("Failed to generate voice for text");
      }

      textVoiceUrl = await googleStorageService.upload(
        textVoice.name,
        textVoice.buffer,
        foundSet.id
      );
    }

    let definitionVoiceUrl = foundTerm.definitionVoice;

    if (definition !== foundTerm.definition) {
      const definitionVoice = await googleTextToSpeechService.voice(
        definition,
        foundSet.targetLang
      );

      if (!definitionVoice) {
        throw new Error("Failed to generate voice for definition");
      }

      definitionVoiceUrl = await googleStorageService.upload(
        definitionVoice.name,
        definitionVoice.buffer,
        foundSet.id
      );
    }

    const updatedTerm = termRepository.updateById(ctx.params.id, {
      text: text,
      definition: definition,
      image: image,
      setId: setId,
      textVoice: textVoiceUrl,
      definitionVoice: definitionVoiceUrl,
    });

    if (!updatedTerm) {
      throw new NotFoundError(`Failed to update term with id ${ctx.params.id}`);
    }

    return NoContent();
  }
);

export const DELETE = withErrorHandler(
  async (req: NextRequest, ctx: RequestContext) => {
    const deletedTerm = await termRepository.deleteById(ctx.params.id);

    if (!deletedTerm) {
      throw new NotFoundError(`Term with id ${ctx.params.id} not found`);
    }

    // if (deletedTerm.image) {
    //   await cloudinaryService.deleteResources([deletedTerm.image], "image");
    // }

    return NoContent();
  }
);
