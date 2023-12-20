import { PagedResponse } from "../api";
import { EditSetDto, GetSetListDto } from "../dto/setDto";
import prisma, { SetWithTerms } from "../prisma";
import { Set } from "@prisma/client";

async function getListByFolderId(
  params: GetSetListDto
): Promise<PagedResponse<Set>> {
  const { page = 1, limit, folderId } = params;
  const where = folderId ? { folderId: folderId } : {};
  const count = await prisma.set.count({
    where: where,
  });
  const skip = (page - 1) * (limit ?? 0);

  const foundSets = await prisma.set.findMany({
    where: where,
    skip: skip,
    ...(limit && { take: limit }),
    orderBy: {
      createdAt: "desc",
    },
  });

  return {
    data: foundSets,
    meta: {
      page: page,
      limit: limit,
      itemsCount: count,
      pagesCount: Math.ceil(count / (limit ?? count)),
    },
  };
}

async function create(body: EditSetDto): Promise<Set | null> {
  const { name, description, image, originalLang, targetLang, folderId } = body;

  const createdSet = await prisma.set.create({
    data: {
      name: name,
      description: description,
      image: image,
      originalLang: originalLang,
      targetLang: targetLang,
      folderId: folderId,
    },
  });

  await prisma.folder.update({
    where: {
      id: folderId,
    },
    data: {
      setIDs: {
        push: createdSet.id,
      },
      updatedAt: new Date(),
    },
  });

  return createdSet;
}

async function getById(id: string): Promise<SetWithTerms | null> {
  return await prisma.set.findUnique({
    where: {
      id: id,
    },
    include: {
      terms: true,
    },
  });
}

async function updateById(id: string, data: EditSetDto): Promise<Set | null> {
  const { name, description, image, originalLang, targetLang, folderId } = data;

  const updatedSet = await prisma.set.update({
    where: {
      id: id,
    },
    data: {
      name: name,
      description: description,
      image: image,
      originalLang: originalLang,
      targetLang: targetLang,
      updatedAt: new Date(),
    },
  });

  return updatedSet;
}

async function deleteById(id: string): Promise<Set | null> {
  const deleteSet = await prisma.set.delete({
    where: {
      id: id,
    },
  });

  if (deleteSet) {
    const foundFolder = await prisma.folder.findUnique({
      where: {
        id: deleteSet.folderId,
      },
    });

    if (foundFolder) {
      await prisma.folder.update({
        where: {
          id: deleteSet.folderId,
        },
        data: {
          setIDs: {
            set: foundFolder.setIDs.filter((set) => set !== deleteSet.id),
          },
        },
      });
    }
  }

  return deleteSet;
}

export default { getListByFolderId, create, getById, updateById, deleteById };
