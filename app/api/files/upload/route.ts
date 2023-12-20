import { Ok, withErrorHandler } from "@/lib/api";
import { BadRequestError } from "@/lib/errors";
import googleStorageService from "@/lib/services/googleStorageService";
import { NextRequest } from "next/server";

export const POST = withErrorHandler(async (req: NextRequest) => {
  // const formData = await req.formData();

  // const file = formData.get("file") as File | null;
  // if (!file) {
  //   throw new BadRequestError("No file provided");
  // }

  // if (file.size > 1024 * 1024 * 5) {
  //   throw new BadRequestError("File is too large");
  // }

  // const buffer = await file.arrayBuffer();
  // const fileName = file.name;

  // const url = await googleStorageService.upload(fileName, buffer, "tmp");

  // const uploadedFile = {
  //   name: file.name,
  //   size: file.size,
  //   type: file.type,
  //   url,
  // };

  // return Ok(uploadedFile);

  return Ok("Hello");
});
