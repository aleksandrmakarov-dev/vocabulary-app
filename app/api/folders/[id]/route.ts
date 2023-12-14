import { NoContent, Ok, withErrorHandler } from "@/lib/api";
import { NotFoundError } from "@/lib/errors";
import folderRepository from "@/lib/repositories/folderRepository";
import folderService from "@/lib/repositories/folderRepository";
import { NextRequest } from "next/server";

interface RequestContext {
  params: {
    id: string;
  };
}

export const GET = withErrorHandler(
  async (req: NextRequest, ctx: RequestContext) => {
    const foundFolder = await folderRepository.getById(ctx.params.id);
    if (!foundFolder) {
      throw new NotFoundError(`Folder with id ${ctx.params.id} not found`);
    }

    return Ok(foundFolder);
  }
);

export const PUT = withErrorHandler(
  async (req: NextRequest, ctx: RequestContext) => {
    const { name } = await req.json();

    const updatedFolder = await folderService.updateById(ctx.params.id, {
      name: name,
    });

    if (!updatedFolder) {
      throw new NotFoundError(`Folder with id ${ctx.params.id} not found`);
    }

    return NoContent();
  }
);

export const DELETE = withErrorHandler(
  async (req: NextRequest, ctx: RequestContext) => {
    const deletedFolder = await folderService.deleteById(ctx.params.id);
    if (!deletedFolder) {
      throw new NotFoundError(`Folder with id ${ctx.params.id} not found`);
    }
    return NoContent();
  }
);
