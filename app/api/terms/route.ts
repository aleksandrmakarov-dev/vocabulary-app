import { Created, withErrorHandler } from "@/lib/api";
import { EditTermDtoSchema } from "@/lib/dto/termDto";
import { NotFoundError } from "@/lib/errors";
import setRepository from "@/lib/repositories/setRepository";
import termRepository from "@/lib/repositories/termRepository";
import { NextRequest } from "next/server";

export const POST = withErrorHandler(async (req: NextRequest) => {
  const body = EditTermDtoSchema.parse(await req.json());

  const foundSet = await setRepository.getById(body.setId);

  if (!foundSet) {
    throw new NotFoundError(`Set with id ${body.setId} not found`);
  }

  const createdTerm = await termRepository.create(body);

  return Created(createdTerm);
});
