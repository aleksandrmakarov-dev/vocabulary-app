import { withErrorHandler, Ok, NotFound } from "@/lib/api";
import { EditSetDtoSchema } from "@/lib/dto/setDto";
import folderRepository from "@/lib/repositories/folderRepository";
import setRepository from "@/lib/repositories/setRepository";
import { NextRequest } from "next/server";

export const POST = withErrorHandler(async (req: NextRequest) => {
  const body = EditSetDtoSchema.parse(await req.json());

  const foundFolder = await folderRepository.getById(body.folderId);

  if (!foundFolder) {
    return NotFound(`Folder with id ${body.folderId} not found`);
  }

  const createdSet = await setRepository.create(body);

  return Ok(createdSet);
});
