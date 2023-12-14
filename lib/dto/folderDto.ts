import { z } from "zod";

export const GetFolderListDtoSchema = z.object({
  page: z.coerce.number().min(1),
  limit: z.coerce.number().optional(),
});

export type GetFolderListDto = z.infer<typeof GetFolderListDtoSchema>;

export const EditFolderDtoSchema = z.object({
  name: z.string().min(1).max(255),
});

export type EditFolderDto = z.infer<typeof EditFolderDtoSchema>;

export const UpdateFolderDtoSchema = z.object({
  name: z.string(),
});
