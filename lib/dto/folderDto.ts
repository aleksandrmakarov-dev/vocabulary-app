import { z } from "zod";

export const GetFolderListDtoSchema = z.object({
  page: z.number().optional(),
  limit: z.number().optional(),
});

export type GetFolderListDto = z.infer<typeof GetFolderListDtoSchema>;

export const CreateFolderDtoSchema = z.object({
  name: z.string(),
});

export type CreateFolderDto = z.infer<typeof CreateFolderDtoSchema>;

export const UpdateFolderDtoSchema = z.object({
  name: z.string(),
});

export type UpdateFolderDto = z.infer<typeof UpdateFolderDtoSchema>;
