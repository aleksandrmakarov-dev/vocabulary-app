import { NoContent, withErrorHandler } from "@/lib/api";
import { EditTermDtoSchema } from "@/lib/dto/termDto";
import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { NotFoundError } from "@/lib/errors";
import termRepository from "@/lib/repositories/termRepository";

interface RequestContext {
  params: {
    id: string;
  };
}

export const PUT = withErrorHandler(
  async (req: NextRequest, ctx: RequestContext) => {
    const body = EditTermDtoSchema.parse(await req.json());

    const updatedTerm = termRepository.updateById(ctx.params.id, body);

    if (!updatedTerm) {
      throw new NotFoundError(`Term with id ${ctx.params.id} not found`);
    }

    return NoContent();
  }
);
