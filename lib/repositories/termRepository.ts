import { Term } from "@prisma/client";
import { EditTermDto, EditTermWithVoiceDto } from "../dto/termDto";
import prisma from "@/lib/prisma";

async function create(data: EditTermWithVoiceDto): Promise<Term | null> {
  const { setId, text, definition, image, definitionVoice, textVoice } = data;

  const createdTerm = await prisma.term.create({
    data: {
      text: text,
      definition: definition,
      image: image,
      setId: setId,
      textVoice: textVoice,
      definitionVoice: definitionVoice,
    },
  });

  await prisma.set.update({
    where: {
      id: setId,
    },
    data: {
      termIDs: {
        push: createdTerm.id,
      },
      updatedAt: new Date(),
    },
  });

  return createdTerm;
}

async function getById(id: string): Promise<Term | null> {
  return await prisma.term.findUnique({
    where: {
      id: id,
    },
  });
}

async function updateById(
  id: string,
  data: EditTermWithVoiceDto
): Promise<Term | null> {
  const { text, definition, image, setId, textVoice, definitionVoice } = data;

  return await prisma.term.update({
    where: {
      id: id,
    },
    data: {
      text: text,
      definition: definition,
      image: image,
      setId: setId,
      textVoice: textVoice,
      definitionVoice: definitionVoice,
      updatedAt: new Date(),
    },
  });
}

async function deleteById(id: string): Promise<Term | null> {
  const deletedTerm = await prisma.term.delete({
    where: {
      id: id,
    },
  });

  if (deletedTerm) {
    const foundSet = await prisma.set.findUnique({
      where: {
        id: deletedTerm.setId,
      },
    });

    if (foundSet) {
      await prisma.set.update({
        where: {
          id: deletedTerm.setId,
        },
        data: {
          termIDs: {
            set: foundSet.termIDs.filter((termId) => termId !== deletedTerm.id),
          },
          updatedAt: new Date(),
        },
      });
    }
  }

  return deletedTerm;
}

export default {
  create,
  getById,
  updateById,
  deleteById,
};
