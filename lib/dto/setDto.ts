import { z } from "zod";

export const GetSetListDtoSchema = z.object({
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
  folderId: z.string().optional(),
});

export type GetSetListDto = z.infer<typeof GetSetListDtoSchema>;

export const EditSetDtoSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().min(1).max(255),
  image: z.string().nullable(),
  originalLang: z.string().min(1).max(255),
  targetLang: z.string().min(1).max(255),
  folderId: z.string().min(1).max(255),
});

export type EditSetDto = z.infer<typeof EditSetDtoSchema>;
