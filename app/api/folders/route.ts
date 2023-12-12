import { Ok, withErrorHandler } from "@/lib/api";
import {
  GetFolderListDtoSchema,
  CreateFolderDtoSchema,
} from "@/lib/dto/folderDto";
import folderRepository from "@/lib/repositories/folderRepository";
import { NextRequest } from "next/server";

export const GET = withErrorHandler(async (req: NextRequest) => {
  const searchParams = GetFolderListDtoSchema.parse({
    page: req.nextUrl.searchParams.get("page"),
    limit: req.nextUrl.searchParams.get("limit"),
  });

  const foundFolders = await folderRepository.getList(searchParams);

  return Ok(foundFolders);
});

export const POST = withErrorHandler(async (req: NextRequest) => {
  const body = CreateFolderDtoSchema.parse(await req.json());

  const createdFolder = await folderRepository.create(body);

  return Ok(createdFolder);
});
