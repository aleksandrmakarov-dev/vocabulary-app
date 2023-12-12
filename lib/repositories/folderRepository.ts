import { Folder } from "@prisma/client";
import { PagedResponse } from "../api";
import prisma from "../prisma";
import { z } from "zod";
import {
  CreateFolderDto,
  GetFolderListDto,
  UpdateFolderDto,
} from "../dto/folderDto";

// Get Folder List

async function getList(
  params: GetFolderListDto
): Promise<PagedResponse<Folder>> {
  const { page, limit } = params;
  const count = await prisma.folder.count();
  const skip = (page - 1) * (limit ?? count);
  const take = limit ?? count;

  const foundFolders = await prisma.folder.findMany({
    skip: skip,
    take: take,
  });

  return {
    data: foundFolders,
    meta: {
      page: page,
      limit: limit ?? count,
      itemsCount: count,
      pagesCount: Math.ceil(count / (limit ?? count)),
    },
  };
}

// Create Folder

async function create(body: CreateFolderDto): Promise<Folder> {
  const createdFolder = await prisma.folder.create({
    data: {
      name: body.name,
    },
  });

  return createdFolder;
}

// Update Folder

async function updateById(id: string, body: UpdateFolderDto): Promise<Folder> {
  const updatedFolder = await prisma.folder.update({
    where: {
      id: id,
    },
    data: {
      name: body.name,
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
