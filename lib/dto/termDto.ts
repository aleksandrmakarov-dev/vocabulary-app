import { z } from "zod";

export const EditTermDtoSchema = z.object({
  text: z.string().min(1).max(255),
  definition: z.string().min(1).max(255),
  image: z.string().nullable(),
  setId: z.string().min(1).max(255),
});

export type EditTermDto = z.infer<typeof EditTermDtoSchema>;
