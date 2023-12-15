import { Folder } from "@prisma/client";
import { PagedResponse } from "../api";
import prisma from "../prisma";
import { EditFolderDto, GetFolderListDto } from "../dto/folderDto";

// Get Folder List

async function getList(
  params: GetFolderListDto
): Promise<PagedResponse<Folder>> {
  const { page = 1, limit } = params;
  const count = await prisma.folder.count();
  const skip = (page - 1) * (limit ?? 0);

  const foundFolders = await prisma.folder.findMany({
    skip: skip,
    ...(limit && { take: limit }),
    orderBy: {
      createdAt: "desc",
    },
  });

  return {
    data: foundFolders,
    meta: {
      page: page,
      limit: limit,
      itemsCount: count,
      pagesCount: Math.ceil(count / (limit ?? count)),
    },
  };
}

// Create Folder

async function create(body: EditFolderDto): Promise<Folder> {
  const createdFolder = await prisma.folder.create({
    data: {
      name: body.name,
    },
  });

  return createdFolder;
}

// Update Folder

async function updateById(id: string, body: EditFolderDto): Promise<Folder> {
  const updatedFolder = await prisma.folder.update({
    where: {
      id: id,
    },
    data: {
      name: body.name,
      updatedAt: new Date(),
    },
  });

  return updatedFolder;
}

// Get Folder By Id

async function getById(id: string): Promise<Folder | null> {
  const foundFolder = await prisma.folder.findUnique({
    where: {
      id: id,
    },
  });

  return foundFolder;
}

// Delete Folder By Id

export async function deleteById(id: string): Promise<Folder> {
  const deletedFolder = await prisma.folder.delete({
    where: {
      id: id,
    },
  });

  return deletedFolder;
}
export default { getList, create, updateById, getById, deleteById };
