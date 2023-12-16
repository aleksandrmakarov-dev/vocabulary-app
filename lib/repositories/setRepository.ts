import { PagedResponse } from "../api";
import { EditSetDto, GetSetListDto } from "../dto/setDto";
import prisma from "../prisma";
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

async function create(body: EditSetDto): Promise<Set> {
  const { name, description, image, folderId } = body;

  const createdSet = await prisma.set.create({
    data: {
      name: name,
      description: description,
      image: image,
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
    },
  });

  return createdSet;
}

async function getById(id: string): Promise<Set | null> {
  return await prisma.set.findUnique({
    where: {
      id: id,
    },
  });
}

export default { getListByFolderId, create, getById };
