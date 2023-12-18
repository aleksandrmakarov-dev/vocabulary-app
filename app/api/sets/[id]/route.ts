import { NoContent, Ok, withErrorHandler } from "@/lib/api";
import { EditSetDtoSchema } from "@/lib/dto/setDto";
import { NotFoundError } from "@/lib/errors";
import setRepository from "@/lib/repositories/setRepository";
import termRepository from "@/lib/repositories/termRepository";
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

export const PUT = withErrorHandler(
  async (req: NextRequest, ctx: RequestContext) => {
    const body = EditSetDtoSchema.parse(await req.json());

    const updatedSet = await setRepository.updateById(ctx.params.id, body);

    if (!updatedSet) {
      throw new NotFoundError(`Set with id ${ctx.params.id} not found`);
    }

    return NoContent();
  }
);

export const DELETE = withErrorHandler(
  async (req: NextRequest, ctx: RequestContext) => {
    const deletedSet = await setRepository.deleteById(ctx.params.id);

    if (!deletedSet) {
      throw new NotFoundError(`Set with id ${ctx.params.id} not found`);
    }

    return NoContent();
  }
);
