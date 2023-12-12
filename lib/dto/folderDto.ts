import { z } from "zod";

export const GetFolderListDtoSchema = z.object({
  page: z.coerce.number().min(1),
  limit: z.coerce.number().optional(),
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
