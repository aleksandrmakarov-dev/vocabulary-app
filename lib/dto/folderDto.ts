import { z } from "zod";

export const GetFolderListDtoSchema = z.object({
  page: z
    .number({
      coerce: true,
    })
    .transform((val) => {
      if (val <= 0) return undefined;
      return val;
    })
    .optional(),
  limit: z
    .number({ coerce: true })
    .transform((val) => {
      if (val <= 0) return undefined;
      return val;
    })
    .optional(),
});

export type GetFolderListDto = z.infer<typeof GetFolderListDtoSchema>;

export const EditFolderDtoSchema = z.object({
  name: z.string().min(1).max(255),
});

export type EditFolderDto = z.infer<typeof EditFolderDtoSchema>;
