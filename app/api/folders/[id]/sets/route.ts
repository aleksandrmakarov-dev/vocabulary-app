import { withErrorHandler, Ok } from "@/lib/api";
import { GetFolderListDtoSchema } from "@/lib/dto/folderDto";
import { GetSetListDtoSchema } from "@/lib/dto/setDto";
import folderRepository from "@/lib/repositories/folderRepository";
import setRepository from "@/lib/repositories/setRepository";
import { NextRequest } from "next/server";

interface RequestContext {
  params: {
    id: string;
  };
}

export const GET = withErrorHandler(
  async (req: NextRequest, ctx: RequestContext) => {
    const searchParams = GetSetListDtoSchema.parse({
      page: req.nextUrl.searchParams.get("page"),
      limit: req.nextUrl.searchParams.get("limit"),
    });

    const foundSets = await setRepository.getListByFolderId({
      page: searchParams.page,
      limit: searchParams.limit,
      folderId: ctx.params.id,
    });

    return Ok(foundSets);
  }
);
