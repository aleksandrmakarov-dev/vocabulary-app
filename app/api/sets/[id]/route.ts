import { NoContent, Ok, withErrorHandler } from "@/lib/api";
import { EditSetDtoSchema } from "@/lib/dto/setDto";
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

export const PUT = withErrorHandler(
  async (req: NextRequest, ctx: RequestContext) => {
    let body = EditSetDtoSchema.parse(await req.json());

    const foundSet = await setRepository.getById(ctx.params.id);

    if (!foundSet) {
      throw new NotFoundError(`Set with id ${ctx.params.id} not found`);
    }

    if (body.image !== foundSet.image) {
      // if (body.image) {
      //   const movedFile = await cloudinaryService.moveFile(
      //     body.image,
      //     "previews"
      //   );
      //   if (!movedFile) {
      //     throw new BadRequestError("Failed to move file");
      //   }
      //   body.image = movedFile.url;
      // }
      // if (foundSet.image) {
      //   await cloudinaryService.deleteResources([foundSet.image], "image");
      // }
    }

    const updatedSet = await setRepository.updateById(ctx.params.id, body);

    if (!updatedSet) {
      throw new NotFoundError(`Failed to update set with id ${ctx.params.id}`);
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

    // if (deletedSet.image) {
    //   await cloudinaryService.deleteResources([deletedSet.image], "image");
    // }

    // await cloudinaryService.deleteFolder(`sets/${deletedSet.id}`);

    return NoContent();
  }
);
