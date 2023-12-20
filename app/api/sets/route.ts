import { withErrorHandler, Created } from "@/lib/api";
import { EditSetDtoSchema } from "@/lib/dto/setDto";
import { BadRequestError, NotFoundError } from "@/lib/errors";
import folderRepository from "@/lib/repositories/folderRepository";
import setRepository from "@/lib/repositories/setRepository";
import { NextRequest } from "next/server";

export const POST = withErrorHandler(async (req: NextRequest) => {
  let body = EditSetDtoSchema.parse(await req.json());

  const foundFolder = await folderRepository.getById(body.folderId);

  if (!foundFolder) {
    throw new NotFoundError(`Folder with id ${body.folderId} not found`);
  }

  if (body.image) {
    // const uploadedFile = await cloudinaryService.moveFile(
    //   body.image,
    //   "previews"
    // );
    // if (!uploadedFile) {
    //   throw new BadRequestError("Failed to upload file");
    // }
    // body.image = uploadedFile.url;
  }

  const createdSet = await setRepository.create(body);

  return Created(createdSet);
});
