import { z } from "zod";

export const GenerateVoiceDtoSchema = z.object({
  text: z.string().min(1).max(255),
  lang: z.string().min(1).max(255),
});

export type GenerateVoiceDto = z.infer<typeof GenerateVoiceDtoSchema>;
