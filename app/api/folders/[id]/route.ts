import { NoContent, withErrorHandler } from "@/lib/api";
import folderService from "@/lib/repositories/folderRepository";
import { NextRequest } from "next/server";

interface RequestContext {
  id: string;
}

export const PUT = withErrorHandler(
  async (req: NextRequest, ctx: RequestContext) => {
    const { name } = await req.json();

    const updatedFolder = await folderService.updateById(ctx.id, {
      name: name,
    });

    return NoContent();
  }
);

export const DELETE = withErrorHandler(
  async (req: NextRequest, ctx: RequestContext) => {
    const deletedFolder = await folderService.deleteById(ctx.id);
  }
);
