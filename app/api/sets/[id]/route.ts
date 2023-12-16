import { Ok, withErrorHandler } from "@/lib/api";
import { NotFoundError } from "@/lib/errors";
import setRepository from "@/lib/repositories/setRepository";
import { NextRequest } from "next/server";

interface RequestContext {
  params: {
    id: string;
  };
}

export const GET = withErrorHandler(
  async (req: NextRequest, ctx: RequestContext) => {
    const foundFolder = await setRepository.getById(ctx.params.id);
    if (!foundFolder) {
      throw new NotFoundError(`Folder with id ${ctx.params.id} not found`);
    }

    return Ok(foundFolder);
  }
);
