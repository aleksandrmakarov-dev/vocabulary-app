import { EditTermDto } from "../dto/termDto";
import prisma from "@/lib/prisma";

async function create(data: EditTermDto) {
  const { setId, text, definition, image } = data;

  const createdTerm = await prisma.term.create({
    data: {
      text: text,
      definition: definition,
      image: image,
      setId: setId,
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

async function getById(id: string) {
  return await prisma.term.findUnique({
    where: {
      id: id,
    },
  });
}

async function updateById(id: string, data: EditTermDto) {
  const { text, definition, image, setId } = data;

  return await prisma.term.update({
    where: {
      id: id,
    },
    data: {
      text: text,
      definition: definition,
      image: image,
      setId: setId,
      updatedAt: new Date(),
    },
  });
}

export default {
  create,
  getById,
  updateById,
};
